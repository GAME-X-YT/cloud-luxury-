import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import cloudimg from '../assets/cloudimg.png'

interface AuthProps {
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

interface LoginResponse {
    data: {
        token: string;
        role: string;
        userId?: string;
        user?: { _id: string };
    }
}

// 1. IMPORT YOUR BACKEND FUNCTIONS
import { register, activateAccount, loginOTPRequest, login, resetPassword, forgotPasswordRequest } from '../api/api'

type AuthMode = 'signup' | 'signin' | 'forgot' | 'reset' | 'activate' | 'loginOTP';

export default function UnifiedAuth({ setUser }: AuthProps) {
    const [mode, setMode] = useState<AuthMode>('signin');
    const [isSlid, setIsSlid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', otp: '', newPassword: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
    if (resendTimer > 0) {
        const interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }
}, [resendTimer]);

const handleResendCode = async () => {
    if (resendTimer > 0) return; // Prevent spamming
    
    setLoading(true);
    try {
        if (mode === 'activate') {
            // For sign-up activation, we re-run the register logic or a specific resend-activation API
            await register({ name: formData.name, email: formData.email, password: formData.password });
        } else if (mode === 'loginOTP') {
            await loginOTPRequest({ email: formData.email, password: formData.password });
        } else if (mode === 'reset') {
            await forgotPasswordRequest({ email: formData.email });
        }
        
        toast.success("A new code has been sent!");
        setResendTimer(30); // Start 30-second cooldown
    } catch (err: any) {
        toast.error("Failed to resend code.");
    } finally {
        setLoading(false);
    }
};

