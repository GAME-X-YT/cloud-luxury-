// import { useState, useEffect } from 'react'; // Fixes useState/useEffect errors
// import axios from 'axios'; // Fixes axios error

// const OwnerOrders = () => {
//   const [orders, setOrders] = useState<any[]>([]);

//   const fetchAllOrders = () => {
//     axios.get("http://localhost:5000/api/orders/all")
//       .then((res: any) => setOrders(res.data)) // Fixed 'res' any type
//       .catch(err => console.log(err));
//   };

//   useEffect(() => { 
//     fetchAllOrders(); 
//   }, []);

//   const changeStatus = async (id: string, nextStatus: string) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/orders/status/${id}`, { status: nextStatus });
//       fetchAllOrders(); 
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen text-black">
//       <h1 className="text-2xl font-bold mb-6">Store Manager: Incoming Orders</h1>
//       <div className="space-y-4">
//         {orders.map((order: any) => ( // Fixed 'order' any type
//           <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="font-mono text-xs text-gray-400 uppercase">ID: {order._id.slice(-6)}</p>
//                 <p className="font-bold">Customer: {order.userId}</p>
//                 <div className="mt-2">
//                   {order.items.map((item: any) => (
//                     <p key={item.name} className="text-sm">{item.name} (x{item.quantity})</p>
//                   ))}
//                 </div>
//               </div>
//               <div className="text-right">
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                   order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
//                 }`}>
//                   {order.status}
//                 </span>
//                 <p className="text-lg font-bold mt-2">₦{order.totalAmount?.toLocaleString()}</p>
//               </div>
//             </div>
            
//             <div className="mt-4 flex gap-2 border-t pt-4">
//               <button onClick={() => changeStatus(order._id, 'Processing')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Start Processing</button>
//               <button onClick={() => changeStatus(order._id, 'Delivered')} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">Mark Delivered</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OwnerOrders; 






// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Package, Clock, CheckCircle, Truck, MessageCircle, Hash } from 'lucide-react';

// const OwnerOrders = () => {
//   const [orders, setOrders] = useState<any[]>([]);

//   const fetchAllOrders = () => {
//     axios.get("http://localhost:5000/api/orders/all")
//     .then(res => setOrders(res.data));
//   };

//   useEffect(() => { 
//     fetchAllOrders(); 
//   }, []);

