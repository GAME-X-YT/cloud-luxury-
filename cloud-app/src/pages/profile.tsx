


// import { useEffect, useState, useRef } from "react";
// import { getProfile, uploadProfilePic } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { LogOut, Home, ShoppingCart, Heart, Settings, Trash2, Camera, Loader2 } from 'lucide-react';

// interface User {
//     _id: string;
//     name: string;
//     email: string;
//     profilePic?: string;
// }

// const dummyOrderHistory = [
//     { id: '1001', date: '2025-12-01', total: '$89.99', status: 'Delivered' },
//     { id: '1002', date: '2025-11-15', total: '$45.00', status: 'Shipped' },
// ];

// export default function Profile() {
//     const [user, setUser] = useState<User | null>(null);
//     const [activeTab, setActiveTab] = useState('orders');
//     const [profileLoading, setProfileLoading] = useState(true);
//     const [uploading, setUploading] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const navigate = useNavigate();

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         // Ensure the profile stays open and authenticated across refreshes/new tabs
//         if (!token) {
//             navigate("/login");
//             return;
//         }

//         const fetchUser = async () => {
//             try {
//                 const res = await getProfile(token);
//                 setUser(res.data);
//             } catch (err) {
//                 console.error("Fetch profile error:", err);
//                 handleLogout();
//             } finally {
//                 setProfileLoading(false);
//             }
//         };

//         fetchUser();
//     }, [token, navigate]);

//     const handleLogout = () => {
//         localStorage.clear(); // Clears token, user, and userId
//         navigate("/login");
//     };

//     const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file || !token) return;

//         const formData = new FormData();
//         formData.append("image", file);

//         setUploading(true);
//         try {
//             const res = await uploadProfilePic(formData, token);
//             setUser(prev => prev ? { ...prev, profilePic: res.data.profilePic } : null);
//             alert("Profile picture updated!");
//         } catch (err) {
//             alert("Failed to upload image.");
//         } finally {
//             setUploading(false);
//         }
//     };

//     const ProfileLink = ({ icon: Icon, text, onClick, active, isDanger = false }: any) => (
//         <button
//             onClick={onClick}
//             className={`w-full flex items-center p-3 rounded-xl text-left transition-all duration-200 
//                 ${active ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-700'}
//                 ${isDanger ? 'text-red-600 hover:bg-red-50' : ''}
//             `}
//         >
//             <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : ''}`} />
//             <span className="font-medium">{text}</span>
//         </button>
//     );

//     if (profileLoading) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//                 <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
//                 <p className="text-gray-500 font-medium">Loading your profile...</p>
//             </div>
//         );
//     }

//     if (!user) return null;

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
//             <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-xl rounded-4xl overflow-hidden border border-gray-100 dark:border-gray-700">
                
//                 {/* --- Left Sidebar --- */}
//                 <div className="w-full md:w-80 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 p-8">
//                     <div className="flex flex-col items-center text-center mb-8">
//                         <div className="relative group">
//                             {user.profilePic ? (
//                                 <img
//                                     src={`http://localhost:5000/uploads/${user.profilePic}`}
//                                     alt="Profile"
//                                     className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
//                                 />
//                             ) : (
//                                 <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
//                                     {user.name[0]}
//                                 </div>
//                             )}
//                             <button 
//                                 onClick={() => fileInputRef.current?.click()}
//                                 className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:scale-110 transition-transform"
//                                 disabled={uploading}
//                             >
//                                 {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4 text-gray-700" />}
//                             </button>
//                             <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
//                         </div>
//                         <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">{user.name}</h3>
//                         <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>

//                     <nav className="space-y-2">
//                         <ProfileLink icon={Home} text="Marketplace" onClick={() => navigate("/")} />
//                         <ProfileLink icon={ShoppingCart} text="My Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
//                         <ProfileLink icon={Heart} text="Wishlist" active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} />
//                         <ProfileLink icon={Settings} text="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
//                         <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
//                             <ProfileLink icon={LogOut} text="Sign Out" onClick={handleLogout} />
//                             <ProfileLink icon={Trash2} text="Delete Account" onClick={() => alert("Verification required to delete.")} isDanger />
//                         </div>
//                     </nav>
//                 </div>

//                 {/* --- Right Content Area --- */}
//                 <div className="flex-1 p-8 lg:p-12">
//                     <header className="mb-8">
//                         <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
//                             {activeTab.replace('-', ' ')}
//                         </h1>
//                         <p className="text-gray-500">Manage your activity and account preferences.</p>
//                     </header>
                    
