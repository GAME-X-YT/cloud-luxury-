
import crypto from 'crypto';
import  User  from '../models/User'; // Adjust the path as needed
import { sendEmail } from './sendEmail'; // Assuming your email utility is here

/**
 * Generates a 6-digit OTP, saves it to the user's document, and sends it via email.
 * @param email - The user's email address.
 * @param subject - The subject line for the email.
 * @returns The generated OTP string.
 */
export const generateAndSendOTP = async (email: string, subject: string): Promise<string> => {
    
    // 1. Generate a 6-digit number (OTP)
    // crypto.randomInt is secure and standard for Node.js
    const otp = crypto.randomInt(100000, 999999).toString();

    // 2. Set expiry time (e.g., 3 minutes from now)
    const expiryTime = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes in milliseconds

    // 3. Save the OTP and expiry time to the user's document
    await User.updateOne({ email }, {
        otp: otp,
        otpExpires: expiryTime,
    });
    
    // 4. Send the email notification
    const emailBody = `
    <div style="background-color: #000000; padding: 40px 20px; font-family: 'Georgia', serif; text-align: center; color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #c5a059; padding: 40px;">
        
        <h1 style="color: #c5a059; font-size: 26px; letter-spacing: 6px; text-transform: uppercase; margin-bottom: 10px; font-weight: normal;">Cloud Luxury</h1>
        <p style="color: #ffffff; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; border-bottom: 1px solid #222; padding-bottom: 20px;">Identity Authentication</p>

        <p style="color: #b5b5b5; font-size: 14px; line-height: 1.8; margin-bottom: 30px; letter-spacing: 0.5px;">
        For your security, please use the following one-time passcode to verify your request. This code is unique to your session.
        </p>

        <div style="background-color: #0a0a0a; border: 1px solid #c5a059; padding: 30px; margin: 30px 0;">
        <p style="color: #c5a059; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; margin-top: 0;">Verification Code</p>
        <span style="font-family: 'Courier New', monospace; font-size: 42px; color: #ffffff; font-weight: bold; letter-spacing: 12px; display: block;">
            ${otp}
        </span>
        </div>

        <div style="margin-top: 25px;">
        <p style="color: #777; font-size: 12px; font-style: italic;">
            This security code is valid for <span style="color: #c5a059;">3 minutes</span> only.
        </p>
        </div>

        <div style="margin-top: 50px; border-top: 1px solid #222; padding-top: 25px;">
        <p style="color: #444; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; line-height: 1.5;">
            If you did not initiate this request, your account may be at risk. <br>Please update your security credentials immediately.
        </p>
        </div>

    </div>
    </div>
    `;

    await sendEmail(
        email, 
        subject, 
        emailBody
    );
    
    return otp;
};






/**
 * Validates the user-submitted OTP against the database and checks for expiry.
 * @param email - The user's email address.
 * @param submittedOtp - The OTP code provided by the user.
 * @returns true if the OTP is valid and not expired, otherwise false.
 */
export const verifyOTP = async (email: string, submittedOtp: string): Promise<boolean> => {
    const user = await User.findOne({ email });

    if (!user || !user.otp || !user.otpExpires) {
        return false; // User or OTP data not found
    }

    // Check if the code has expired
    if (new Date() > user.otpExpires) {
        // Clear expired OTP data to prevent reuse
        await User.updateOne({ email }, { otp: undefined, otpExpires: undefined });
        return false;
    }

    // Check if the submitted code matches the saved code
    if (user.otp === submittedOtp) {
        // Clear the OTP data immediately upon successful verification
        await User.updateOne({ email }, { otp: undefined, otpExpires: undefined });
        return true;
    }

    return false;
};