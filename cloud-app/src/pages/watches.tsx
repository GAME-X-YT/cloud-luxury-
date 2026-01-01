// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Loader2, Clock, ShieldCheck, Zap } from "lucide-react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";

// interface WatchItem {
//   _id: string;
//   name: string;
//   imageUrl: string;
//   price: number;
//   description?: string;
//   category: string;
// }

// const WatchCard = ({ item }: { item: WatchItem }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     className="group relative bg-neutral-900/40 border border-white/5 rounded-4xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500"
//   >
//     {/* Image Container */}
//     <div className="relative aspect-4/5 overflow-hidden">
//       <img 
//         src={`http://localhost:5000${item.imageUrl}`} 
//         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
//         alt={item.name} 
//       />
//       <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-transparent opacity-60" />
      
//       {/* Price Badge */}
//       <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
//         <span className="text-yellow-500 font-bold text-sm">₦{Number(item.price).toLocaleString()}</span>
//       </div>
//     </div>

//     {/* Details */}
//     <div className="p-6 text-center">
//       <h3 className="text-xl font-serif italic text-white group-hover:text-yellow-500 transition-colors">
//         {item.name}
//       </h3>
//       <p className="text-neutral-500 text-xs mt-2 line-clamp-2 px-4 leading-relaxed">
//         {item.description || "Precision engineered luxury timepiece."}
//       </p>
      
//       <button className="mt-6 w-full bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-yellow-500 transition-colors duration-300">
//         Acquire Piece
//       </button>
//     </div>
//   </motion.div>
// );

// const WatchPage = () => {
//   const [watches, setWatches] = useState<WatchItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchWatches = async () => {
//       try {
//         // Calling your backend API for the "watches" category
//         const response = await axios.get("http://localhost:5000/api/products/category/watches");
//         setWatches(response.data);
//       } catch (error) {
//         console.error("Error fetching watches:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWatches();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#030303] text-white selection:bg-yellow-500/30">
//         {/* Back to Home Link */}
//         <Link to="/" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-xl transition-all mb-4 text-gray-400 hover:text-white">
//             <FontAwesomeIcon icon={faHome} />
//             <span className="font-semibold">Back to Home</span>
//           </Link>
          
//       <main className="max-w-7xl mx-auto px-8 py-20">
        
//         {/* Hero Header */}
//         <header className="text-center mb-24">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <span className="text-yellow-500 text-[10px] font-bold tracking-[0.8em] uppercase block mb-6">
//               Horological Excellence
//             </span>
//             <h1 className="text-6xl md:text-8xl font-serif italic text-white leading-none">
//               Timeless <span className="text-neutral-600">Precision.</span>
//             </h1>
            
//             {/* Features Row */}
//             <div className="flex flex-wrap justify-center gap-8 mt-12 text-neutral-500">
//               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
//                 <ShieldCheck size={14} className="text-yellow-600" /> Lifetime Warranty
//               </div>
//               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
//                 <Zap size={14} className="text-yellow-600" /> Swiss Movement
//               </div>
//               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
//                 <Clock size={14} className="text-yellow-600" /> Certified Authentic
//               </div>
//             </div>
//           </motion.div>
//         </header>

//         {loading ? (
//           <div className="h-96 flex flex-col items-center justify-center gap-4">
//             <Loader2 className="animate-spin text-yellow-500" size={40} />
//             <p className="text-xs text-neutral-600 uppercase tracking-widest">Loading Vault...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
//             <AnimatePresence>
//               {watches.map((watch) => (
//                 <WatchCard key={watch._id} item={watch} />
//               ))}
//             </AnimatePresence>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && watches.length === 0 && (
//           <div className="text-center py-40 border border-white/5 rounded-[3rem] bg-neutral-900/20">
//             <Clock className="mx-auto text-neutral-800 mb-6" size={48} strokeWidth={1} />
//             <p className="text-neutral-500 font-serif italic text-xl">The watch vault is currently being replenished.</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default WatchPage;







