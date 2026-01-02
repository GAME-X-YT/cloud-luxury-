import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendEmail } from "../middleware/sendEmail";
import {generateAndSendOTP, verifyOTP } from "../middleware/otp"

interface AuthRequest extends Request {
  user?: { id: string }; // Assuming JWT payload is { id: string }
}

// Register User (OTP Activation - Step 1: Send OTP / Handle Resend)
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            // Case 1: User is already fully verified
            if (existingUser.isVerified) {
                return res.status(400).json({ message: "User already exists and is verified. Please log in." });
            }
            
            // Case 2: User exists but is unverified (Handles Resend Request)
            const subject = "Resend Activation Code";
            await generateAndSendOTP(email, subject);
            
            // NOTE: Ensure your utility/otp.ts file uses the correct 1-minute expiry.
            return res.status(202).json({ 
                message: "A new activation code has been sent to your email. It expires in 1 minute." 
            });
        }

        // Case 3: New User Registration
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            profilePic: "", 
            isVerified: false, // Account is inactive until OTP is verified
        });

        await user.save();

        // Send the initial OTP
        await generateAndSendOTP(email, "Activate Your Account");

        // Respond with success message, client moves to OTP form
        res.status(201).json({ 
            message: "Registration successful! Check your email for the activation code (1 min expiry)." 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during registration." });
    }
};

// Login
export const loginUser = async (req: Request, res: Response) => {
   try {
        // 🛑 ONLY REQUIRE email and otp. Password was checked in loginOTPRequest.
        const { email, otp } = req.body; 

        // 1. Input Validation
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and the OTP code are required to confirm login" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // Should not happen if client followed login flow, but good for defense
            return res.status(400).json({ message: "User not found or is unverified" });
        }
        
        // 2. 🛑 OTP Verification Check (The only major security step here)
        const isValidOTP = await verifyOTP(email, otp); 

        if (!isValidOTP) {
            return res.status(401).json({ message: "Invalid or expired OTP code. Please request a new code and try again." });
        }

        // 3. Generate Token (Success)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        // 4. Clean up OTP fields (Good practice)
        user.otp = undefined;
        user.otpExpires = undefined; 
        await user.save();

        // 4. Success Confirmation Email
        // Now call your function with the HTML variable
                const emailTemplate = `
        <div style="background-color: #0a0a0a; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; border-radius: 20px; max-width: 600px; margin: auto; border: 1px solid #333;">
            <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #eab308; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Cloud Luxury</h1>
            <div style="height: 1px; background: linear-gradient(to right, transparent, #eab308, transparent); margin-top: 10px;"></div>
            </div>
            
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">Security Alert: New Login</h2>
            
            <p style="color: #a3a3a3; line-height: 1.6; font-size: 16px;">
            Hello, <br><br>
            This is a quick notification to let you know that a successful login occurred on your account.
            </p>

            <div style="background-color: #171717; border: 1px solid #262626; padding: 20px; border-radius: 12px; margin: 25px 0;">
            <p style="margin: 0; font-size: 14px; color: #eab308; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Log Details</p>
            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">
                <strong>Time:</strong> ${new Date().toLocaleString()}<br>
                <strong>Status:</strong> Success
            </p>
            </div>

            <p style="color: #ef4444; font-size: 14px; font-style: italic;">
            If this wasn't you, please secure your account immediately by changing your password in the dashboard.
            </p>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #262626; text-align: center;">
            <p style="color: #525252; font-size: 12px; margin: 0;">
                &copy; 2025 Cloud Luxury. All rights reserved.
            </p>
            </div>
        </div>
        `;
    await sendEmail(
        user.email, 
        "Security Alert: Successful Login", 
        emailTemplate // Pass the template here
    );

        res.json({ 
            message: "Login successful", 
            token, 
            userId: user._id, 
            role: user.role // THIS IS KEY FOR THE OWNER DASHBOARD
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginOTPRequest = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 2. Check if account is verified
        if (!user.isVerified) {
            return res.status(400).json({ message: "Please activate your account first." });
        }

        // 3. Verify Password BEFORE sending OTP
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // 4. Send the Login OTP
        await generateAndSendOTP(email, "Your Login Verification Code");

        res.status(200).json({ message: "Verification code sent to your email!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during login request." });
    }
};

// ----------------------------------------------------
// 3. FORGOT PASSWORD FLOW
// ----------------------------------------------------

/**
 * NEW CONTROLLER: Step 1 of Forgot Password. Sends reset OTP.
 * Route: POST /api/users/forgot-password-request
 */
export const forgotPasswordRequest = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await User.findOne({ email });

        if (!user || !user.isVerified) {
            // Send a generic message even if the user isn't found for security reasons
   const resetTemplate = `
        <div style="background-color: #000000; padding: 40px 20px; font-family: 'Georgia', serif; text-align: center; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #c5a059; padding: 40px;">
            
            <h1 style="color: #c5a059; font-size: 28px; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 10px;">Cloud Luxury</h1>
            <p style="color: #ffffff; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px;">Private Authentication</p>

            <h2 style="font-size: 20px; color: #ffffff; margin-bottom: 25px; font-weight: normal; letter-spacing: 1px;">Password Reset Request</h2>
            
            <p style="color: #b5b5b5; font-size: 15px; line-height: 1.8; margin-bottom: 30px; text-align: left;">
            A request has been made to reset the password for your <strong>Cloud Luxury</strong> account. To proceed with your security update, please use the button below.
            </p>

            <div style="margin: 40px 0;">
            <a href="https://yourwebsite.com/reset-password" style="background-color: #c5a059; color: #000; padding: 18px 35px; text-decoration: none; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">Reset Password</a>
            </div>

            <div style="background-color: #111; padding: 20px; border-radius: 4px; margin-top: 20px;">
            <p style="color: #777; font-size: 13px; margin: 0; line-height: 1.6;">
                <strong>Safety Notice:</strong> If you did not initiate this request, please disregard this message. Your password will remain unchanged and your account stays secure.
            </p>
            </div>

            <div style="margin-top: 50px; border-top: 1px solid #333; padding-top: 20px;">
            <p style="color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
                This link will expire in 1 hour.
            </p>
            </div>

        </div>
        </div>
        `;

// Now call the function
await sendEmail(email, "Cloud Luxury | Password Reset Request", resetTemplate);

            return res.status(200).json({ 
                message: "If a matching account was found, a reset code has been sent to your email." 
            });
        }
        
        // Generate and send the reset OTP
        const subject = "Password Reset Code";
        await generateAndSendOTP(email, subject); 

        res.status(200).json({
            message: "Password reset code sent successfully! Check your email (1 min expiry)."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during password reset request." });
    }
};

/**
 * NEW CONTROLLER: Step 2 of Forgot Password. Verifies OTP and updates password.
 * Route: POST /api/users/reset-password
 */
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Email, OTP, and new password are required." });
        }

        if (newPassword.length < 6) {
             return res.status(400).json({ message: "New password must be at least 6 characters long." });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 1. Verify OTP
        const isValidOTP = await verifyOTP(email, otp); 

        if (!isValidOTP) {
            return res.status(401).json({ message: "Invalid or expired OTP code. Please request a new code." });
        }

        // 2. Hash New Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3. Update User Record
        user.password = hashedPassword;
        user.otp = undefined; // Clear OTP fields
        user.otpExpires = undefined; 
        await user.save();

        // 4. Confirmation Email
        const successTemplate = `
            <div style="background-color: #000000; padding: 40px 20px; font-family: 'Georgia', serif; text-align: center; color: #ffffff;">
            <div style="max-width: 600px; margin: 0 auto; border: 1px solid #c5a059; padding: 40px;">
                
                <h1 style="color: #c5a059; font-size: 28px; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 10px;">Cloud Luxury</h1>
                <p style="color: #ffffff; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px;">Security Confirmation</p>

                <div style="margin-bottom: 30px;">
                <span style="font-size: 50px; color: #c5a059;">&#10003;</span>
                </div>

                <h2 style="font-size: 22px; color: #ffffff; margin-bottom: 20px; font-weight: normal; letter-spacing: 1px;">Password Changed</h2>
                
                <p style="color: #b5b5b5; font-size: 15px; line-height: 1.8; margin-bottom: 30px;">
                Your account security credentials have been successfully updated. Access to your <strong>Cloud Luxury</strong> profile now requires your new password.
                </p>

                <div style="background-color: #111; border: 1px solid #222; padding: 20px; margin: 25px 0; text-align: left;">
                <p style="margin: 0; font-size: 12px; color: #c5a059; text-transform: uppercase; letter-spacing: 1px;">Update Details</p>
                <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">
                    <strong>Status:</strong> Successfully Updated<br>
                    <strong>Date:</strong> ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                </div>

                <p style="color: #ef4444; font-size: 13px; margin-top: 30px; font-style: italic;">
                If you did not make this change, please contact our concierge support immediately to freeze your account.
                </p>

                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
                    &copy; 2025 Cloud Luxury Portfolio
                </p>
                </div>

            </div>
            </div>
            `;

// Call the function
    await sendEmail(email, "Cloud Luxury | Password Successfully Changed", successTemplate);
        
        res.status(200).json({
            message: "Password successfully updated. You can now log in with your new password."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during password reset." });
    }
};

// Add this to your controller file
export const resendOTP = async (req: Request, res: Response) => {
    try {
        const { email, reason } = req.body; // reason could be 'login', 'signup', or 'reset'

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const subject = reason === 'reset' ? "Your Password Reset Code" : "Your New Verification Code";
        
        await generateAndSendOTP(email, subject);

        res.status(200).json({ message: "A new code has been sent to your email." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error resending code" });
    }
};

// Get Profile
export const getProfileController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId)
      return res.status(401).json({ message: "Authorization token missing user ID payload." }); // Changed to 401

    const user = await User.findById(userId).select("-password");

      // 2. CRITICAL FIX: Check if the user was found in the database.
    if (!user)
      return res.status(404).json({ message: "User not found" });
    

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

export const uploadProfilePicController = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // req.user.id comes from your authMiddleware
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save the filename (multer provides this)
    user.profilePic = req.file.filename; 
    await user.save();

    res.status(200).json({ 
      message: "Profile picture updated successfully", 
      profilePic: req.file.filename 
    });
  } catch (error) {
    console.error("Upload Controller Error:", error);
    res.status(500).json({ message: "Error updating profile picture" });
  }
};

