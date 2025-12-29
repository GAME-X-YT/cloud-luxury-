

// import { useEffect, useState } from "react";
// import { getProfile } from "../api/api";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { LogOut, Home, ShoppingCart, Heart, Settings, Trash2 } from 'lucide-react'; // Icons for the profile links

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   profilePic?: string;
//   // Note: You may need to update your backend User model to include 'orders'
//   // orders: Array<any>; 
// }

// // Dummy data for the new sections (replace with actual state/API calls later)
// const dummyOrderHistory = [
//     { id: '1001', date: '2025-12-01', total: '$89.99', status: 'Delivered' },
//     { id: '1002', date: '2025-11-15', total: '$45.00', status: 'Shipped' },
//     { id: '1003', date: '2025-10-28', total: '$120.50', status: 'Cancelled' },
// ];

// export default function Profile() {
//     const [user, setUser] = useState<User | null>(null);
//     // const [loading, setLoading] = useState(false);
//     const [activeTab, setActiveTab] = useState('orders'); // New state for tabs
//     const navigate = useNavigate();
//     const [profileLoading, setProfileLoading] = useState(true);

//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         if (!token || !userId) {
//             navigate("/login"); // Redirect if not logged in
//             return;
//         }

//         const fetchUser = async () => {
//             setProfileLoading(true);
//             try {
//                 // Ensure your getProfile function uses the token for auth
//                 const res = await getProfile(token);
//                 setUser(res.data);
//             } catch (err) {
//                 console.error(err);
//                 // Handle token expiration/invalidity
//                 localStorage.removeItem("token");
//                 localStorage.removeItem("userId");
//                 alert("Session expired or failed to fetch profile. Please log in again.");
//                 navigate("/login");
//             } finally {
//                 setProfileLoading(false);
//             }
//         };

//         fetchUser();
//     }, [token, userId, navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         navigate("/login");
//     };

//     // The backend `deleteUser` requires password and OTP, so we are simplifying 
//     // the frontend for now, or this button would trigger a separate OTP flow.
//     // For simplicity, I've updated the button to link to a hypothetical Delete Page.
//     const handleDelete = () => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete your account? This is a sensitive action."
//         );
//         if (confirmDelete) {
//             // In a real app, this would redirect to a page that requests password/OTP
//             // For now, we'll navigate to a hypothetical account settings/delete area
//             alert("Account deletion requires confirmation via password and OTP. Redirecting to settings.");
//             // navigate("/settings/delete"); 
//         }
//     };
    
//     // Helper component for the navigation links
//     const ProfileLink = ({ icon: Icon, text, onClick, isDanger = false }: any) => (
//         <button
//             onClick={onClick}
//             className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 
//                 ${isDanger ? 'text-red-600 hover:bg-red-100' : 'text-gray-700 hover:bg-indigo-50'}
//             `}
//         >
//             <Icon className="w-5 h-5 mr-3" />
//             <span className="font-medium">{text}</span>
//         </button>
//     );

//     // --- RENDER SECTIONS ---

//     const renderUserInfo = () => (
//         <div className="flex flex-col items-center p-4 border-b border-gray-200">
//             {user?.profilePic ? (
//                 <img
//                     src={`http://localhost:5000/uploads/${user.profilePic}`}
//                     alt={`${user.name}'s Profile`}
//                     className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
//                 />
//             ) : (
//                 <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white shadow-md">
//                     {user?.name[0]}
//                 </div>
//             )}
//             <h3 className="text-xl font-semibold mt-3 text-gray-900">{user?.name}</h3>
//             <p className="text-sm text-gray-500">{user?.email}</p>
//         </div>
//     );

//     const renderOrderHistory = () => (
//         <div className="space-y-4">
//             <h4 className="text-lg font-semibold border-b pb-2 text-gray-800">Order History</h4>
//             {dummyOrderHistory.map((order) => (
//                 <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
//                     <div>
//                         <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
//                         <p className={`text-xs ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-red-600'}`}>
//                             {order.status} on {order.date}
//                         </p>
//                     </div>
//                     <p className="text-lg font-bold text-indigo-600">{order.total}</p>
//                 </div>
//             ))}
//             <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium pt-2">
//                 View All Orders
//             </button>
//         </div>
//     );

//     // const renderCartSection = () => (
//     //     <div className="space-y-4">
//     //         <h4 className="text-lg font-semibold border-b pb-2 text-gray-800">Shopping Cart (Saved Items)</h4>
//     //         <p className="text-gray-500 text-sm">
//     //             This area would typically display a summary of items currently in your cart.
//     //         </p>
//     //         <div className="flex justify-center">
//     //             <button 
//     //                 onClick={() => navigate('/cart')} 
//     //                 className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
//     //             >
//     //                 Go to Cart
//     //             </button>
//     //         </div>
//     //     </div>
//     // );
    
//     // --- MAIN RENDER ---
    
//     if (profileLoading) return <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">Loading profile details...</div>;
//     if (!user) return <div className="min-h-screen flex items-center justify-center text-lg text-red-600">Profile data missing. Please log in.</div>;


//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
//             <div className="max-w-6xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
                
//                 {/* --- Left Sidebar (Navigation & Info) --- */}
//                 <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
//                     <h2 className="text-3xl font-extrabold text-indigo-600 mb-6 border-b pb-3">My Account</h2>
                    
//                     {renderUserInfo()}

