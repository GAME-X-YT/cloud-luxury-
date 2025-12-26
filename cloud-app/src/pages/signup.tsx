

// import { useState } from "react";
// import type { ChangeEvent, FormEvent } from "react";
// import { register } from "../api/api"; // Your existing API call to /register
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
// import ActivateAccount from "./ActivataAccount";

// interface FormState {
//     name: string;
//     email: string;
//     password: string;
// }

// interface RegisterFormProps {
//     onSuccess: (email: string) => void;
// }
  
// const Signup: React.FC<RegisterFormProps> = ({ onSuccess }) => {
//     const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });
//     const [error, setError] = useState<string>('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const navigate = useNavigate();
//     const [email, setEmail] = useState<string>('');

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);

//         try {
//             const res = await register(form); // Hits the backend POST /register endpoint
            
//             // On success, the backend sends the OTP. We proceed to the next step.
//             onSuccess(form.email); 
//             alert(res.data.message);
            
//         } catch (err: any) {
//             setError(err.response?.data?.message || "Registration failed. Please try again.");
//             // If user already exists but is unverified, the backend sends a 202 status
//             if (err.response?.status === 202) {
//                  onSuccess(form.email); // Go to activation form to enter the newly sent code
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleActivationSuccess = () => {
//         // This is where the user is taken to their profile
//         navigate("/profile"); 
//         alert("Account activated successfully! You are now logged in.");
//     };

//     return (
//         <>
//         <ActivateAccount 
//     email={email} 
//     onLoginSuccess={handleActivationSuccess} // 👈 Must be present here
// />


//             <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
//                 Create Your Account
//             </h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//                 {error && (
//                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
//                         {error}
//                     </div>
//                 )}
                
//                 {/* Name Input */}
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Full Name"
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
//                 />

//                 {/* Email Input */}
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
//                 />

//                 {/* Password Input */}
//                 <div className="relative">
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         placeholder="Password"
//                         onChange={handleChange}
//                         required
//                         disabled={isLoading}
//                         className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-150"
//                         aria-label={showPassword ? "Hide password" : "Show password"}
//                     >
//                         {showPassword ? (
//                             <EyeSlashIcon className="w-5 h-5" />
//                         ) : (
//                             <EyeIcon className="w-5 h-5" />
//                         )}
//                     </button>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md disabled:bg-indigo-400"
//                 >
//                     {isLoading ? 'Sending OTP...' : 'Register and Activate'}
//                 </button>
//             </form>
//         </>
//     );
// };

// export default Signup;






import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register, activateAccount } from "../api/api"; // Your existing API call to POST /register
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 


// --- Types ---
interface FormState {
    name: string;
    email: string;
    password: string;
}

// --- Component Start ---

export default function Signup() {
    // 1. Core Hooks and State
    const navigate = useNavigate(); 
    const [step, setStep] = useState<'register' | 'activate'>('register');
    const [email, setEmail] = useState<string>(''); // Holds email for activation step
    const [otp, setOtp] = useState<string>(''); // Holds OTP for activation step
    const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // --- Handlers ---

    // Handles input changes for the Registration form
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Check if the input is for the OTP field (only visible in activation step)
        if (name === 'otp') {
            setOtp(value);
        } else {
            setForm({ ...form, [name]: value });
        }
    };
    
    // FINAL Success Handler (Called after Step 2)
    const handleActivationSuccess = () => {
        navigate("/profile"); 
        alert("Account activated successfully! You are now logged in.");
    };

    // ----------------------------------------------------
    // Step 1: Registration Form Submission (Sends OTP)
    // ----------------------------------------------------
    const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Note: register(form) hits the backend POST /register endpoint
            await register(form); 
            
            // On success, the backend sends the OTP. Proceed to the next step.
            setEmail(form.email); // CRITICAL: Save email for the next step
            setStep('activate'); 
            alert("Registration successful! Please check your email for the activation code.");
            
        } catch (err: any) {
            const message = err.response?.data?.message || "Registration failed. Please try again.";
            setError(message);
            
            // If user already exists but is unverified (backend sends a specific status/message)
            // Assuming your backend sends status 202 or similar for "User exists, re-sent code"
            if (err.response?.status === 202) { 
                 setEmail(form.email);
                 setStep('activate'); 
                 alert(message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ----------------------------------------------------
    // Step 2: Activation Form Submission (Verifies OTP)
    // ----------------------------------------------------
    const handleActivateSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Note: activateAccount hits the backend POST /activate endpoint
            const response = await activateAccount({ email, otp }); 
            
            // Success! Store token and execute final navigation.
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
        // 🛑 ADD THIS: Store the user object including the role
                // This ensures the App.tsx 'user' state updates immediately
                const userData = {
                    id: response.data.userId,
                    role: response.data.role, // Assuming your backend sends this now
                    email: email
                };
                localStorage.setItem('user', JSON.stringify(userData));

                // 2. Success!
                handleActivationSuccess(); 

            } catch (err) {
                // ... error handling ...
            } finally {
                setIsLoading(false);
            }
        };
            
    // Resends the code by hitting the /register endpoint again
    const handleResendCode = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Re-use the registration API call with the known email
            await register({ name: form.name, email: email, password: form.password });
            alert("New activation code sent!");
        } catch (err: any) {
             setError(err.response?.data?.message || "Failed to resend code.");
        } finally {
            setIsLoading(false);
        }
    }

    // --- Conditional Rendering ---
    
    const renderRegisterForm = () => (
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
                Create Your Account
            </h2>
            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm" role="alert">
                    {error}
                </div>
            )}
            
            {/* Name, Email, Password Inputs */}
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required disabled={isLoading} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150" />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required disabled={isLoading} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150" />
            
            <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required disabled={isLoading} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-150" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
            </div>
            
            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md disabled:bg-indigo-400">
                {isLoading ? 'Sending OTP...' : 'Register and Activate'}
            </button>
        </form>
    );

    const renderActivateForm = () => (
        <form onSubmit={handleActivateSubmit} className="flex flex-col gap-5">
             <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center">
                Verify Your Email
            </h2>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
                We sent a code to <strong className="font-medium text-indigo-600 dark:text-indigo-400">{email}</strong>.
            </p>
            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm" role="alert">
                    {error}
                </div>
            )}
            
            {/* OTP Input */}
            <input 
                type="text" 
                name="otp" 
                placeholder="Enter 6-digit OTP code" 
                value={otp}
                onChange={handleChange} // Use the combined handleChange
                required 
                disabled={isLoading} 
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 tracking-wider"
                maxLength={6}
            />
            
            {/* Resend Link */}
            <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-150 underline self-start"
            >
                {isLoading ? 'Sending...' : 'Resend Code'}
            </button>

            {/* Activate Button */}
            <button
                type="submit"
                disabled={isLoading || otp.length < 6}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md disabled:bg-green-400"
            >
                {isLoading ? 'Activating...' : 'Activate Account'}
            </button>
        </form>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg transition-all duration-300">
                
                {step === 'register' ? renderRegisterForm() : renderActivateForm()}
                
                {/* Footer Link */}
                <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
                    {step === 'register' 
                        ? "Already have an account?"
                        : "Received the code?"
                    }
                    <a href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline ml-1 font-medium">
                        {step === 'register' ? "Login" : "Continue to Login"}
                    </a>
                </p>
            </div>
        </div>
    );
}   