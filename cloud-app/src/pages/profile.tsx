// import { useEffect, useState } from "react";
// import { getProfile } from "../api/api";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   profilePic?: string;
// }

// export default function Profile() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [profileLoading, setProfileLoading] = useState(true);


//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!token || !userId) return;

//     const fetchUser = async () => {
//           setProfileLoading(true);
//       try {
//         const res = await getProfile( token );
//         setUser(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch user profile");
//       } finally {
//             setProfileLoading(false);
//         }
//     };

//     fetchUser();
//   }, [token, userId]);

//   const handleDelete = async () => {
//     if (!token || !userId) return;

//     const confirmDelete = confirm(
//       "Are you sure you want to delete your account? This action cannot be undone."
//     );
//     if (!confirmDelete) return;

//     setLoading(true);
//     try {
//       await axios.delete(`http://localhost:5000/api/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Account deleted successfully");
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       navigate("/login"); // redirect to login page
//     } catch (err: any) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error deleting account");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (profileLoading) return <div className="p-4 text-center">Loading profile...</div>;
  
//   if (!user) return <div className="p-4 text-center">Loading...</div>;



//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center gap-4">
//         {user.profilePic ? (
//           <img
//             src={`http://localhost:5000/uploads/${user.profilePic}`}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
//             No Image
//           </div>
//         )}

//         <h2 className="text-2xl font-bold">{user.name}</h2>
//         <p className="text-gray-600">{user.email}</p>

//         {/* Add more user details here if needed */}
//         {/* Example: phone number, address, etc. */}

//         <button
//           onClick={handleDelete}
//           disabled={loading}
//           className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
//         >
//           {loading ? "Deleting..." : "Delete My Account"}
//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getProfile } from "../api/api";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, ShoppingCart, Heart, Settings, Trash2 } from 'lucide-react'; // Icons for the profile links

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  // Note: You may need to update your backend User model to include 'orders'
  // orders: Array<any>; 
}

// Dummy data for the new sections (replace with actual state/API calls later)
const dummyOrderHistory = [
    { id: '1001', date: '2025-12-01', total: '$89.99', status: 'Delivered' },
    { id: '1002', date: '2025-11-15', total: '$45.00', status: 'Shipped' },
    { id: '1003', date: '2025-10-28', total: '$120.50', status: 'Cancelled' },
];

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    // const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('orders'); // New state for tabs
    const navigate = useNavigate();
    const [profileLoading, setProfileLoading] = useState(true);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!token || !userId) {
            navigate("/login"); // Redirect if not logged in
            return;
        }

        const fetchUser = async () => {
            setProfileLoading(true);
            try {
                // Ensure your getProfile function uses the token for auth
                const res = await getProfile(token);
                setUser(res.data);
            } catch (err) {
                console.error(err);
                // Handle token expiration/invalidity
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                alert("Session expired or failed to fetch profile. Please log in again.");
                navigate("/login");
            } finally {
                setProfileLoading(false);
            }
        };

        fetchUser();
    }, [token, userId, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    // The backend `deleteUser` requires password and OTP, so we are simplifying 
    // the frontend for now, or this button would trigger a separate OTP flow.
    // For simplicity, I've updated the button to link to a hypothetical Delete Page.
    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This is a sensitive action."
        );
        if (confirmDelete) {
            // In a real app, this would redirect to a page that requests password/OTP
            // For now, we'll navigate to a hypothetical account settings/delete area
            alert("Account deletion requires confirmation via password and OTP. Redirecting to settings.");
            // navigate("/settings/delete"); 
        }
    };
    
    // Helper component for the navigation links
    const ProfileLink = ({ icon: Icon, text, onClick, isDanger = false }: any) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 
                ${isDanger ? 'text-red-600 hover:bg-red-100' : 'text-gray-700 hover:bg-indigo-50'}
            `}
        >
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{text}</span>
        </button>
    );

    // --- RENDER SECTIONS ---

    const renderUserInfo = () => (
        <div className="flex flex-col items-center p-4 border-b border-gray-200">
            {user?.profilePic ? (
                <img
                    src={`http://localhost:5000/uploads/${user.profilePic}`}
                    alt={`${user.name}'s Profile`}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
            ) : (
                <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white shadow-md">
                    {user?.name[0]}
                </div>
            )}
            <h3 className="text-xl font-semibold mt-3 text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
    );

    const renderOrderHistory = () => (
        <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b pb-2 text-gray-800">Order History</h4>
            {dummyOrderHistory.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                        <p className={`text-xs ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-red-600'}`}>
                            {order.status} on {order.date}
                        </p>
                    </div>
                    <p className="text-lg font-bold text-indigo-600">{order.total}</p>
                </div>
            ))}
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium pt-2">
                View All Orders
            </button>
        </div>
    );

    // const renderCartSection = () => (
    //     <div className="space-y-4">
    //         <h4 className="text-lg font-semibold border-b pb-2 text-gray-800">Shopping Cart (Saved Items)</h4>
    //         <p className="text-gray-500 text-sm">
    //             This area would typically display a summary of items currently in your cart.
    //         </p>
    //         <div className="flex justify-center">
    //             <button 
    //                 onClick={() => navigate('/cart')} 
    //                 className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
    //             >
    //                 Go to Cart
    //             </button>
    //         </div>
    //     </div>
    // );
    
    // --- MAIN RENDER ---
    
    if (profileLoading) return <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">Loading profile details...</div>;
    if (!user) return <div className="min-h-screen flex items-center justify-center text-lg text-red-600">Profile data missing. Please log in.</div>;


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
                
                {/* --- Left Sidebar (Navigation & Info) --- */}
                <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-3xl font-extrabold text-indigo-600 mb-6 border-b pb-3">My Account</h2>
                    
                    {renderUserInfo()}

                    <nav className="mt-6 space-y-1">
                        <ProfileLink 
                            icon={Home} 
                            text="Home Page" 
                            onClick={() => navigate("/")} 
                        />
                        <ProfileLink 
                            icon={ShoppingCart} 
                            text="My Orders" 
                            onClick={() => setActiveTab('orders')} 
                        />
                        <ProfileLink 
                            icon={Heart} 
                            text="Wishlist" 
                            onClick={() => setActiveTab('wishlist')} 
                        />
                        <ProfileLink 
                            icon={Settings} 
                            text="Account Settings" 
                            onClick={() => setActiveTab('settings')} 
                        />
                        <ProfileLink 
                            icon={LogOut} 
                            text="Log Out" 
                            onClick={handleLogout} 
                        />
                    </nav>

                    <div className="mt-8 pt-4 border-t border-gray-200">
                        <ProfileLink 
                            icon={Trash2} 
                            text="Delete Account" 
                            onClick={handleDelete} 
                            isDanger={true}
                        />
                    </div>
                </div>

                {/* --- Right Content Area (Dynamic Content) --- */}
                <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        {activeTab === 'orders' && 'Your Recent Orders'}
                        {activeTab === 'wishlist' && 'Your Wishlist'}
                        {activeTab === 'settings' && 'Manage Account Settings'}
                    </h3>
                    
                    <div className="bg-white p-6 rounded-lg border border-gray-200 min-h-[50vh]">
                        {activeTab === 'orders' && renderOrderHistory()}
                        {activeTab === 'wishlist' && (
                            <p className="text-gray-500">
                                This section would show products you have saved to your wishlist.
                            </p>
                        )}
                        {activeTab === 'settings' && (
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-800">Personal Information</h4>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <button className="text-indigo-600 hover:underline text-sm">Edit Profile</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}