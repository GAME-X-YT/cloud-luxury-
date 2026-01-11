// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Loader2, Leaf, ThermometerSnowflake, Wind } from "lucide-react";

// interface FallItem {
//   _id: string;
//   name: string;
//   imageUrl: string;
//   price: number;
//   description?: string;
// }

// const FallCard = ({ item }: { item: FallItem }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     className="group relative"
//   >
//     {/* Card Container */}
//     <div className="relative aspect-4/5 overflow-hidden rounded-4xl bg-[#1a1512] border border-white/5 shadow-2xl">
//       {/* Texture Overlay (Gives a grainy, wool-like feel) */}
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')] z-10" />
      
//       <img 
//         src={`http://localhost:5000${item.imageUrl}`} 
//         className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000" 
//         alt={item.name} 
//       />

//       {/* Seasonal Badge */}
//       <div className="absolute top-5 left-5 z-20 bg-[#c2410c]/80 backdrop-blur-md px-3 py-1 rounded-full border border-orange-400/20">
//         <span className="text-[9px] font-black uppercase tracking-tighter text-white flex items-center gap-1">
//           <Leaf size={10} /> Autumn Ready
//         </span>
//       </div>

//       {/* Bottom Info Glassmorphism */}
//       <div className="absolute inset-x-4 bottom-4 z-20 bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
//         <div className="flex justify-between items-end">
//           <div>
//             <h3 className="text-lg font-serif italic text-white leading-none">{item.name}</h3>
//             <p className="text-orange-200/60 text-[10px] uppercase tracking-widest mt-2 font-medium">Insulated Comfort</p>
//           </div>
//           <p className="text-white font-bold text-sm italic">₦{Number(item.price).toLocaleString()}</p>
//         </div>
        
//         <motion.button 
//           whileTap={{ scale: 0.95 }}
//           className="mt-4 w-full bg-white text-black py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-colors"
//         >
//           Add to Wardrobe
//         </motion.button>
//       </div>
//     </div>
//   </motion.div>
// );

// const FallPage = () => {
//   const [items, setItems] = useState<FallItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFall = async () => {
//       try {
//         // Fetches from the "fall" category in your dashboard
//         const response = await axios.get("http://localhost:5000/api/products/category/fall-clothes");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching Fall collection:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFall();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0d0a09] text-white selection:bg-orange-500/30 overflow-hidden">
//       {/* Decorative Falling Particles (Visual only) */}
//       <div className="fixed inset-0 pointer-events-none opacity-20">
//         {[...Array(6)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{ 
//               y: [0, 800], 
//               x: [0, 50, -50, 0],
//               rotate: [0, 360] 
//             }}
//             transition={{ 
//               duration: 15 + i * 2, 
//               repeat: Infinity, 
//               ease: "linear" 
//             }}
//             className="absolute text-orange-700/30"
//             style={{ left: `${i * 20}%`, top: '-10%' }}
//           >
//             <Leaf size={24 + i * 5} />
//           </motion.div>
//         ))}
//       </div>

//       <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
//         {/* Editorial Header */}
//         <header className="text-center mb-28">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <span className="text-[#c2410c] text-[10px] font-bold tracking-[1em] uppercase block mb-6">
//               Seasonal Transition
//             </span>
//             <h1 className="text-7xl md:text-9xl font-serif italic text-white leading-none">
//               Golden <br /> <span className="text-neutral-700">Layers.</span>
//             </h1>
            
//             <div className="flex justify-center gap-12 mt-12 text-neutral-500 italic font-serif">
//               <div className="flex flex-col items-center gap-2">
//                 <Wind size={20} strokeWidth={1} className="text-orange-800" />
//                 <span className="text-xs">Windproof</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <ThermometerSnowflake size={20} strokeWidth={1} className="text-orange-800" />
//                 <span className="text-xs">Thermal Lite</span>
//               </div>
//             </div>
//           </motion.div>
//         </header>

//         {loading ? (
//           <div className="h-96 flex flex-col items-center justify-center">
//             <Loader2 className="animate-spin text-orange-600" size={40} />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
//             <AnimatePresence>
//               {items.map((item) => (
//                 <FallCard key={item._id} item={item} />
//               ))}
//             </AnimatePresence>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && items.length === 0 && (
//           <div className="text-center py-40 border border-white/5 rounded-[4rem] bg-[#14100e]">
//             <p className="text-neutral-700 font-serif italic text-3xl">The leaves are falling, but our stock hasn't arrived.</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default FallPage;



