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
        await sendEmail(

                 user.email, 

            "Successful Login Notification", 

            "A successful login occurred on your account. If this wasn't you, please secure your account immediately."
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
            await sendEmail(
                email,
                "Password Reset Attempt",
                "A password reset was requested for this email. If this is not your email, you can ignore this message."
            );
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
        await sendEmail(
            email,
            "Password Successfully Changed",
            "Your password has been successfully updated. If you did not make this change, please contact support immediately."
        );
        
        res.status(200).json({
            message: "Password successfully updated. You can now log in with your new password."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during password reset." });
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
        await sendEmail(
            email, 
            "Account Successfully Activated", 
            "Congratulations! Your account has been successfully verified and activated. You can now log in securely."
        );
        
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
        await sendEmail(
            user.email, 
            "Account Deletion Successful", 
            "This confirms that your account was successfully and permanently deleted as requested. We are sorry to see you go."
        );
        
        res.json({ message: "User account deleted successfully." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during deletion confirmation." });
    }
};