//                     <nav className="mt-6 space-y-1">
//                         <ProfileLink 
//                             icon={Home} 
//                             text="Home Page" 
//                             onClick={() => navigate("/")} 
//                         />
//                         <ProfileLink 
//                             icon={ShoppingCart} 
//                             text="My Orders" 
//                             onClick={() => setActiveTab('orders')} 
//                         />
//                         <ProfileLink 
//                             icon={Heart} 
//                             text="Wishlist" 
//                             onClick={() => setActiveTab('wishlist')} 
//                         />
//                         <ProfileLink 
//                             icon={Settings} 
//                             text="Account Settings" 
//                             onClick={() => setActiveTab('settings')} 
//                         />
//                         <ProfileLink 
//                             icon={LogOut} 
//                             text="Log Out" 
//                             onClick={handleLogout} 
//                         />
//                     </nav>

//                     <div className="mt-8 pt-4 border-t border-gray-200">
//                         <ProfileLink 
//                             icon={Trash2} 
//                             text="Delete Account" 
//                             onClick={handleDelete} 
//                             isDanger={true}
//                         />
//                     </div>
//                 </div>

//                 {/* --- Right Content Area (Dynamic Content) --- */}
//                 <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-8">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                         {activeTab === 'orders' && 'Your Recent Orders'}
//                         {activeTab === 'wishlist' && 'Your Wishlist'}
//                         {activeTab === 'settings' && 'Manage Account Settings'}
//                     </h3>
                    
//                     <div className="bg-white p-6 rounded-lg border border-gray-200 min-h-[50vh]">
//                         {activeTab === 'orders' && renderOrderHistory()}
//                         {activeTab === 'wishlist' && (
//                             <p className="text-gray-500">
//                                 This section would show products you have saved to your wishlist.
//                             </p>
//                         )}
//                         {activeTab === 'settings' && (
//                             <div className="space-y-4">
//                                 <h4 className="font-semibold text-gray-800">Personal Information</h4>
//                                 <p>Name: {user.name}</p>
//                                 <p>Email: {user.email}</p>
//                                 <button className="text-indigo-600 hover:underline text-sm">Edit Profile</button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }





import { useEffect, useState, useRef } from "react";
import { getProfile, uploadProfilePic } from "../api/api";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, ShoppingCart, Heart, Settings, Trash2, Camera, Loader2 } from 'lucide-react';

interface User {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
}

const dummyOrderHistory = [
    { id: '1001', date: '2025-12-01', total: '$89.99', status: 'Delivered' },
    { id: '1002', date: '2025-11-15', total: '$45.00', status: 'Shipped' },
];

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState('orders');
    const [profileLoading, setProfileLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        // Ensure the profile stays open and authenticated across refreshes/new tabs
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await getProfile(token);
                setUser(res.data);
            } catch (err) {
                console.error("Fetch profile error:", err);
                handleLogout();
            } finally {
                setProfileLoading(false);
            }
        };

        fetchUser();
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.clear(); // Clears token, user, and userId
        navigate("/login");
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !token) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const res = await uploadProfilePic(formData, token);
            setUser(prev => prev ? { ...prev, profilePic: res.data.profilePic } : null);
            alert("Profile picture updated!");
        } catch (err) {
            alert("Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    const ProfileLink = ({ icon: Icon, text, onClick, active, isDanger = false }: any) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center p-3 rounded-xl text-left transition-all duration-200 
                ${active ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-700'}
                ${isDanger ? 'text-red-600 hover:bg-red-50' : ''}
            `}
        >
            <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : ''}`} />
            <span className="font-medium">{text}</span>
        </button>
    );

    if (profileLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading your profile...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-xl rounded-4xl overflow-hidden border border-gray-100 dark:border-gray-700">
                
                {/* --- Left Sidebar --- */}
                <div className="w-full md:w-80 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 p-8">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative group">
                            {user.profilePic ? (
                                <img
                                    src={`http://localhost:5000/uploads/${user.profilePic}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                    {user.name[0]}
                                </div>
                            )}
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:scale-110 transition-transform"
                                disabled={uploading}
                            >
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4 text-gray-700" />}
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
                        </div>
                        <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <nav className="space-y-2">
                        <ProfileLink icon={Home} text="Marketplace" onClick={() => navigate("/")} />
                        <ProfileLink icon={ShoppingCart} text="My Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                        <ProfileLink icon={Heart} text="Wishlist" active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} />
                        <ProfileLink icon={Settings} text="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                            <ProfileLink icon={LogOut} text="Sign Out" onClick={handleLogout} />
                            <ProfileLink icon={Trash2} text="Delete Account" onClick={() => alert("Verification required to delete.")} isDanger />
                        </div>
                    </nav>
                </div>

                {/* --- Right Content Area --- */}
                <div className="flex-1 p-8 lg:p-12">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
                            {activeTab.replace('-', ' ')}
                        </h1>
                        <p className="text-gray-500">Manage your activity and account preferences.</p>
                    </header>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/40 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 min-h-[400px]">
                        {activeTab === 'orders' && (
                            <div className="space-y-4">
                                {dummyOrderHistory.map((order) => (
                                    <div key={order.id} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">Order #{order.id}</p>
                                            <p className="text-sm text-gray-500">{order.date} • <span className="text-green-600 font-medium">{order.status}</span></p>
                                        </div>
                                        <p className="text-xl font-black text-indigo-600">{order.total}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="max-w-md space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-500">Full Name</label>
                                    <p className="p-3 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 text-gray-900 dark:text-white">{user.name}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-500">Email Address</label>
                                    <p className="p-3 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 text-gray-900 dark:text-white">{user.email}</p>
                                </div>
                                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                    Update Profile
                                </button>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <Heart className="w-12 h-12 text-gray-300 mb-2" />
                                <p className="text-gray-500">Your wishlist is currently empty.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}