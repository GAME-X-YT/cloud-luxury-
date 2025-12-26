// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { FaGoogle, FaFacebookF, FaArrowLeft } from 'react-icons/fa';

// type AuthMode = 'signin' | 'signup' | 'forgot' | 'reset' | 'activate' | 'loginOTP';

// export default function UnifiedAuth() {
//     const [mode, setMode] = useState<AuthMode>('signin');
//     const [isSlid, setIsSlid] = useState(false); // Controls the sliding animation
//     const [formData, setFormData] = useState({
//         name: '', email: '', password: '', otp: '', newPassword: ''
//     });
// const navigate = useNavigate();

//     // Toggle between the two main halves (Slide animation)
//     const toggleSlide = (toSignup: boolean) => {
//         setIsSlid(toSignup);
//         setMode(toSignup ? 'signup' : 'signin');
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
//             <div className={`relative overflow-hidden bg-white rounded-[30px] shadow-2xl w-[850px] max-w-full min-h-[550px] transition-all duration-700 ease-in-out ${isSlid ? 'active' : ''}`}>
                
//                 {/* --- LEFT SIDE: SIGN UP & ACTIVATION --- */}
//                 <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-10 
//                     ${isSlid ? 'translate-x-full opacity-100 z-50' : 'opacity-0'}`}>
                    
//                     <div className="flex flex-col items-center justify-center px-10 h-full text-center">
//                         {mode === 'signup' ? (
//                             <>
//                                 <h1 className="text-3xl font-bold mb-4">Create Account</h1>
//                                 <SocialLogins />
//                                 <span className="text-xs text-gray-500 mb-4">or use your email for registration</span>
//                                 <AuthInput name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
//                                 <AuthInput name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//                                 <AuthInput name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//                                 <MainButton text="Sign Up" onClick={() => {/* Call registerUser */}} />
//                             </>
//                         ) : mode === 'activate' ? (
//                             <>
//                                 <h1 className="text-3xl font-bold mb-2">Verify Email</h1>
//                                 <p className="text-xs text-gray-500 mb-4">Enter the code sent to {formData.email}</p>
//                                 <AuthInput name="otp" placeholder="6-Digit Code" value={formData.otp} onChange={handleChange} />
//                                 <MainButton text="Activate Account" onClick={() => {/* Call activateAccount */}} />
//                                 <button onClick={() => setMode('signup')} className="text-xs mt-4 flex items-center gap-1 text-gray-400"><FaArrowLeft /> Back</button>
//                             </>
//                         ) : null}
//                     </div>
//                 </div>

//                 {/* --- RIGHT SIDE: SIGN IN, FORGOT, RESET --- */}
//                 <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-20 
//                     ${isSlid ? 'translate-x-full' : ''}`}>
                    
//                     <div className="flex flex-col items-center justify-center px-10 h-full text-center">
//                         {mode === 'signin' ? (
//                             <>
//                                 <h1 className="text-3xl font-bold mb-4">Sign In</h1>
//                                 <SocialLogins />
//                                 <AuthInput name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//                                 <AuthInput name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//                                 <button onClick={() => setMode('forgot')} className="text-xs text-gray-500 my-3 hover:underline">Forgot your password?</button>
//                                 <MainButton text="Sign In" onClick={() => {/* Call loginOTPRequest */}} />
//                             </>
//                         ) : mode === 'forgot' ? (
//                             <>
//                                 <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
//                                 <p className="text-xs text-gray-500 mb-4">We'll send a code to your email</p>
//                                 <AuthInput name="email" type="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
//                                 <MainButton text="Send Reset Code" onClick={() => setMode('reset')} />
//                                 <button onClick={() => setMode('signin')} className="text-xs mt-4 flex items-center gap-1 text-gray-400"><FaArrowLeft /> Back to Login</button>
//                             </>
//                         ) : mode === 'reset' ? (
//                             <>
//                                 <h1 className="text-2xl font-bold mb-4">New Password</h1>
//                                 <AuthInput name="otp" placeholder="Reset Code" value={formData.otp} onChange={handleChange} />
//                                 <AuthInput name="newPassword" type="password" placeholder="New Password" value={formData.newPassword} onChange={handleChange} />
//                                 <MainButton text="Update Password" onClick={() => {/* Call resetPassword */}} />
//                             </>
//                         ) : null}
//                     </div>
//                 </div>

//                 {/* --- OVERLAY: THE SLIDING PANEL --- */}
//                 <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-100 
//                     ${isSlid ? '-translate-x-full rounded-tr-[100px] rounded-br-[100px]' : 'rounded-tl-[100px] rounded-bl-[100px]'}`}>
                    
//                     <div className={`bg-linear-to-br from-indigo-600 to-purple-700 text-white relative -left-full h-full w-[200%] transition-all duration-700 ease-in-out 
//                         ${isSlid ? 'translate-x-1/2' : 'translate-x-0'}`}>
                        
