
// import { useEffect, useState, useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { getProfile, uploadProfilePic } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { LogOut, Home, ShoppingCart, Heart, Settings, Trash2, Camera, Loader2, Package, Clock, CheckCircle, ShoppingBag } from 'lucide-react';
// import axios from "axios";

// interface User {
//     _id: string;
//     name: string;
//     email: string;
//     profilePic?: string;
// }

// export default function Profile() {
//     const [user, setUser] = useState<User | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     const [activeTab, setActiveTab] = useState('orders');
//     const [profileLoading, setProfileLoading] = useState(true);
//     const [orders, setOrders] = useState([]);
//     const [uploading, setUploading] = useState(false); // Used in the upload function
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [isDeleting, setIsDeleting] = useState(false);
//     const navigate = useNavigate();
//     const { scrollY } = useScroll();
//     const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         if (!token) {
//             navigate("/login");
//             return;
//         }

//         const fetchUserAndOrders = async () => {
//             try {
//                 const profileRes = await getProfile(token);
//                 setUser(profileRes.data);

//                 const ordersRes = await axios.get("http://localhost:5000/api/orders/my-orders", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setOrders(ordersRes.data);
//             } catch (err) {
//                 console.error("Data fetch error:", err);
//                 if (axios.isAxiosError(err) && err.response?.status === 401) handleLogout();
//             } finally {
//                 setProfileLoading(false);
//             }
//         };

//         fetchUserAndOrders();
//     }, [token, navigate]);

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/login");
//     };

//     // FIXED: Restored this function so the "Cannot find name" error goes away
//     const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // VALIDATION: Prevent huge files (e.g., limit to 2MB)
//     if (file.size > 2 * 1024 * 1024) {
//         alert("Image too large. Please choose an image under 2MB.");
//         return;
//     }

//     // INSTANT PREVIEW (Luxury touch: UI updates before the server even finishes)
//     const reader = new FileReader();
//     reader.onloadend = () => setPreviewUrl(reader.result as string);
//     reader.readAsDataURL(file);

//     const formData = new FormData();
//     formData.append("image", file);

//     setUploading(true);
//     try {
//         const res = await uploadProfilePic(formData, token!);
        
//         // Sync with Backend
//         setUser(prev => prev ? { ...prev, profilePic: res.data.profilePic } : null);
        
//         // Optional: Update localStorage if you store user data there
//         const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//         storedUser.profilePic = res.data.profilePic;
//         localStorage.setItem("user", JSON.stringify(storedUser));

//     } catch (err) {
//         console.error(err);
//         setPreviewUrl(null); // Revert preview on failure
//         alert("Failed to save to the cloud.");
//     } finally {
//         setUploading(false);
//     }
// };
//     if (profileLoading) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
//                 <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-4" />
//                 <p className="text-neutral-500 font-medium tracking-widest uppercase text-xs">Authenticating...</p>
//             </div>
//         );
//     }

//     if (!user) return null;

//     return (
//         <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">

//             {/* 1. BACKGROUND IMAGE (Sibling to content) */}
//             <motion.div 
//             style={{ scale }} 
//             className="fixed inset-0 opacity-40 z-0 pointer-events-none"
//             >
//             <img 
//                 src="https://i.pinimg.com/736x/4a/6b/d8/4a6bd842233e20494d2761f2efa70018.jpg" 
//                 className="w-full h-full object-cover" 
//                 alt="Luxury Background"
//             />
//             <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/80 to-[#050505]" />
//             </motion.div>

//             {/* 2. FLOATING BAGS (Sibling to content) */}
//             <div className="fixed inset-0 pointer-events-none z-10">
//             {[...Array(8)].map((_, i) => (
//                 <motion.div
//                 key={i}
//                 initial={{ y: -100, opacity: 0 }}
//                 animate={{ 
//                     y: [0, 1000], 
//                     x: [0, 100, -100, 0],
//                     rotate: [0, 360],
//                     opacity: [0, 0.2, 0]
//                 }}
//                 transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
//                 className="absolute text-yellow-500/20"
//                 style={{ left: `${i * 15}%`, top: '-5%' }}
//                 >
//                 <ShoppingBag size={20 + i * 10} strokeWidth={1} />
//                 </motion.div>
//             ))}
//             </div>
//             <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white/5 backdrop-blur-md rounded-[3rem] overflow-hidden border border-white/10">
                
