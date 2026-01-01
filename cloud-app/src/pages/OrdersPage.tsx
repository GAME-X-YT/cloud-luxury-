// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "../context/CartContext";
// import { Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
// import { useState, useEffect } from "react";
// import axios from "axios";


// interface Order {
//   _id: string;
//   status: string;
//   totalAmount: number;
//   items: any[];
//   shippingAddress: string;
// }

// const CartPage = () => {
//   const { cart, removeFromCart, clearCart } = useCart();
//   const [address, setAddress] = useState("");
//   const [orders, setOrders] = useState<Order[]>([]); 
//   const [isOrdering, setIsOrdering] = useState(false);

//   useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       // Get the user ID from your auth/localstorage
//       const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
//       if (savedUser._id || savedUser.email) {
//         const res = await axios.get(`http://localhost:5000/api/orders/user/${savedUser._id || savedUser.email}`);
//         setOrders(res.data);
//       }
//     } catch (err) {
//       console.error("Error fetching orders", err);
//     }
//   };
//   fetchOrders();
// }, []);

//   // FIX: Get user from localStorage (or pass it via props/context)
//   const savedUser = localStorage.getItem("user");
//   const user = savedUser ? JSON.parse(savedUser) : null;

//   const total = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

//   const handlePlaceOrder = async () => {
//     if (!address) return alert("Please enter your delivery address");
//     if (cart.length === 0) return alert("Your cart is empty");

//     setIsOrdering(true); // Now being used
//     try {
//       const orderData = {
//         items: cart,
//         totalAmount: total,
//         shippingAddress: address,
//         userId: user?._id || user?.email || "Guest", // Uses the user variable found above
//       };

//       await axios.post("http://localhost:5000/api/orders", orderData);
      
//       alert("Order Placed Successfully!");
//       clearCart();
//     } catch (error) {
//       console.error("Order failed:", error);
//       alert("Something went wrong.");
//     } finally {
//       setIsOrdering(false); // Now being used
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white p-8 md:p-20">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

//         {orders.map(order => (
//   <div key={order._id} className="border border-white/10 p-4 rounded-xl mb-4">
//     <p>Order ID: {order._id}</p>
//     <p>Status: <span className="text-yellow-500">{order.status}</span></p>
//     <p>Total: ₦{order.totalAmount.toLocaleString()}</p>
//   </div>
// ))}
        
//         {/* Left Side: Item List */}
//         <div className="lg:col-span-2">
//           <h1 className="text-4xl font-serif italic mb-10 flex items-center gap-4">
//             <ShoppingBag className="text-yellow-500" /> Your Shopping Bag
//           </h1>

//           {cart.length === 0 ? (
//             <div className="text-neutral-500 py-20 text-center border border-dashed border-white/10 rounded-3xl">
//               Your bag is empty. Start adding some masterpieces!
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <AnimatePresence>
//                 {cart.map((item: any) => (
//                   <motion.div 
//                     key={item._id}
//                     exit={{ opacity: 0, x: -20 }}
//                     className="flex items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/10"
//                   >
//                     <img src={`http://localhost:5000${item.imageUrl}`} className="w-24 h-24 object-cover rounded-xl" />
//                     <div className="flex-1">
//                       <h3 className="text-xl font-medium">{item.name}</h3>
//                       <p className="text-yellow-500 font-bold">₦{item.price.toLocaleString()} x {item.quantity}</p>
//                     </div>
//                     <button onClick={() => removeFromCart(item._id)} className="text-neutral-500 hover:text-red-500 transition-colors">
//                       <Trash2 size={20} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           )}
//         </div>

//         {/* Right Side: Summary & Checkout */}
//         <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 h-fit sticky top-20">
//           <h2 className="text-2xl font-serif mb-6">Order Summary</h2>
          
//           <div className="space-y-4 mb-8">
//             <div className="flex justify-between text-neutral-400">
//               <span>Subtotal</span>
//               <span>₦{total.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-neutral-400">
//               <span>Delivery</span>
//               <span className="text-green-500">Calculated at next step</span>
//             </div>
//             <hr className="border-white/10" />
//             <div className="flex justify-between text-xl font-bold">
//               <span>Total</span>
//               <span className="text-yellow-500">₦{total.toLocaleString()}</span>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Delivery Address</label>
//             <textarea 
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Enter your full address..."
//               className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-yellow-500 transition-colors h-24"
//             />
            
//             <button 
//               onClick={handlePlaceOrder}
//               disabled={isOrdering || cart.length === 0}
//               className="w-full bg-yellow-500 text-black font-black py-4 rounded-full flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all disabled:opacity-50"
//             >
//               {isOrdering ? "PROCESSING..." : "PLACE ORDER"} <ArrowRight size={20} />
//             </button>
//           </div>

//           <div className="mt-6 flex items-center gap-3 text-xs text-neutral-500">
//             <Truck size={16} /> 
//             <span>Orders usually arrive in 3-5 business days.</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;




import { useEffect, useState } from "react";
import axios from "axios";
import { Package, Clock, CheckCircle } from "lucide-react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Fetch orders failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <h1 className="text-3xl font-serif mb-10">My Purchase History</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order: any) => (
          <div key={order._id} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-yellow-500/10 p-4 rounded-2xl text-yellow-500">
                <Package size={24} />
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-tighter">Order ID: {order._id.slice(-6)}</p>
                <h3 className="text-lg font-medium">₦{order.totalAmount.toLocaleString()}</h3>
                <p className="text-sm text-neutral-400">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className={`flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'
              }`}>
                {/* Use the icons here based on status */}
                {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                {order.status}
              </span>
              <p className="text-[10px] text-neutral-600 italic">Expected: 3-5 Business Days</p>
            </div>
          </div>
        ))}

        {orders.length === 0 && !loading && (
          <div className="text-center py-20 opacity-50">
            <p>You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;