import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Fixed: Added AnimatePresence back
import { Loader2, Leaf, ThermometerSnowflake, Wind, ShoppingBag, Sparkles, Check, HomeIcon } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

interface FallItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
}

// FIXED: Added 'onAdd' to the props interface here
const FallCard = ({ item, onAdd }: { item: FallItem; onAdd: () => void }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] bg-[#1a1512] border border-white/5 shadow-2xl transition-all duration-700 group-hover:border-b-blue-900/25 group-hover:shadow-orange-900/20">
        
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')] z-10" />
        
        <img 
          src={`http://localhost:5000${item.imageUrl}`} 
          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
          alt={item.name} 
        />

        <div className="absolute top-6 left-6 z-20 overflow-hidden rounded-full">
          <motion.div 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="bg-orange-600/90 backdrop-blur-md px-4 py-1.5 border border-white/10 flex items-center gap-2"
          >
            <Leaf size={10} className="text-orange-200 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white">Autumn Ready</span>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-[#0d0a09] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        <div className="absolute inset-x-4 bottom-4 z-20 bg-black/60 backdrop-blur-2xl border border-white/10 p-6 rounded-4xl translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-serif italic text-white tracking-tight">{item.name}</h3>
              <p className="text-orange-400/60 text-[9px] uppercase tracking-[0.3em] mt-1 font-bold">Limited Edition</p>
            </div>
            <div className="text-right">
              <p className="text-white font-medium text-lg tracking-tighter">₦{Number(item.price).toLocaleString()}</p>
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAdd} // Fixed: Using the passed onAdd function
            className="w-full bg-white text-black py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-xl"
          >
            <ShoppingBag size={14} />
            Add to Wardrobe
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const FallPage = () => {
  const [items, setItems] = useState<FallItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");

  const { addToCart } = useCart();

  const handleAddToCart = (item: FallItem) => {
    addToCart(item, 1);
    setAddedItemName(item.name);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchFall = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/category/fall-clothes");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching Fall collection:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFall();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0a09] text-white selection:bg-orange-500/30 overflow-hidden">

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
            className="absolute text-orange-900"
            style={{ left: `${i * 15}%`, top: '-5%' }}
          >
            <ShoppingBag size={20 + i * 10} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <header className="mb-32 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <Sparkles size={16} className="text-orange-500 animate-pulse" />
              <span className="text-orange-500/80 text-[10px] font-bold tracking-[1em] uppercase">Collection 2025/2026</span>
            </div>
            <h1 className="text-8xl md:text-[12rem] font-serif italic text-white leading-[0.8] tracking-tighter">
              Golden <br /> <span className="text-neutral-800">Layers.</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="hidden lg:flex gap-8 text-neutral-500 border-l border-white/10 pl-8">
            <div className="flex flex-col gap-4">
              <Wind size={24} strokeWidth={1} className="text-orange-800" />
              <p className="text-[10px] uppercase tracking-widest max-w-[100px]">Architectural Windbreaking</p>
            </div>

            <div className="flex flex-col gap-4">
              <ThermometerSnowflake size={24} strokeWidth={1} className="text-orange-800" />
              <p className="text-[10px] uppercase tracking-widest max-w-[100px]">Luxury Thermal Lining</p>
            </div>

            <div className="flex flex-col gap-4">
              <HomeIcon size={24} strokeWidth={1} className="text-orange-800" />
               <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
              Main Atelier
            </Link>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Loader2 className="text-orange-600" size={40} />
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
            {items.map((item) => (
              <FallCard 
                key={item._id} 
                item={item} 
                onAdd={() => handleAddToCart(item)} 
              />
            ))}
          </div>
        )}
      </main>

      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-md"
          >
            <div className="bg-white text-black p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-white/20 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="bg-orange-600 p-2 rounded-full text-white">
                  <Check size={16} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-neutral-400 leading-none mb-1">Added to cast</p>
                  <p className="font-serif italic text-sm">{addedItemName}</p>
                </div>
              </div>
              <button onClick={() => setShowToast(false)} className="text-[10px] uppercase tracking-widest font-bold pr-2 hover:text-orange-600 transition-colors">
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-64 bg-linear-to-t from-amber-950/20 to-transparent mt-20" />
    </div>
  );
};

export default FallPage;