//                 {/* --- Left Sidebar --- */}
//                 <div className="w-full md:w-80 bg-white/5 border-r border-white/10 p-8">
//                     <div className="flex flex-col items-center text-center mb-8">
//                         <div className="relative group">
//                             {previewUrl || user.profilePic ? (
//                                 <img
//                                     src={previewUrl || `http://localhost:5000/uploads/${user.profilePic}`}
//                                     alt="Profile"
//                                     className={`w-32 h-32 rounded-full object-cover ring-2 ring-yellow-500/50 shadow-2xl transition-opacity ${uploading ? 'opacity-50' : 'opacity-100'}`}
//                                 />
//                             ) : (
//                                 <div className="w-32 h-32 rounded-full bg-yellow-500 flex items-center justify-center text-black text-4xl font-serif italic shadow-xl">
//                                     {user.name[0]}
//                                 </div>
//                             )}
//                             <button 
//                                 onClick={() => fileInputRef.current?.click()}
//                                 className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
//                                 disabled={uploading}
//                             >
//                                 {uploading ? <Loader2 className="w-4 h-4 text-black animate-spin" /> : <Camera className="w-4 h-4 text-black" />}
//                             </button>
//                             <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
//                         </div>
//                         <h3 className="text-2xl font-serif italic mt-4">{user.name}</h3>
//                         <p className="text-xs text-neutral-500 tracking-widest uppercase mt-1">{user.email}</p>
//                     </div>

//                     <nav className="space-y-2">
//                         <button onClick={() => navigate("/")} className="w-full flex items-center p-3 text-neutral-400 hover:text-white transition-all"><Home className="w-5 h-5 mr-3" /> Marketplace</button>
//                         <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center p-3 rounded-2xl transition-all ${activeTab === 'orders' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}><ShoppingCart className="w-5 h-5 mr-3" /> My Orders</button>
//                         <button onClick={() => setActiveTab('wishlist')} className={`w-full flex items-center p-3 rounded-2xl transition-all ${activeTab === 'wishlist' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}><Heart className="w-5 h-5 mr-3" /> Wishlist</button>
//                         <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center p-3 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-yellow-500 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}><Settings className="w-5 h-5 mr-3" /> Settings</button>
                        
//                         <div className="pt-4 mt-4 border-t border-white/10">
//                             <button onClick={handleLogout} className="w-full flex items-center p-3 text-neutral-400 hover:bg-white/5 rounded-2xl transition-all"><LogOut className="w-5 h-5 mr-3" /> Sign Out</button>
//                             <button 
//                             onClick={() => setShowDeleteConfirm(true)} 
//                             className="w-full flex items-center p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all mt-2"
//                         >
//                             <Trash2 className="w-5 h-5 mr-3" /> Delete Account
//                             </button>
//                         </div>
//                     </nav>
//                 </div>

//                 {/* --- Right Content Area --- */}
//                 <div className="flex-1 p-8 lg:p-12">
//                     <h1 className="text-3xl font-serif italic mb-8 capitalize">{activeTab.replace('-', ' ')}</h1>
                    
//                     <div className="min-h-[400px]">
//                         {activeTab === 'orders' && (
//                             <div className="space-y-4">
//                         {orders.length > 0 ? orders.map((order: any) => (
//                             <div key={order._id} className="flex justify-between items-center p-6 bg-white/5 rounded-4xl border border-white/10 hover:bg-white/8 transition-colors">
//                                 <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500">
//                                         <Package size={20} />
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] text-neutral-500 uppercase tracking-widest">ID: {order._id.slice(-6)}</p>
//                                         <p className="text-sm font-bold text-white">₦{order.totalAmount.toLocaleString()}</p>
                                        