//   const changeStatus = async (id: string, nextStatus: string) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/orders/status/${id}`, { status: nextStatus });
//       fetchAllOrders(); 
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   return (
//     <div className="p-4 md:p-10 bg-[#0A0A0A] min-h-screen text-white font-sans">
//       {/* Header Section */}
//       <header className="mb-12">
//         <div className="flex items-center gap-3 text-yellow-500 mb-2">
//           <div className="h-1 w-12 bg-yellow-500 rounded-full" />
//           <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Executive Control</span>
//         </div>
//         <h1 className="text-4xl font-light tracking-tight">Order <span className="text-yellow-500 italic">Command Center</span></h1>
//         <p className="text-neutral-500 text-sm mt-2">Manage global sales and fulfillment status.</p>
//       </header>

//       {/* Stats Overview (Optional extra) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl">
//           <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Active Orders</p>
//           <h2 className="text-3xl font-light">{orders.filter(o => o.status !== 'Delivered').length}</h2>
//         </div>
//         <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl">
//           <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Total Revenue</p>
//           <h2 className="text-3xl font-light text-yellow-500">
//             ₦{orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0).toLocaleString()}
//           </h2>
//         </div>
//       </div>

//       {/* Orders List */}
//       <div className="space-y-6">
//         <AnimatePresence>
//           {orders.map((order: any) => (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               key={order._id} 
//               className="group bg-neutral-900/40 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-[2.5rem] hover:border-yellow-500/30 transition-all duration-500"
//             >
//               <div className="flex flex-col lg:flex-row justify-between gap-8">
                
//                 {/* Order Identity */}
//                 <div className="flex-1">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="p-3 bg-yellow-500/10 rounded-2xl">
//                       <Hash className="text-yellow-500" size={20} />
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Order Reference</p>
//                       <h3 className="font-mono text-sm text-neutral-200">{order._id.slice(-12)}</h3>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <p className="text-xs text-neutral-400 flex items-center gap-2">
//                       <span className="w-1 h-1 bg-neutral-600 rounded-full" /> Customer: {order.userId}
//                     </p>
//                     <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
//                       <p className="text-[10px] text-neutral-500 uppercase font-bold mb-2">Manifest</p>
//                       {order.items.map((item: any, i: number) => (
//                         <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5 last:border-0">
//                           <span className="text-neutral-300">{item.name}</span>
//                           <span className="text-yellow-500/80 font-mono">x{item.quantity}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                                 {/* NEW: DELIVERY DESTINATION SECTION */}
//                 <div className="bg-yellow-500/3 rounded-2xl p-4 border border-yellow-500/10">
//                     <p className="text-[10px] text-yellow-500 uppercase font-bold mb-2 tracking-widest">Delivery Destination</p>
//                     <div className="flex items-start gap-3">
//                     <Truck size={14} className="text-neutral-500 mt-1" />
//                     <div>
//                         <p className="text-sm text-neutral-200 leading-relaxed">
//                         {order.shippingAddress || "No address provided"}
//                         </p>
//                         <p className="text-xs text-yellow-500/60 font-mono mt-2 flex items-center gap-2">
//                         <MessageCircle size={12} /> {order.phone || "No phone number"}
//                         </p>
//                     </div>
//                     </div>
//                 </div>

//                 {/* Status & Pricing */}
//                 <div className="lg:text-right flex flex-col justify-between items-start lg:items-end">
//                   <div>
//                     <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
//                       order.status === 'Pending' 
//                       ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
//                       : 'bg-green-500/10 text-green-500 border border-green-500/20'
//                     }`}>
//                       {order.status === 'Pending' ? <Clock size={12}/> : <Truck size={12}/>}
//                       {order.status}
//                     </span>
//                     <h2 className="text-3xl font-light mt-4">₦{order.totalAmount?.toLocaleString()}</h2>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="mt-8 flex flex-wrap gap-3">
//                     <button 
//                       onClick={() => changeStatus(order._id, 'Processing')} 
//                       className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-xs font-bold hover:bg-yellow-500 transition-colors"
//                     >
//                       <Package size={14} /> Process
//                     </button>
//                     <button 
//                       onClick={() => changeStatus(order._id, 'Delivered')} 
//                       className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white rounded-full text-xs font-bold hover:bg-green-600 transition-colors"
//                     >
//                       <CheckCircle size={14} /> Complete
//                     </button>
//                     <a 
//                       href={`https://wa.me/PHONE_NUMBER`} // Replace with logic to get user phone
//                       className="p-3 bg-neutral-800 text-neutral-400 rounded-full hover:text-white transition-colors border border-white/5"
//                     >
//                       <MessageCircle size={18} />
//                     </a>
//                   </div>
//                 </div>

//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default OwnerOrders;





import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, MessageCircle, Hash } from 'lucide-react';

const OwnerOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchAllOrders = () => {
    axios.get("http://localhost:5000/api/orders/all")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Fetch failed", err));
  };

  useEffect(() => { 
    fetchAllOrders(); 
  }, []);

  const changeStatus = async (id: string, nextStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/status/${id}`, { status: nextStatus });
      fetchAllOrders(); 
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Inside your Admin Orders Component
const confirmAndNotify = async (orderId: string) => {
  setProcessingId(orderId);
  try {
    const token = localStorage.getItem('token');
    
    // Call the route we just fixed
    const res = await axios.put(
      `http://localhost:5000/api/orders/confirm/${orderId}`, 
      {}, 
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.status === 200) {
     setTimeout(() => {
        fetchAllOrders();
        setProcessingId(null);
        toast.success("Success! Order confirmed and Luxury Email sent to customer.");
      }, 500);
    }
  } catch (err) {
    console.error("Failed to confirm order", err);
    toast.error("Error confirming order. Check backend console.");
    setProcessingId(null);
  }
};

  return (
    <div className="p-4 md:p-10 bg-[#0A0A0A] min-h-screen text-white font-sans">
      {/* Header Section */}
      <header className="mb-12">
        <div className="flex items-center gap-3 text-yellow-500 mb-2">
          <div className="h-1 w-12 bg-yellow-500 rounded-full" />
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Executive Control</span>
        </div>
        <h1 className="text-4xl font-light tracking-tight">Order <span className="text-yellow-500 italic">Command Center</span></h1>
        <p className="text-neutral-500 text-sm mt-2">Manage global sales and fulfillment status.</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl">
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Active Orders</p>
          <h2 className="text-3xl font-light">{orders.filter(o => o.status !== 'Delivered').length}</h2>
        </div>
        <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl">
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Total Revenue</p>
          <h2 className="text-3xl font-light text-yellow-500">
            ₦{orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0).toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        <AnimatePresence>
          {orders.map((order: any) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={order._id} 
              className="group bg-neutral-900/40 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-[2.5rem] hover:border-yellow-500/30 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* COLUMN 1: Order Identity & Delivery */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-2xl">
                      <Hash className="text-yellow-500" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Order Reference</p>
                      <h3 className="font-mono text-sm text-neutral-200">{order._id.slice(-12)}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-neutral-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" /> Customer ID: {order.user || order.userId}
                    </p>
                    
                    {/* Manifest */}
                    <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                      <p className="text-[10px] text-neutral-500 uppercase font-bold mb-2 tracking-widest">Manifest</p>
                      {order.items?.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5 last:border-0">
                          <span className="text-neutral-300">{item.name || "Luxury Item"}</span>
                          <span className="text-yellow-500/80 font-mono text-xs">QTY {item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Destination (Now correctly nested) */}
                    <div className="bg-yellow-500/5 rounded-2xl p-4 border border-yellow-500/10">
                      <p className="text-[10px] text-yellow-500 uppercase font-bold mb-2 tracking-widest">Delivery Destination</p>
                      <div className="flex items-start gap-3">
                        <Truck size={14} className="text-neutral-500 mt-1" />
                        <div>
                          <p className="text-sm text-neutral-200 leading-relaxed">
                            {order.shippingAddress || "No address specified"}
                          </p>
                          <p className="text-xs text-yellow-500/60 font-mono mt-2 flex items-center gap-2">
                            <MessageCircle size={12} /> {order.phone || "No contact info"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: Status & Pricing */}
                <div className="lg:text-right flex flex-col justify-between items-start lg:items-end">
                  <div className="w-full lg:w-auto">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.orderStatus === 'Processing' || order.status === 'Processing'
                      ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                      : 'bg-green-500/10 text-green-500 border border-green-500/20'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                      {order.orderStatus || order.status || 'Received'}
                    </span>
                    <h2 className="text-3xl font-light mt-4">₦{order.totalAmount?.toLocaleString()}</h2>
                    <p className="text-[10px] text-neutral-600 uppercase mt-1">Payment via Bank Transfer</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button 
                      onClick={() => changeStatus(order._id, 'processing')} 
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-xs font-bold hover:bg-yellow-500 transition-colors"
                    >
                      <Package size={14} /> Process
                    </button>

                    <button 
                        onClick={() => confirmAndNotify(order._id)} 
                        disabled={processingId === order._id}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-500 ${
                          processingId === order._id 
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                          : 'bg-white text-black hover:bg-yellow-500 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                        }`}
                      >
                        {processingId === order._id ? (
                          <>
                            <div className="w-3 h-3 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={14} /> Confirmed & Notify
                          </>
                        )}
                      </button>
                    
                    {/* WhatsApp link using the dynamic phone number from the order */}
                    <a 
                      href={`https://wa.me/${order.phone?.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-neutral-800 text-neutral-400 rounded-full hover:text-white transition-colors border border-white/5"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OwnerOrders;