export const activateAccount = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and activation code are required." });
        }

        // 1. Verify OTP: This checks against the database for match and expiry.
        const isValid = await verifyOTP(email, otp);

        if (!isValid) {
            return res.status(400).json({ message: "Invalid or expired activation code." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // Check if already verified (optional, but good practice)
        if (user.isVerified) {
             return res.status(200).json({ message: "Account is already active." });
        }

        // 2. Activate Account: Set the verification flag to true
        user.isVerified = true;
        // Clear the OTP fields now that the account is active
        user.otp = undefined;
        user.otpExpires = undefined; 
        await user.save();

        // 3. Issue Token: Generate the first JWT token for the new session
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        // 4. Success Confirmation Email
        const activationTemplate = `
        <div style="background-color: #000000; padding: 40px 20px; font-family: 'Georgia', serif; text-align: center; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #c5a059; padding: 40px;">
            
            <h1 style="color: #c5a059; font-size: 28px; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 10px;">Cloud Luxury</h1>
            <p style="color: #ffffff; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px;">Membership Activated</p>

            <h2 style="font-size: 24px; color: #ffffff; margin-bottom: 20px; font-weight: normal; letter-spacing: 1px;">Welcome to the Vault</h2>
            
            <p style="color: #b5b5b5; font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
            Congratulations. Your identity has been verified and your <strong>Cloud Luxury</strong> account is now fully active. You have gained exclusive access to our curated collection and private concierge services.
            </p>

            <div style="margin: 30px 0;">
            <div style="display: inline-block; border: 1px solid #c5a059; padding: 10px 20px; border-radius: 50px;">
                <span style="color: #c5a059; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">● Status: Fully Verified</span>
            </div>
            </div>

            <div style="margin-top: 40px;">
            <a href="http://localhost:3000/login" style="background-color: #c5a059; color: #000; padding: 18px 40px; text-decoration: none; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">Enter the Collection</a>
            </div>

            <div style="margin-top: 40px; padding: 20px; background-color: #111; border-top: 1px solid #222;">
            <p style="color: #777; font-size: 13px; margin: 0;">
                Your security is our priority. Always ensure you are on the official <strong>cloudluxury.com</strong> domain before entering your credentials.
            </p>
            </div>

            <div style="margin-top: 50px;">
            <p style="color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
                Luxury is in the details.
            </p>
            </div>

        </div>
        </div>
        `;

// Call the function
await sendEmail(email, "Welcome to Cloud Luxury | Account Activated", activationTemplate);
        
        // 5. Respond to client
        res.json({ 
            message: "Account successfully activated! You are now logged in.", 
            token, 
            userId: user._id 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during activation." });
    }
};


// Delete User
export const requestDeleteOTP = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id; // Get ID from the JWT token
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate and send a unique OTP for deletion confirmation (1 min expiry)
        await generateAndSendOTP(user.email, "Account Deletion Confirmation Code");
        
        res.status(200).json({ 
            message: "A deletion confirmation code has been sent to your email. It expires in 1 minute." 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error requesting deletion OTP." });
    }
};


export const deleteUser = async (req: AuthRequest, res: Response) => {
try {
        const userId = req.user?.id;
        // 🛑 CRITICAL CHANGE: Expecting both password and otp
        const { password, otp } = req.body; 

        if (!userId || !password || !otp) {
            return res.status(400).json({ message: "Current password and OTP code are required for deletion confirmation." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // 1.  Security Check: Verify Current Password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password provided. Deletion cancelled." });
        }

        // 2. Security Check: Verify OTP
        const isValidOTP = await verifyOTP(user.email, otp);

        if (!isValidOTP) {
            return res.status(401).json({ message: "Invalid or expired OTP code. Deletion cancelled." });
        }

        // 3. Execute Deletion
        await User.findByIdAndDelete(userId);

        // 4. SUCCESS CONFIRMATION EMAIL
        const deletionTemplate = `
                <div style="background-color: #000000; padding: 40px 20px; font-family: 'Georgia', serif; text-align: center; color: #ffffff;">
                <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; padding: 40px;">
                    
                    <h1 style="color: #c5a059; font-size: 28px; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 10px;">Cloud Luxury</h1>
                    <p style="color: #666; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px; border-bottom: 1px solid #222; padding-bottom: 20px;">Account Closure</p>

                    <h2 style="font-size: 20px; color: #ffffff; margin-bottom: 25px; font-weight: normal; letter-spacing: 1px;">Formal Confirmation</h2>
                    
                    <p style="color: #b5b5b5; font-size: 15px; line-height: 1.8; margin-bottom: 30px; text-align: left;">
                    This email serves as formal confirmation that your <strong>Cloud Luxury</strong> account and all associated data have been permanently deleted from our servers as per your request.
                    </p>

                    <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 25px; margin: 30px 0; text-align: left;">
                    <p style="margin: 0; font-size: 12px; color: #c5a059; text-transform: uppercase; letter-spacing: 1px;">Closing Summary</p>
                    <p style="margin: 15px 0 0 0; color: #888; font-size: 14px; line-height: 1.6;">
                        • Profile Data: <strong>Removed</strong><br>
                        • Personal Collections: <strong>Wiped</strong><br>
                        • Security Credentials: <strong>Deactivated</strong>
                    </p>
                    </div>

                    <p style="color: #777; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
                    We are truly sorry to see you go. Should you wish to return to our private collection in the future, you will need to create a new membership.
                    </p>

                    <div style="margin-top: 50px; border-top: 1px solid #222; padding-top: 20px;">
                    <p style="color: #444; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
                        Cloud Luxury | Excellence in Departure
                    </p>
                    </div>

                </div>
                </div>
                `;

// Call the function
 await sendEmail(user.email, "Cloud Luxury | Account Deletion Confirmed", deletionTemplate);
        
        res.json({ message: "User account deleted successfully." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during deletion confirmation." });
    }
};