//                     <div className="bg-gray-50 dark:bg-gray-900/40 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 min-h-[400px]">
//                         {activeTab === 'orders' && (
//                             <div className="space-y-4">
//                                 {dummyOrderHistory.map((order) => (
//                                     <div key={order.id} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//                                         <div>
//                                             <p className="font-bold text-gray-900 dark:text-white">Order #{order.id}</p>
//                                             <p className="text-sm text-gray-500">{order.date} • <span className="text-green-600 font-medium">{order.status}</span></p>
//                                         </div>
//                                         <p className="text-xl font-black text-indigo-600">{order.total}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         {activeTab === 'settings' && (
//                             <div className="max-w-md space-y-6">
//                                 <div className="space-y-2">
//                                     <label className="text-sm font-semibold text-gray-500">Full Name</label>
//                                     <p className="p-3 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 text-gray-900 dark:text-white">{user.name}</p>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <label className="text-sm font-semibold text-gray-500">Email Address</label>
//                                     <p className="p-3 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 text-gray-900 dark:text-white">{user.email}</p>
//                                 </div>
//                                 <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
//                                     Update Profile
//                                 </button>
//                             </div>
//                         )}

//                         {activeTab === 'wishlist' && (
//                             <div className="flex flex-col items-center justify-center h-64 text-center">
//                                 <Heart className="w-12 h-12 text-gray-300 mb-2" />
//                                 <p className="text-gray-500">Your wishlist is currently empty.</p>
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
import { LogOut, Home, ShoppingCart, Heart, Settings, Trash2, Camera, Loader2, Package, Clock, CheckCircle } from 'lucide-react';
import axios from "axios";