import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Clock, ShieldCheck, Zap, Check } from "lucide-react"; // Added Check
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext"; // Import your cart hook

interface WatchItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
}

// FIXED: Added onAdd prop to WatchCard
const WatchCard = ({ item, onAdd }: { item: WatchItem; onAdd: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative bg-neutral-900/40 border border-white/5 rounded-4xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500"
  >
    {/* Image Container */}
    <div className="relative aspect-4/5 overflow-hidden">
      <img 
        src={`http://localhost:5000${item.imageUrl}`} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        alt={item.name} 
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-transparent opacity-60" />
      
      {/* Price Badge */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
        <span className="text-yellow-500 font-bold text-sm">₦{Number(item.price).toLocaleString()}</span>
      </div>
    </div>

    {/* Details */}
    <div className="p-6 text-center">
      <h3 className="text-xl font-serif italic text-white group-hover:text-yellow-500 transition-colors">
        {item.name}
      </h3>
      <p className="text-neutral-500 text-xs mt-2 line-clamp-2 px-4 leading-relaxed">
        {item.description || "Precision engineered luxury timepiece."}
      </p>
      
      <button 
        onClick={onAdd} // Trigger the add to cart logic
        className="mt-6 w-full bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-yellow-500 transition-colors duration-300"
      >
        Acquire Piece
      </button>
    </div>
  </motion.div>
);

const WatchPage = () => {
  const [watches, setWatches] = useState<WatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // TOAST NOTIFICATION STATE
  const [showToast, setShowToast] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");

  const { addToCart } = useCart();

  const handleAddToCart = (item: WatchItem) => {
    addToCart(item, 1);
    setAddedItemName(item.name);
    setShowToast(true);

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/category/watches");
        setWatches(response.data);
      } catch (error) {
        console.error("Error fetching watches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatches();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-yellow-500/30">
        {/* Back to Home Link */}
        <Link to="/" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-xl transition-all mb-4 text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faHome} />
            <span className="font-semibold">Back to Home</span>
        </Link>
          
      <main className="max-w-7xl mx-auto px-8 py-20">
        
        {/* Hero Header */}
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-yellow-500 text-[10px] font-bold tracking-[0.8em] uppercase block mb-6">
              Horological Excellence
            </span>
            <h1 className="text-6xl md:text-8xl font-serif italic text-white leading-none">
              Timeless <span className="text-neutral-600">Precision.</span>
            </h1>
            
            {/* Features Row */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-neutral-500">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <ShieldCheck size={14} className="text-yellow-600" /> Lifetime Warranty
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Zap size={14} className="text-yellow-600" /> Swiss Movement
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Clock size={14} className="text-yellow-600" /> Certified Authentic
              </div>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
            <p className="text-xs text-neutral-600 uppercase tracking-widest">Loading Vault...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence>
              {watches.map((watch) => (
                <WatchCard 
                    key={watch._id} 
                    item={watch} 
                    onAdd={() => handleAddToCart(watch)} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && watches.length === 0 && (
          <div className="text-center py-40 border border-white/5 rounded-[3rem] bg-neutral-900/20">
            <Clock className="mx-auto text-neutral-800 mb-6" size={48} strokeWidth={1} />
            <p className="text-neutral-500 font-serif italic text-xl">The watch vault is currently being replenished.</p>
          </div>
        )}
      </main>

      {/* --- LUXURY TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-sm"
          >
            <div className="bg-white text-black p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 p-2 rounded-full text-black">
                  <Check size={16} strokeWidth={3} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-[0.2em] font-black text-neutral-400 leading-none mb-1">Vault Selection Added</p>
                  <p className="font-serif italic text-sm">{addedItemName}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowToast(false)}
                className="text-[10px] uppercase tracking-widest font-bold pr-2 hover:text-yellow-600 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchPage;