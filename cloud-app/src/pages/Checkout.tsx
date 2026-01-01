// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ChevronLeft, Truck, ShieldCheck } from "lucide-react";
// import axios from "axios";

// const CheckoutPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const product = location.state?.product; // Getting product from the "Quick Order" button

//   const [formData, setFormData] = useState({
//     phone: "",
//     address: "",
//     city: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const orderData = {
//         items: [{ product: product._id, quantity: 1 }],
//         totalAmount: product.price,
//         shippingAddress: `${formData.address}, ${formData.city}`,
//         phone: formData.phone,
//       };

//       // Sending to your backend
//       await axios.post("http://localhost:5000/api/orders", orderData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });

//       alert("Order Placed Successfully!");
//       navigate("/my-orders");
//     } catch (error) {
//       console.error("Checkout failed", error);
//     }
//   };

//   if (!product) return <div className="text-white p-20 text-center">No product selected for checkout.</div>;

//   return (
//     <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
//       <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-neutral-500 hover:text-white mb-10 transition-colors">
//         <ChevronLeft size={20} /> Back to Collection
//       </button>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
//         {/* Left Side: Form */}
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//           <h1 className="text-4xl font-serif italic mb-8">Secure Checkout</h1>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 block">Delivery Phone</label>
//               <input 
//                 required
//                 type="text" 
//                 placeholder="+234..."
//                 className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-yellow-500 outline-none transition-all"
//                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
//               />
//             </div>
//             <div>
//               <label className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 block">Shipping Address</label>
//               <textarea 
//                 required
//                 rows={3}
//                 placeholder="Street address, Apartment, Suite..."
//                 className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-yellow-500 outline-none transition-all"
//                 onChange={(e) => setFormData({...formData, address: e.target.value})}
//               />
//             </div>
//             <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors uppercase tracking-widest text-sm">
//               Confirm Order (₦{product.price.toLocaleString()})
//             </button>
//           </form>

//           <div className="mt-8 flex gap-6 text-neutral-500">
//             <div className="flex items-center gap-2 text-xs"><ShieldCheck size={16}/> Secure Payment</div>
//             <div className="flex items-center gap-2 text-xs"><Truck size={16}/> Fast Delivery</div>
//           </div>
//         </motion.div>