interface User {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState('orders');
    const [profileLoading, setProfileLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [uploading, setUploading] = useState(false); // Used in the upload function
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUserAndOrders = async () => {
            try {
                const profileRes = await getProfile(token);
                setUser(profileRes.data);

                const ordersRes = await axios.get("http://localhost:5000/api/orders/my-orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(ordersRes.data);
            } catch (err) {
                console.error("Data fetch error:", err);
                if (axios.isAxiosError(err) && err.response?.status === 401) handleLogout();
            } finally {
                setProfileLoading(false);
            }
        };

        fetchUserAndOrders();
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // FIXED: Restored this function so the "Cannot find name" error goes away
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !token) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const res = await uploadProfilePic(formData, token);
            // Assuming your backend returns the new filename in res.data.profilePic
            setUser(prev => prev ? { ...prev, profilePic: res.data.profilePic } : null);
            alert("Profile picture updated!");
        } catch (err) {
            console.error(err);
            alert("Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    if (profileLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
                <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-4" />
                <p className="text-neutral-500 font-medium tracking-widest uppercase text-xs">Authenticating...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 pt-24">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white/5 backdrop-blur-md rounded-[3rem] overflow-hidden border border-white/10">
                
                {/* --- Left Sidebar --- */}
                <div className="w-full md:w-80 bg-white/5 border-r border-white/10 p-8">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative group">
                            {user.profilePic ? (
                                <img
                                    src={`http://localhost:5000/uploads/${user.profilePic}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover ring-2 ring-yellow-500/50 shadow-2xl"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-yellow-500 flex items-center justify-center text-black text-4xl font-serif italic shadow-xl">
                                    {user.name[0]}
                                </div>
                            )}
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                                disabled={uploading}
                            >
                                {uploading ? <Loader2 className="w-4 h-4 text-black animate-spin" /> : <Camera className="w-4 h-4 text-black" />}
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
                        </div>
                        <h3 className="text-2xl font-serif italic mt-4">{user.name}</h3>
                        <p className="text-xs text-neutral-500 tracking-widest uppercase mt-1">{user.email}</p>
                    </div>

                    <nav className="space-y-2">
                        <button onClick={() => navigate("/")} className="w-full flex items-center p-3 text-neutral-400 hover:text-white transition-all"><Home className="w-5 h-5 mr-3" /> Marketplace</button>
                        <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center p-3 rounded-2xl transition-all ${activeTab === 'orders' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}><ShoppingCart className="w-5 h-5 mr-3" /> My Orders</button>
                        <button onClick={() => setActiveTab('wishlist')} className={`w-full flex items-center p-3 rounded-2xl transition-all ${activeTab === 'wishlist' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}><Heart className="w-5 h-5 mr-3" /> Wishlist</button>
                        <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center p-3 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}><Settings className="w-5 h-5 mr-3" /> Settings</button>
                        
                        <div className="pt-4 mt-4 border-t border-white/10">
                            <button onClick={handleLogout} className="w-full flex items-center p-3 text-neutral-400 hover:bg-white/5 rounded-2xl transition-all"><LogOut className="w-5 h-5 mr-3" /> Sign Out</button>
                            <button 
                            onClick={() => setShowDeleteConfirm(true)} 
                            className="w-full flex items-center p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all mt-2"
                        >
                            <Trash2 className="w-5 h-5 mr-3" /> Delete Account
                            </button>
                        </div>
                    </nav>
                </div>

                {/* --- Right Content Area --- */}
                <div className="flex-1 p-8 lg:p-12">
                    <h1 className="text-3xl font-serif italic mb-8 capitalize">{activeTab.replace('-', ' ')}</h1>
                    
                    <div className="min-h-[400px]">
                        {activeTab === 'orders' && (
                            <div className="space-y-4">
                        {orders.length > 0 ? orders.map((order: any) => (
                            <div key={order._id} className="flex justify-between items-center p-6 bg-white/5 rounded-4xl border border-white/10 hover:bg-white/8 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500">
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">ID: {order._id.slice(-6)}</p>
                                        <p className="text-sm font-bold text-white">₦{order.totalAmount.toLocaleString()}</p>
                                        
                                        {/* --- ADDED: PAYMENT STATUS BADGE --- */}
                                        <p className={`text-[9px] mt-1 font-bold uppercase tracking-widest ${
                                            order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-neutral-500'
                                        }`}>
                                            {order.paymentStatus === 'Paid' ? '● Verified Payment' : '○ Awaiting Verification'}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right flex flex-col items-end gap-2">
                                    {/* ORDER STATUS BADGE */}
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                        order.orderStatus === 'Delivered' 
                                        ? 'bg-green-500/20 text-green-500' 
                                        : 'bg-yellow-500/20 text-yellow-500'
                                    }`}>
                                        {order.orderStatus === 'Delivered' ? <CheckCircle size={10}/> : <Clock size={10}/>}
                                        {/* {order.orderStatus || order.status || 'Received'} */}
                                          {/* {order.orderStatus || 'Processing'} */}
                                        {order.orderStatus}
                                    </span>
                                    
                                    <p className="text-[10px] text-neutral-600 font-mono tracking-tighter">
                                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-20 text-neutral-600">No orders found. Discovery awaits in the collection.</div>
                        )}
                    </div>
                )}

                        {activeTab === 'settings' && (
                            <div className="max-w-md space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Full Name</label>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">{user.name}</div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Email Address</label>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">{user.email}</div>
                                </div>
                            </div>
                        )}

                        {/* --- STYLISH DELETE MODAL --- */}
                        {showDeleteConfirm && (
                            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                                <div className="bg-[#121212] border border-white/10 w-full max-auto max-w-sm rounded-4xl p-8 shadow-2xl text-center transform animate-in zoom-in-95 duration-300">
                                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                                        <Trash2 size={32} />
                                    </div>
                                    <h2 className="text-xl font-serif italic text-white mb-2">Are you certain?</h2>
                                    <p className="text-neutral-500 text-sm mb-8 leading-relaxed">
                                        This action is permanent. All your order history and collection data will be vanished forever.
                                    </p>
                                    
                                    <div className="flex flex-col gap-3">
                                        <button 
                                            disabled={isDeleting}
                                            onClick={async () => {
                                                setIsDeleting(true);
                                                // REPLACE THIS WITH YOUR ACTUAL DELETE API CALL
                                                setTimeout(() => {
                                                    alert("Account deleted successfully.");
                                                    handleLogout();
                                                }, 2000);
                                            }}
                                            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                                        >
                                            {isDeleting ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete Everything"}
                                        </button>
                                        
                                        <button 
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="w-full py-4 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all"
                                        >
                                            Nevermind, go back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}



                        {activeTab === 'wishlist' && (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <Heart className="w-12 h-12 text-neutral-800 mb-2" />
                                <p className="text-neutral-500 tracking-widest text-xs uppercase">Your collection is empty.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}