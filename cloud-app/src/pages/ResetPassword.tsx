

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../api/api";
import axios from "axios";

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Attempt to pre-fill email if navigated from ForgotPassword.tsx
    const initialEmail = location.state?.email || '';

    const [form, setForm] = useState({ 
        email: initialEmail, 
        otp: '', 
        newPassword: '' 
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (form.newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            // Hits the backend POST /reset-password
            const res = await resetPassword(form); 
            
            setSuccess(res.data.message || "Password updated successfully! Redirecting...");
            
            // Redirect to login after successful reset
            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (err: any) {
            const message = axios.isAxiosError(err) 
                ? err.response?.data?.message || 'Failed to reset password. Check your code.'
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
                className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-5"
            >
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Reset Password
                </h2>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Enter the code you received and your new password.
                </p>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
                {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>}
                
                {/* Email Input (Often disabled if pre-filled, but required for API) */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3"
                    required
                    disabled={loading || !!success}
                />
                
                {/* OTP/Token Input */}
                <input
                    type="text"
                    name="otp"
                    placeholder="Verification Code (e.g., 6 digits)"
                    value={form.otp}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 text-center text-lg"
                    required
                    disabled={loading || !!success}
                />

                {/* New Password Input */}
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password (min 6 characters)"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3"
                    required
                    disabled={loading || !!success}
                    minLength={6}
                />

                <button
                    type="submit"
                    disabled={loading || !!success}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300 disabled:bg-green-400"
                >
                    {loading ? 'Submitting...' : 'Set New Password'}
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