    const toggleSlide = (toSignup: boolean) => {
        setIsSlid(toSignup);
        setMode(toSignup ? 'signup' : 'signin');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- HANDLER FUNCTIONS ---

    const handleSignup = async () => {
        setLoading(true);
        try {
            await register({ name: formData.name, email: formData.email, password: formData.password });
            toast.success("Registration successful! Please check your email for the OTP.");
            setMode('activate');
        } catch (err: any) {
           toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async () => {
        setLoading(true);
        try {
            const res = await activateAccount({ email: formData.email, otp: formData.otp });
            const userData = {
                role: res.data.role || 'customer',
                email: formData.email,
                id: res.data.userId
            };

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            toast.success("Account activated!");
            if (userData.role === 'admin') {
                navigate("/secret-owner-panel");
            } else {
                window.open("/profile", "_blank");
                navigate("/");
            }
        } catch (err: any) {
           toast.error(err.response?.data?.message || "Activation failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            if (mode === 'signin') {
                await loginOTPRequest({ email: formData.email, password: formData.password });
               toast.success("Step 1 Complete: Please check your email for the login OTP.");
                setMode('loginOTP');
            }
            else if (mode === 'loginOTP') {
                const res: LoginResponse = await login({
                    email: formData.email,
                    password: formData.password,
                    otp: formData.otp
                });

                const userData = {
                    role: res.data.role,
                    email: formData.email,
                    id: res.data.userId || res.data.user?._id
                };

                // STICKY SESSION LOGIC
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("userId", userData.id || "");

                setUser(userData);
                toast.success("Login Successful!");

                if (userData.role === 'admin') {
                    navigate("/secret-owner-panel");
                } else {
                    window.open("/profile", "_blank");
                    navigate("/");
                }
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleForgot = async () => {
        setLoading(true);
        try {
            await forgotPasswordRequest({ email: formData.email });
            toast.success("Reset code sent to your email.");
            setMode('reset');
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Request failed");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setLoading(true);
        try {
            await resetPassword({ email: formData.email, otp: formData.otp, newPassword: formData.newPassword });
            toast.success("Password updated successfully!");
            setMode('signin');
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden font-sans bg-black">

            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-60" 
            style={{ backgroundImage:`url(${cloudimg})` }} />
            <div className="absolute inset-0 z-10 backdrop-blur-xs" />

            <div className={`relative z-20 overflow-hidden bg-gray-800/90 border border-b-blue-500/20 rounded-[60px] shadow-[0_0_100px_rgba(234,179,8,0.2)] w-[1000px] max-w-[95%] min-h-[650px] ease-in-out ${isSlid ? 'active' : ''}`}>

                {/* --- LEFT SIDE: SIGN UP & ACTIVATION --- */}
                <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-10 
                    ${isSlid ? 'translate-x-full opacity-100 z-50' : 'opacity-0'}`}>

                    <div className="flex flex-col items-center justify-center px-10 h-full text-center">
                        {mode === 'signup' ? (
                            <>
                                <h1 className="text-3xl font-bold mb-4 cinzel-regular ">Create Account</h1>
                                <SocialLogins />
                                <AuthInput name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                                <AuthInput name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                <AuthInput name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                                <MainButton text={loading ? "Loading..." : "Sign Up"} onClick={handleSignup} />
                            </>
                        ) : mode === 'activate' ? (
                            <>
                                <h1 className="text-3xl font-bold mb-2 animate-in fade-in">Verify Email</h1>
                                <p className="text-xs text-gray-500 mb-4 animate-in fade-in">Enter code sent to {formData.email}</p>
                                <AuthInput name="otp" placeholder="6-Digit OTP" value={formData.otp} onChange={handleChange} />
                                <MainButton text={loading ? "Verifying..." : "Activate"} onClick={handleActivate} />

                                <button 
                                    disabled={resendTimer > 0} 
                                    onClick={handleResendCode}
                                    className={`mt-4 text-xs font-bold uppercase tracking-tighter transition-all ${resendTimer > 0 ? 'text-gray-500' : 'text-indigo-500 hover:text-indigo-400'}`}
                                >
                                    {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : "Resend New Code"}
                                </button>

                                <button onClick={() => setMode('signup')} className="text-xs mt-4 text-gray-400 flex items-center gap-1 animate-in fade-in"><FaArrowLeft /> Back</button>
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
                                <h1 className="text-5xl font-bold mb-4 italianno-bold ">Sign In</h1>
                                <SocialLogins />
                                <AuthInput name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                <AuthInput name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                                <button onClick={() => setMode('forgot')} className="text-xs text-gray-500 my-3 hover:underline">Forgot password?</button>
                                <MainButton text={loading ? "Sending..." : "Get Login Code"} onClick={handleLogin} />
                            </>
                        ) : mode === 'loginOTP' ? (
                            <>
                                <h1 className="text-3xl font-bold mb-2">Verify Login</h1>
                                <p className="text-xs text-gray-500 mb-4 italianno-bold ">A code was sent to {formData.email}</p>
                                <AuthInput name="otp" placeholder="Enter Login OTP" value={formData.otp} onChange={handleChange} />
                                <MainButton text={loading ? "Verifying..." : "Confirm Login"} onClick={handleLogin} />
                                <button onClick={() => setMode('signin')} className="text-xs mt-4 satisfy-regular text-gray-400 flex satisfy-regular gap-1">
                                    <FaArrowLeft /> Use different account
                                </button>
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

                {/* --- OVERLAY PANEL --- */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-100 
                    ${isSlid ? '-translate-x-full rounded-tr-[100px] rounded-br-[100px]' : 'rounded-tl-[100px] rounded-bl-[100px]'}`}>
                    <div className={`bg-linear-to-br from-gray-700 via-slate-800 to-neutral-700 text-fuchsia-200 relative -left-full h-full w-[200%] transition-all duration-700 ease-in-out ${isSlid ? 'translate-x-1/2' : 'translate-x-0'}`}>
                        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-10 text-center top-0 transition-all duration-700 ${isSlid ? 'translate-x-0' : '-translate-x-[20%]'}`}>
                            <h1 className="text-5xl font-bold mb-4 uppercase italianno-bold ">Already for luxury!</h1>
                            <p className="text-sm mb-8 dancing-bold">Sign in to continue your journey.</p>
                            <GhostButton text="Sign In" onClick={() => toggleSlide(false)} />
                        </div>
                        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-10 text-center top-0 right-0 transition-all duration-700 ${isSlid ? 'translate-x-[20%]' : 'translate-x-0'}`}>
                            <h1 className="text-xl font-bold mb-4 satisfy-regular uppercase ">want to start shopping?</h1>
                            <p className="text-sm mb-8 cinzel-bold">Register to start your luxury life.</p>
                            <GhostButton text="Sign Up" onClick={() => toggleSlide(true)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AuthInput = ({ ...props }: any) => {
    const [show, setShow] = useState(false);
    const isPassword = props.type === "password";

    return (
        <div className="relative w-full my-2">
            <input 
                {...props} 
                type={isPassword ? (show ? "text" : "password") : props.type}
                className="w-full bg-gray-100 border-none p-3 pr-10 text-sm rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 transition-all text-gray-800" 
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                >
                    {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
            )}
        </div>
    );
};
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