//                         {/* Overlay Left (Visible when isSlid is true) */}
//                         <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-10 text-center top-0 transition-all duration-700 
//                             ${isSlid ? 'translate-x-0' : '-translate-x-[20%]'}`}>
//                             <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
//                             <p className="text-sm mb-8 leading-relaxed">Already have an account? Log in to keep shopping our luxury collection.</p>
//                             <GhostButton text="Sign In" onClick={() => toggleSlide(false)} />
//                         </div>

//                         {/* Overlay Right (Visible when isSlid is false) */}
//                         <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-10 text-center top-0 right-0 transition-all duration-700 
//                             ${isSlid ? 'translate-x-[20%]' : 'translate-x-0'}`}>
//                             <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
//                             <p className="text-sm mb-8 leading-relaxed">Join Cloud Luxury today and start your journey with us.</p>
//                             <GhostButton text="Sign Up" onClick={() => toggleSlide(true)} />

//                             <MainButton 
//                             text="Sign In" 
//                             onClick={() => {
//                                 alert("Success! Going to profile...");
//                                 navigate("/profile"); // Now navigate is "read", and the warning disappears!
//                             }} 
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // --- REUSABLE SUB-COMPONENTS ---

// const AuthInput = ({ ...props }: any) => (
//     <input {...props} className="w-full bg-gray-100 border-none my-2 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
// );

// const MainButton = ({ text, onClick }: { text: string, onClick: () => void }) => (
//     <button onClick={onClick} className="mt-4 bg-indigo-600 text-white text-xs py-3 px-12 rounded-xl font-bold uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-lg">
//         {text}
//     </button>
// );

// const GhostButton = ({ text, onClick }: { text: string, onClick: () => void }) => (
//     <button onClick={onClick} className="bg-transparent border-2 border-white text-white text-xs py-3 px-12 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all active:scale-95">
//         {text}
//     </button>
// );

// const SocialLogins = () => (
//     <div className="flex gap-4 mb-4">
//         <div className="p-3 border rounded-full cursor-pointer hover:bg-gray-50 transition-all"><FaGoogle className="text-red-500" /></div>
//         <div className="p-3 border rounded-full cursor-pointer hover:bg-gray-50 transition-all"><FaFacebookF className="text-blue-600" /></div>
//     </div>
// );



import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaArrowLeft } from 'react-icons/fa';

// 1. IMPORT YOUR BACKEND FUNCTIONS
import { register, activateAccount, login, resetPassword, forgotPasswordRequest } from '../api/api'

type AuthMode = 'signin' | 'signup' | 'forgot' | 'reset' | 'activate';

