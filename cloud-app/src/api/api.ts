// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/users", // your backend URL
// });

// export const register = (userData: any) => API.post("/register", userData);
// export const login = (userData: any) => API.post("/login", userData);

// export const getProfile = ( token: string) =>
//   API.get(`/profile`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const uploadProfilePic = (fileData: FormData, token: string) =>
//   API.post("/upload-profile", fileData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });



import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users", // your backend URL
});

// --- User Authentication and Activation ---

export const register = (userData: any) => API.post("/register", userData);

// 🔑 NEW: Function to activate the account (for Step 2 of Sign-Up)
export const activateAccount = (data: { email: string, otp: string }) => 
  API.post("/activate", data);

// 🔑 NEW: Function to request the OTP during 2FA Login (Step 1 of Login)
export const loginOTPRequest = (data: { email: string }) => 
  API.post("/login-otp-request", data);

// UPDATED: Login now sends email, password, AND otp
export const login = (userData: any) => API.post("/login", userData); 

// --- User Data and Profile ---

export const getProfile = ( token: string) =>
  API.get(`/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const uploadProfilePic = (fileData: FormData, token: string) =>
  API.post("/upload-profile", fileData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// --- Account Deletion Flow (Optional, but good to add now) ---

// Function to request the delete confirmation OTP
export const requestDeleteOTP = (token: string) =>
  API.post("/delete-request", {}, { 
    headers: { Authorization: `Bearer ${token}` } 
  });

// Function to confirm deletion with password and OTP
export const deleteUserConfirm = (data: { password: string, otp: string }, token: string) =>
  API.delete("/delete-confirm", { 
    data, // DELETE requests pass body data via the 'data' key in config
    headers: { Authorization: `Bearer ${token}` } 
  });

  // Function to request the password reset OTP/link
export const forgotPasswordRequest = (data: { email: string }) => 
  API.post("/forgot-password-request", data);

// Function to submit the new password along with the received token/OTP
export const resetPassword = (data: { email: string, otp: string, newPassword: string }) => 
  API.post("/reset-password", data);