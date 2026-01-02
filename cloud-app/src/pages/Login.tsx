// // cloud-app/src/pages/Login.tsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // We no longer need the separate loginOTPRequest handler in the UI, 
// // as we'll merge the OTP request into the main handleSubmit logic.
// import { login, loginOTPRequest } from "../api/api"; 

// // --- Types ---
// interface LoginFormState {
//     email: string;
//     password: string;
//     otp: string;
// }

// export default function Login() {
//     const navigate = useNavigate();
//     const [form, setForm] = useState<LoginFormState>({ email: "", password: "", otp: "" });
//     const [error, setError] = useState<string>('');
//     const [loading, setLoading] = useState(false);
//     // State to track if the UI should show the OTP input (Step 2)
//     const [showOtpField, setShowOtpField] = useState(false); 

//     // --- Handlers ---

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // Consolidated Handler for Login (handles both OTP request and final login)
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         if (!showOtpField) {
//             // --- STEP 1: Request OTP ---
//             try {
//                 // Hitting the backend POST /login-otp-request
//                 const response = await loginOTPRequest({ email: form.email, password: form.password }); 
                
//                 // Success! Code sent. Transition UI to Step 2.
//                 setShowOtpField(true);
//                 alert(response.data.message || "Login code sent to your email."); 

//             } catch (err: any) {
//                 // If backend requires password before sending OTP, or if error is simple login failure
//                 const message = err.response?.data?.message || 'Login failed. Check your email/password.';
//                 setError(message);
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             // --- STEP 2: Final Login with OTP ---
//             if (form.otp.length !== 6) {
//                 setError("Please enter the 6-digit OTP code.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 // Hits the secured backend POST /login endpoint with email, password, and OTP
//                 const res = await login(form); 
                
//                 // Success!
//                 localStorage.setItem("token", res.data.token);
//                 localStorage.setItem("userId", res.data.userId);
//                 navigate("/profile");
                
//             } catch (err: any) {
//                  const message = err.response?.data?.message || "Verification failed. Check your OTP.";
//                  setError(message);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     // --- Rendering ---
    
//     const Spinner = () => (
//         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//         </svg>
//     );

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-5 transition-all duration-300"
//             >
//                 <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center">
//                     {showOtpField ? 'Verify Login' : 'Sign In'}
//                 </h2>
                
//                 {/* Status/Error Message */}
//                 {error && (
//                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm" role="alert">
//                         {error}
//                     </div>
//                 )}
//                 {showOtpField && !error && (
//                     <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative text-sm font-medium">
//                         Code sent to {form.email}. Enter it below.
//                     </div>
//                 )}


//                 {/* Email Input */}
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
//                     required
//                     disabled={showOtpField || loading} // Disabled after OTP is sent
//                 />
                
//                 {/* Password Input */}
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
//                     required
//                     disabled={loading}
//                 />
                
//                 {/* OTP Input (Conditionally Rendered/Shown only for Step 2) */}
//                 {showOtpField && (
//                     <input
//                         type="text"
//                         name="otp"
//                         placeholder="Enter 6-digit OTP code"
//                         value={form.otp}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 tracking-wider"
//                         required
//                         disabled={loading}
//                         maxLength={6}
//                     />
//                 )}

//                 {/* Main Action Button (Text changes based on step) */}
//                 <button
//                     type="submit"
//                     className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md disabled:bg-indigo-400 flex items-center justify-center gap-2 mt-2"
//                     disabled={loading || (showOtpField && form.otp.length < 6)}
//                 >
//                     {loading ? <Spinner /> : null}
//                     {showOtpField ? "Verify and Log In" : "Log In"}
//                 </button>

//                     <div className="text-center">
//                         <a 
//                             href="/forgot-password" 
//                             className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline font-medium"
//                         >
//                             Forgot Password?
//                         </a>
//                     </div>
                
//                 {/* Sign Up Link */}
//                 <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
//                     Don't have an account? 
//                     <a href="/signup" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline ml-1 font-medium">
//                         Sign Up
//                     </a>
//                 </p>

//             </form>
//         </div>
//     );
// }