export default function UnifiedAuth() {
    const [mode, setMode] = useState<AuthMode>('signin');
    const [isSlid, setIsSlid] = useState(false);
    const [loading, setLoading] = useState(false); // For button loading state
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', otp: '', newPassword: ''
    });
    
    const navigate = useNavigate();

    const toggleSlide = (toSignup: boolean) => {
        setIsSlid(toSignup);
        setMode(toSignup ? 'signup' : 'signin');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- 2. BACKEND HANDLER FUNCTIONS ---

    const handleSignup = async () => {
        setLoading(true);
        try {
            await register({ name: formData.name, email: formData.email, password: formData.password });
            alert("Registration successful! Please check your email for the OTP.");
            setMode('activate'); // Switch to OTP input view
        } catch (err: any) {
            alert(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async () => {
        setLoading(true);
        try {
            await activateAccount({ email: formData.email, otp: formData.otp });
            alert("Account activated! You can now sign in.");
            toggleSlide(false); // Slide back to Sign In side
            setMode('signin');
        } catch (err: any) {
            alert(err.response?.data?.message || "Activation failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await login({ email: formData.email, password: formData.password });
            // Save your tokens just like your old code did
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            
            alert("Login Successful!");
            navigate("/profile"); // Move to profile
        } catch (err: any) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleForgot = async () => {
        setLoading(true);
        try {
            await forgotPasswordRequest({ email: formData.email });
            alert("Reset code sent to your email.");
            setMode('reset'); // Move to Reset Password view
        } catch (err: any) {
            alert(err.response?.data?.message || "Request failed");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setLoading(true);
        try {
            await resetPassword({ email: formData.email, otp: formData.otp, newPassword: formData.newPassword });
            alert("Password updated successfully!");
            setMode('signin');
        } catch (err: any) {
            alert(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
            <div className={`relative overflow-hidden bg-white rounded-[30px] shadow-2xl w-[850px] max-w-full min-h-[550px] transition-all duration-700 ease-in-out ${isSlid ? 'active' : ''}`}>
                
                {/* --- LEFT SIDE: SIGN UP & ACTIVATION --- */}
                <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-10 
                    ${isSlid ? 'translate-x-full opacity-100 z-50' : 'opacity-0'}`}>
                    
                    <div className="flex flex-col items-center justify-center px-10 h-full text-center">
                        {mode === 'signup' ? (
                            <>
                                <h1 className="text-3xl font-bold mb-4">Create Account</h1>
                                <SocialLogins />
                                <AuthInput name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                                <AuthInput name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                <AuthInput name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                                <MainButton text={loading ? "Loading..." : "Sign Up"} onClick={handleSignup} />
                            </>
                        ) : mode === 'activate' ? (
                            <>
                                <h1 className="text-3xl font-bold mb-2">Verify Email</h1>
                                <p className="text-xs text-gray-500 mb-4">Enter code sent to {formData.email}</p>
                                <AuthInput name="otp" placeholder="6-Digit OTP" value={formData.otp} onChange={handleChange} />
                                <MainButton text={loading ? "Verifying..." : "Activate"} onClick={handleActivate} />
                                <button onClick={() => setMode('signup')} className="text-xs mt-4 text-gray-400 flex items-center gap-1"><FaArrowLeft /> Back</button>
                            </>
                        ) : null}
                    </div>
                </div>

                {/* --- RIGHT SIDE: SIGN IN, FORGOT, RESET --- */}
                <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-20 
                    ${isSlid ? 'translate-x-full' : ''}`}>
                    
                    <div className="flex flex-col items-center justify-center px-10 h-full text-center">
                        {mode === 'signin' ? (
                            <>
                                <h1 className="text-3xl font-bold mb-4">Sign In</h1>
                                <SocialLogins />
                                <AuthInput name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                <AuthInput name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                                <button onClick={() => setMode('forgot')} className="text-xs text-gray-500 my-3 hover:underline">Forgot password?</button>
                                <MainButton text={loading ? "Loading..." : "Sign In"} onClick={handleLogin} />
                            </>
                        ) : mode === 'forgot' ? (
                            <>
                                <h1 className="text-2xl font-bold mb-4">Reset</h1>
                                <AuthInput name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                                <MainButton text={loading ? "Sending..." : "Send Code"} onClick={handleForgot} />
                                <button onClick={() => setMode('signin')} className="text-xs mt-4 text-gray-400 flex items-center gap-1"><FaArrowLeft /> Back</button>
                            </>
                        ) : mode === 'reset' ? (
                            <>
                                <h1 className="text-2xl font-bold mb-4">New Password</h1>
                                <AuthInput name="otp" placeholder="OTP from Email" value={formData.otp} onChange={handleChange} />
                                <AuthInput name="newPassword" type="password" placeholder="New Password" value={formData.newPassword} onChange={handleChange} />
                                <MainButton text={loading ? "Updating..." : "Update"} onClick={handleReset} />
                            </>
                        ) : null}
                    </div>
                </div>

                {/* --- OVERLAY PANEL (The sliding blue part) --- */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-100 
                    ${isSlid ? '-translate-x-full rounded-tr-[100px] rounded-br-[100px]' : 'rounded-tl-[100px] rounded-bl-[100px]'}`}>
                    <div className={`bg-linear-to-br from-indigo-600 to-purple-700 text-white relative -left-full h-full w-[200%] transition-all duration-700 ease-in-out ${isSlid ? 'translate-x-1/2' : 'translate-x-0'}`}>
                        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-10 text-center top-0 transition-all duration-700 ${isSlid ? 'translate-x-0' : '-translate-x-[20%]'}`}>
                            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                            <p className="text-sm mb-8">Login to access your orders and profile.</p>
                            <GhostButton text="Sign In" onClick={() => toggleSlide(false)} />
                        </div>
                        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-10 text-center top-0 right-0 transition-all duration-700 ${isSlid ? 'translate-x-[20%]' : 'translate-x-0'}`}>
                            <h1 className="text-3xl font-bold mb-4">Hello!</h1>
                            <p className="text-sm mb-8">Register to start shopping.</p>
                            <GhostButton text="Sign Up" onClick={() => toggleSlide(true)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-components (Keep these the same)
const AuthInput = ({ ...props }: any) => (
    <input {...props} className="w-full bg-gray-100 border-none my-2 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
);
const MainButton = ({ text, onClick }: { text: string, onClick: () => void }) => (
    <button onClick={onClick} className="mt-4 bg-indigo-600 text-white text-xs py-3 px-12 rounded-xl font-bold uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-lg">{text}</button>
);
const GhostButton = ({ text, onClick }: { text: string, onClick: () => void }) => (
    <button onClick={onClick} className="bg-transparent border-2 border-white text-white text-xs py-3 px-12 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all active:scale-95">{text}</button>
);
const SocialLogins = () => (
    <div className="flex gap-4 mb-4">
        <div className="p-3 border rounded-full cursor-pointer hover:bg-gray-50"><FaGoogle className="text-red-500" /></div>
        <div className="p-3 border rounded-full cursor-pointer hover:bg-gray-50"><FaFacebookF className="text-blue-600" /></div>
    </div>
);