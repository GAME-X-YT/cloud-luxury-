
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
    const emailBody = `Your security code is: ${otp}. This code is valid for 3 minutes.`;

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