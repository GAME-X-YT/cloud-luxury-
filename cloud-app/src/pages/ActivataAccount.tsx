import React, { useState } from 'react';
import axios from 'axios';
// Assume your backend URL is stored here:
const API_URL = 'http://localhost:5000/api/users'; // Adjust this or use your register utility

interface ActivateAccountProps {
    email: string;
    onLoginSuccess: () => void;
}

const activateAccount: React.FC<ActivateAccountProps> = ({ email, onLoginSuccess }) => {
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Hitting the new backend POST /activate endpoint
            const response = await axios.post(`${API_URL}/activate`, { email, otp });
            
            // Success! Store token and update state.
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);

            onLoginSuccess(); // Navigate user away
            
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Activation failed. Check your code.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to resend the code (hits the same /register endpoint with existing user)
    const handleResend = async () => {
        setIsLoading(true);
        setError('');
        try {
            await axios.post(`${API_URL}/register`, { email, name: "resend", password: "resend" });
            alert("New activation code sent!");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to resend code.");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center">
                Verify Your Email
            </h2>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
                We sent a code to <strong className="font-medium text-indigo-600 dark:text-indigo-400">{email}</strong>.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
                        {error}
                    </div>
                )}

                {/* OTP Input */}
                <input 
                    type="text" 
                    name="otp" 
                    placeholder="Enter 6-digit OTP code" 
                    onChange={(e) => setOtp(e.target.value)} 
                    required 
                    disabled={isLoading} 
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 tracking-wider"
                    maxLength={6}
                />
                
                {/* Resend Button */}
                <button
                    type="button"
                    onClick={handleResend}
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
        </>
    );
};

export default activateAccount;