//         {/* Right Side: Order Summary */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//           className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 h-fit"
//         >
//           <h2 className="text-xl mb-6 font-medium">Order Summary</h2>
//           <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
//             <img src={`http://localhost:5000${product.imageUrl}`} className="w-24 h-32 object-cover rounded-2xl" alt="" />
//             <div>
//               <h3 className="text-lg font-medium">{product.name}</h3>
//               <p className="text-neutral-500 text-sm">Size: One Size / Adjustable</p>
//               <p className="text-yellow-500 mt-2 font-bold">₦{product.price.toLocaleString()}</p>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <div className="flex justify-between text-neutral-400"><span>Subtotal</span><span>₦{product.price.toLocaleString()}</span></div>
//             <div className="flex justify-between text-neutral-400"><span>Shipping</span><span className="text-green-500">Free</span></div>
//             <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10 text-white">
//               <span>Total</span><span>₦{product.price.toLocaleString()}</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ShieldCheck, Landmark, Copy, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartCount, clearCart } = useCart();
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
  });

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // ADMIN BANK DETAILS
  const bankDetails = {
    accountName: "Cloud Luxury Boutique",
    accountNumber: "1234567890",
    bankName: "Zenith Bank",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please sign in to complete your order.");

    // Construct the data exactly as the backend expects
    const orderData = {
      items: cart.map(item => ({
        product: item._id,
        quantity: item.qty,
        price: item.price // ADDED THIS: Required by your schema
      })),
      totalAmount: totalAmount,
      // ADDED THIS: Schema requires bankProofRef. 
      // Since it's bank transfer, you can prompt the user for it or use a placeholder.
      bankProofRef: "BANK_TRANSFER_PENDING", 
      shippingAddress: `${formData.address}, ${formData.city}`,
      phone: formData.phone,
      orderStatus: "Processing", 
    };

    const response = await axios.post("http://localhost:5000/api/orders", orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status === 201 || response.status === 200) {
        alert("Order Placed! Please ensure you have made the transfer.");
        clearCart();
        navigate("/profile"); 
    }
  } catch (error: any) {
    console.error("Checkout failed", error.response?.data || error.message);
    
    // This alert will now tell you the ACTUAL server error
    const serverMessage = error.response?.data?.message || "Something went wrong.";
    alert(`Checkout Error: ${serverMessage}`);
  }
};

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-serif italic">Your bag is empty</h2>
        <button onClick={() => navigate("/")} className="text-yellow-500 underline uppercase text-xs tracking-widest">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 pt-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-neutral-500 hover:text-white mb-10 transition-colors">
        <ChevronLeft size={20} /> Back to Bag
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Shipping & Payment Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-serif italic mb-8 flex items-center gap-3">
            Checkout <ShieldCheck className="text-yellow-500" />
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Section */}
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-500 font-bold">1. Delivery Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 block">Delivery Phone</label>
                  <input required type="text" placeholder="+234..." className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-yellow-500 outline-none transition-all" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 block">Street Address</label>
                  <textarea required rows={2} placeholder="House number, Street name..." className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-yellow-500 outline-none transition-all" onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 block">City</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-yellow-500 outline-none transition-all" onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Payment Section (Bank Details) */}
            <div className="space-y-6 pt-4">
              <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-500 font-bold">2. Payment Method (Bank Transfer)</h2>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 text-neutral-400 mb-2">
                  <Landmark size={18} />
                  <span className="text-xs uppercase tracking-widest">Official Bank Details</span>
                </div>
                
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-tighter">Bank Name</p>
                  <p className="text-lg font-medium">{bankDetails.bankName}</p>
                </div>

                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-tighter">Account Name</p>
                  <p className="text-lg font-medium">{bankDetails.accountName}</p>
                </div>

                <div className="bg-black/40 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-tighter">Account Number</p>
                    <p className="text-xl font-mono text-yellow-500 tracking-widest">{bankDetails.accountNumber}</p>
                  </div>
                  <button type="button" onClick={copyToClipboard} className="p-3 hover:bg-white/10 rounded-xl transition-colors">
                    {copied ? <CheckCircle2 className="text-green-500" size={20} /> : <Copy size={20} />}
                  </button>
                </div>
                
                <p className="text-[10px] text-neutral-500 italic">Please include your name in the transfer description. Orders are processed after confirmation.</p>
              </div>
            </div>

            <button type="submit" className="w-full bg-yellow-500 text-black font-black py-5 rounded-2xl hover:bg-yellow-400 transition-all uppercase tracking-widest text-xs">
              Confirm Order & Pay ₦{totalAmount.toLocaleString()}
            </button>
          </form>
        </motion.div>

        {/* Right Side: Order Summary */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl mb-6 font-medium border-b border-white/10 pb-4 italic font-serif">Order Summary</h2>
          <div className="max-h-60 overflow-y-auto pr-2 mb-6 space-y-4 custom-scrollbar">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-4 items-center">
                <img src={`http://localhost:5000${item.imageUrl}`} className="w-16 h-20 object-cover rounded-xl bg-black" alt={item.name} />
                <div className="flex-1">
                  <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                  <p className="text-neutral-500 text-xs font-bold">₦{item.price.toLocaleString()} x {item.qty}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
            <div className="flex justify-between text-neutral-400"><span>Subtotal</span><span>₦{totalAmount.toLocaleString()}</span></div>
            <div className="flex justify-between text-neutral-400"><span>Shipping</span><span className="text-green-500 font-black uppercase text-[10px]">Complimentary</span></div>
            <div className="flex justify-between text-xl font-bold pt-4 text-white">
              <span>Total</span><span className="text-yellow-500">₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CheckoutPage;