//                                         {/* --- ADDED: PAYMENT STATUS BADGE --- */}
//                                         <p className={`text-[9px] mt-1 font-bold uppercase tracking-widest ${
//                                             order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-neutral-500'
//                                         }`}>
//                                             {order.paymentStatus === 'Paid' ? '● Verified Payment' : '○ Awaiting Verification'}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="text-right flex flex-col items-end gap-2">
//                                     {/* ORDER STATUS BADGE */}
//                                     <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
//                                         order.orderStatus === 'Delivered' 
//                                         ? 'bg-green-500/20 text-green-500' 
//                                         : 'bg-yellow-500/20 text-yellow-500'
//                                     }`}>
//                                         {order.orderStatus === 'Delivered' ? <CheckCircle size={10}/> : <Clock size={10}/>}
//                                         {/* {order.orderStatus || order.status || 'Received'} */}
//                                           {/* {order.orderStatus || 'Processing'} */}
//                                         {order.orderStatus}
//                                     </span>
                                    
//                                     <p className="text-[10px] text-neutral-600 font-mono tracking-tighter">
//                                         {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
//                                     </p>
//                                 </div>
//                             </div>
//                         )) : (
//                             <div className="text-center py-20 text-neutral-600">No orders found. Discovery awaits in the collection.</div>
//                         )}
//                     </div>
//                 )}

//                         {activeTab === 'settings' && (
//                             <div className="max-w-md space-y-6">
//                                 <div className="space-y-1">
//                                     <label className="text-[10px] uppercase tracking-widest text-neutral-500">Full Name</label>
//                                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10">{user.name}</div>
//                                 </div>
//                                 <div className="space-y-1">
//                                     <label className="text-[10px] uppercase tracking-widest text-neutral-500">Email Address</label>
//                                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10">{user.email}</div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* --- STYLISH DELETE MODAL --- */}
//                         {showDeleteConfirm && (
//                             <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
//                                 <div className="bg-[#121212] border border-white/10 w-full max-auto max-w-sm rounded-4xl p-8 shadow-2xl text-center transform animate-in zoom-in-95 duration-300">
//                                     <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
//                                         <Trash2 size={32} />
//                                     </div>
//                                     <h2 className="text-xl font-serif italic text-white mb-2">Are you certain?</h2>
//                                     <p className="text-neutral-500 text-sm mb-8 leading-relaxed">
//                                         This action is permanent. All your order history and collection data will be vanished forever.
//                                     </p>
                                    
//                                     <div className="flex flex-col gap-3">
//                                         <button 
//                                             disabled={isDeleting}
//                                             onClick={async () => {
//                                                 setIsDeleting(true);
//                                                 // REPLACE THIS WITH YOUR ACTUAL DELETE API CALL
//                                                 setTimeout(() => {
//                                                     alert("Account deleted successfully.");
//                                                     handleLogout();
//                                                 }, 2000);
//                                             }}
//                                             className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2"
//                                         >
//                                             {isDeleting ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete Everything"}
//                                         </button>
                                        
//                                         <button 
//                                             onClick={() => setShowDeleteConfirm(false)}
//                                             className="w-full py-4 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all"
//                                         >
//                                             Nevermind, go back
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}



//                         {activeTab === 'wishlist' && (
//                             <div className="flex flex-col items-center justify-center h-64 text-center">
//                                 <Heart className="w-12 h-12 text-neutral-800 mb-2" />
//                                 <p className="text-neutral-500 tracking-widest text-xs uppercase">Your collection is empty.</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }







import { useEffect, useState, useRef } from "react";
import { getProfile, uploadProfilePic, updateProfile } from "../api/api"; // Added updateProfile
import { useNavigate } from "react-router-dom";
import { LogOut, Home, ShoppingCart, Heart, Settings, Trash2, Camera, Loader2, Package, Clock, CheckCircle, ShoppingBag, Edit3, Save, X } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion"; // Added Framer Motion hooks
import axios from "axios";
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('orders');
    const [profileLoading, setProfileLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Settings States
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [updatingInfo, setUpdatingInfo] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Background Scroll Animation
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUserAndOrders = async () => {
            try {
                const profileRes = await getProfile(token);
                setUser(profileRes.data);
                setEditName(profileRes.data.name);

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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !token) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image too large (Max 2MB)");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const res = await uploadProfilePic(formData, token);
            setUser(prev => prev ? { ...prev, profilePic: res.data.profilePic } : null);
            toast.success("Profile picture updated");
        } catch (err) {
            setPreviewUrl(null);
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleUpdateName = async () => {
        if (!token || !editName.trim()) return;
        setUpdatingInfo(true);
        try {
            await updateProfile({ name: editName }, token);
            setUser(prev => prev ? { ...prev, name: editName } : null);
            setIsEditing(false);
            toast.success("Identity updated");
        } catch (err) {
            toast.error("Failed to update name");
        } finally {
            setUpdatingInfo(false);
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
        <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 pt-24 relative overflow-hidden">
            
            {/* --- BACKGROUND ANIMATION --- */}
            <motion.div style={{ scale }} className="fixed inset-0 opacity-40 z-0 pointer-events-none">
                <img 
                    src="https://i.pinimg.com/736x/4a/6b/d8/4a6bd842233e20494d2761f2efa70018.jpg" 
                    className="w-full h-full object-cover" 
                    alt="Hero background"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/80 to-[#050505]" />
            </motion.div>

            {/* --- BACKGROUND FLOATING BAGS --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ 
                            y: [0, 1000], 
                            x: [0, 100, -100, 0],
                            rotate: [0, 360],
                            opacity: [0, 0.2, 0]
                        }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                        className="absolute text-fuchsia-900"
                        style={{ left: `${i * 15}%`, top: '-5%' }}
                    >
                        <ShoppingBag size={20 + i * 10} strokeWidth={1} />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white/5 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/10 relative z-10 shadow-2xl">
                
                {/* --- Left Sidebar --- */}
                <div className="w-full md:w-80 bg-white/5 border-r border-white/10 p-8 backdrop-blur-md">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative group">
                            <div className="relative">
                                {previewUrl || user.profilePic ? (
                                    <img
                                        src={previewUrl || `http://localhost:5000/uploads/${user.profilePic}`}
                                        alt="Profile"
                                        className={`w-32 h-32 rounded-full object-cover ring-2 ring-yellow-500/50 shadow-2xl transition-all duration-500 ${uploading ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black text-4xl font-serif italic shadow-xl">
                                        {user.name[0]}
                                    </div>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50 border-2 border-black"
                                disabled={uploading}
                            >
                                <Camera className="w-4 h-4 text-black" />
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
                        </div>
                        <h3 className="text-2xl font-serif italic mt-4">{user.name}</h3>
                        <p className="text-[10px] text-neutral-500 tracking-[0.3em] uppercase mt-1">{user.email}</p>
                    </div>

                    <nav className="space-y-2">
                        <NavItem icon={<Home />} label="Marketplace" active={false} onClick={() => navigate("/")} />
                        <NavItem icon={<ShoppingCart />} label="My Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                        <NavItem icon={<Heart />} label="Wishlist" active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} />
                        <NavItem icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                        
                        <div className="pt-4 mt-4 border-t border-white/10">
                            <button onClick={handleLogout} className="w-full flex items-center p-3 text-neutral-400 hover:bg-white/5 rounded-2xl transition-all"><LogOut className="w-5 h-5 mr-3" /> Sign Out</button>
                            <button onClick={() => setShowDeleteConfirm(true)} className="w-full flex items-center p-3 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all mt-2 font-medium"><Trash2 className="w-5 h-5 mr-3" /> Delete Account</button>
                        </div>
                    </nav>
                </div>

                {/* --- Right Content Area --- */}
                <div className="flex-1 p-8 lg:p-12 bg-black/20">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-4xl font-serif italic mb-10 capitalize tracking-tight">{activeTab}</h1>
                        
                        <div className="min-h-[400px]">
                            {activeTab === 'orders' && (
                                <div className="space-y-4">
                                    {orders.length > 0 ? orders.map((order: any) => (
                                        <OrderCard key={order._id} order={order} />
                                    )) : (
                                        <EmptyState icon={<Package />} message="Discovery awaits in the collection." />
                                    )}
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="max-w-xl space-y-8">
                                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1">Identity</label>
                                            <div className="relative group">
                                                {isEditing ? (
                                                    <div className="flex flex-col sm:flex-row gap-3">
                                                        <input 
                                                            type="text"
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className="flex-1 bg-white/5 border border-yellow-500/30 rounded-2xl p-4 text-white outline-none focus:border-yellow-500 transition-all"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={handleUpdateName}
                                                                disabled={updatingInfo}
                                                                className="p-4 bg-yellow-500 text-black rounded-2xl font-bold hover:bg-yellow-400 transition-all disabled:opacity-50"
                                                            >
                                                                {updatingInfo ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={20} />}
                                                            </button>
                                                            <button 
                                                                onClick={() => {setIsEditing(false); setEditName(user.name);}}
                                                                className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"
                                                            >
                                                                <X size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group-hover:border-white/20 transition-all">
                                                        <span className="text-lg">{user.name}</span>
                                                        <button onClick={() => setIsEditing(true)} className="p-2 text-neutral-500 hover:text-yellow-500 transition-colors">
                                                            <Edit3 size={18} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1">Account Access</label>
                                            <div className="p-4 bg-neutral-900/50 rounded-2xl border border-white/5 text-neutral-500 cursor-not-allowed flex justify-between items-center">
                                                <span>{user.email}</span>
                                                <Clock size={14} className="opacity-50" />
                                            </div>
                                            <p className="text-[9px] text-neutral-600 mt-2 px-1 italic">Email address is locked for security.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-4xl flex items-center justify-between">
                                        <div>
                                            <h4 className="text-red-500 font-serif text-lg italic">Danger Zone</h4>
                                            <p className="text-neutral-500 text-[10px] uppercase tracking-widest">Permanently vanish your data</p>
                                        </div>
                                        <button onClick={() => setShowDeleteConfirm(true)} className="px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'wishlist' && (
                                <EmptyState icon={<Heart />} message="Your collection is empty." />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- DELETE MODAL --- */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#121212] border border-white/10 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center"
                    >
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                            <Trash2 size={40} />
                        </div>
                        <h2 className="text-2xl font-serif italic text-white mb-3">Are you certain?</h2>
                        <p className="text-neutral-500 text-sm mb-10 leading-relaxed">
                            This action is permanent. All your order history and collection data will be vanished forever.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <button 
                                disabled={isDeleting}
                                onClick={async () => {
                                    setIsDeleting(true);
                                    setTimeout(() => {
                                        toast.success("Account vanished.");
                                        handleLogout();
                                    }, 2000);
                                }}
                                className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                            >
                                {isDeleting ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete Everything"}
                            </button>
                            <button 
                                onClick={() => setShowDeleteConfirm(false)}
                                className="w-full py-5 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all"
                            >
                                Nevermind
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const NavItem = ({ icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`w-full flex items-center p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-yellow-500 text-black font-bold shadow-lg scale-105' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
        <span className="mr-4">{icon}</span>
        <span className="text-sm tracking-wide">{label}</span>
    </button>
);

const OrderCard = ({ order }: any) => (
    <div className="flex justify-between items-center p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-white/20 transition-all group">
        <div className="flex items-center gap-5">
            <div className="p-4 bg-yellow-500/10 rounded-2xl text-yellow-500 group-hover:scale-110 transition-transform">
                <Package size={24} />
            </div>
            <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Ref: {order._id.slice(-8)}</p>
                <p className="text-lg font-bold text-white mt-1 italic">₦{order.totalAmount.toLocaleString()}</p>
                <div className="flex gap-3 mt-2">
                    <span className={`text-[8px] font-bold uppercase tracking-widest ${order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-neutral-500'}`}>
                        {order.paymentStatus === 'Paid' ? '● Paid' : '○ Pending'}
                    </span>
                </div>
            </div>
        </div>
        <div className="text-right flex flex-col items-end gap-3">
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.orderStatus === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                {order.orderStatus === 'Delivered' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                {order.orderStatus}
            </span>
            <p className="text-[10px] text-neutral-600 font-medium">
                {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
        </div>
    </div>
);

const EmptyState = ({ icon, message }: any) => (
    <div className="flex flex-col items-center justify-center h-80 text-center opacity-40">
        <div className="mb-4 text-neutral-700">{icon && <span className="[&>svg]:w-16 [&>svg]:h-16">{icon}</span>}</div>
        <p className="text-neutral-500 tracking-[0.3em] text-[10px] uppercase font-bold">{message}</p>
    </div>
);