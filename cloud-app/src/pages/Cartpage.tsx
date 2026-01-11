import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ConfirmModal } from "../component/ConfirmModal";
import { toast } from 'sonner';
import { ShoppingBag } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft,
   
} from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const { cart, addToCart, cartCount, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Function to handle the actual clearing and closing the modal
const handleConfirmClear = () => {
  clearCart();
  setIsModalOpen(false);
  // Send the stylish toast notification
  toast.success("Bag Cleared", {
    description: "Your selection has been removed from the archive.",
  });
};
  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <h1 className="text-5xl font-serif italic mb-4">Your bag is empty.</h1>

          <p className="text-neutral-500 mb-8 tracking-widest uppercase text-xs">Discovery awaits in our collection</p>
          <Link to="/wardrobe" className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-tighter hover:scale-105 transition-transform">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">

       {/* Background Leaves */}
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

      <div className="max-w-5xl mx-auto">

        {/* HEADER WITH CLEAR BAG BUTTON */}
        <div className="flex justify-between items-end mb-12">
          <h1 className="text-4xl font-serif italic">Shopping Bag ({cartCount})</h1>
          <button 
            onClick={() => setIsModalOpen(true)} // Open the stylish modal instead of alert
            className="flex items-center gap-2 text-neutral-500 hover:text-red-500 transition-colors text-[10px] uppercase tracking-widest font-black border border-white/10 px-4 py-2 rounded-full"
          >
            <Trash2 size={14} />
            Clear Bag
          </button>
      </div>

        {/* ... Cart Items Map ... */}

        {/* THE MODAL */}
        <ConfirmModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmClear}
          title="Empty Bag?"
          message="Are you sure you want to remove all items from your luxury selection?"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item._id} 
                  className="flex gap-6 bg-white/5 border border-white/10 p-4 rounded-4xl md:rounded-4xl items-center"
                >
                <img 
                  src={`http://localhost:5000${item.imageUrl}`} 
                  alt={item.name} 
                  className="w-24 h-32 object-cover rounded-2xl bg-neutral-900" 
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-yellow-500 font-bold mt-1">₦{item.price.toLocaleString()}</p>
                </div>

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center gap-4 bg-black/50 rounded-full p-1 border border-white/10">
                  <button 
                    onClick={() => {
                    if (item.qty > 1) {
                        // Only subtract if current qty is more than 1
                        addToCart(item, -1); 
                    } else {
                        // Optional: If it's 1 and they click minus, you could ask to remove it
                        // removeFromCart(item._id); 
                    }
                    }}
                    className="w-8 h-8 flex items-center justify-center hover:text-red-500 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  
                  <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                  
                  {/* FIXED: Using Plus and addToCart here */}
                  <button 
                    onClick={() => addToCart(item, 1)}
                    className="w-8 h-8 flex items-center justify-center hover:text-green-500 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SUMMARY SECTION */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sticky top-32">
              <h2 className="text-xl font-medium mb-6">Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-neutral-400 text-sm">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-500 uppercase text-[10px] font-bold">Complimentary</span>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-yellow-500">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full bg-yellow-500 text-black flex items-center justify-center gap-2 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all group"
              >
                Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5">
            <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Main Atelier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

