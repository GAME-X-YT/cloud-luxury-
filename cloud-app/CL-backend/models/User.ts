import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePic?: string;


  // New Fields for OTP/Verification:
  isVerified: boolean; // Tracks if the account email has been confirmed (for sign-up)
  otp?: string;       // Stores the temporary OTP code for login/delete confirmation
  otpExpires?: Date;  // Stores the expiration time for the OTP
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },


  // New Schema Definitions:
  isVerified: {
    type: Boolean,
    default: false, // Accounts start as unverified
  },

  otp: {
    type: String,
    required: false, // OTP is only stored temporarily
  },

  otpExpires: {
    type: Date,
    required: false,
  },

});
export const User = mongoose.model<IUser>("User", UserSchema);
export default User;