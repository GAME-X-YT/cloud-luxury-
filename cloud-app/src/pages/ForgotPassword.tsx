
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../api/api";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Hits the backend POST /forgot-password-request
            const res = await forgotPasswordRequest({ email }); 
            
            setSuccess(res.data.message || "Password reset instructions sent to your email.");
            
            // 💡 Optional: Automatically navigate to the ResetPassword page, 
            // assuming the user will click the link in the email or enter the OTP.
            setTimeout(() => {
                navigate("/reset-password", { state: { email } });
            }, 3000);

        } catch (err: any) {
            const message = axios.isAxiosError(err) 
                ? err.response?.data?.message || 'Error requesting reset. Please check your email.'
                : 'An unexpected error occurred.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-sm flex flex-col gap-5"
            >
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Forgot Password
                </h2>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Enter your email to receive a password reset code.
                </p>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
                {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>}

                <input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3"
                    required
                    disabled={loading || !!success}
                />

                <button
                    type="submit"
                    disabled={loading || !!success}
                    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
                >
                    {loading ? 'Sending Request...' : 'Send Reset Code'}
                </button>

                <div className="text-center mt-2">
                    <a href="/login" className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300 hover:underline">
                        Back to Login
                    </a>
                </div>
            </form>
        </div>
    );
}