// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Loader2, Sun, Shirt } from "lucide-react"; // Added Search for potential future filter

// interface ShortsItem {
//   _id: string;
//   name: string;
//   imageUrl: string;
//   price: number;
//   description?: string;
//   category: string;
// }

// const ShortsCard = ({ item }: { item: ShortsItem }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, ease: "easeOut" }}
//     viewport={{ once: true }}
//     className="group relative bg-neutral-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500"
//   >
//     {/* Image Container */}
//     <div className="relative aspect-4/5 overflow-hidden">
//       <img 
//         src={`http://localhost:5000${item.imageUrl}`} 
//         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
//         alt={item.name} 
//       />
//       <div className="absolute inset-0 bg-linear-to-t from-[#030303]/70 via-transparent to-transparent opacity-80" />
      
//       {/* Quick View Button */}
//       <motion.button
//         initial={{ y: 20, opacity: 0 }}
//         group-hover={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-2 rounded-full font-bold text-xs uppercase opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 transition-all duration-300"
//       >
//         Quick View
//       </motion.button>
//     </div>

//     {/* Details */}
//     <div className="p-5 pb-6 text-center">
//       <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors tracking-tight italic">
//         {item.name}
//       </h3>
//       <p className="text-neutral-500 text-sm mt-1">
//         ₦{Number(item.price).toLocaleString()}
//       </p>
//     </div>
//   </motion.div>
// );

// const ShortsPage = () => {
//   const [shorts, setShorts] = useState<ShortsItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShorts = async () => {
//       try {
//         // Fetching from the "shorts" category
//         const response = await axios.get("http://localhost:5000/api/products/category/shorts");
//         setShorts(response.data);
//       } catch (error) {
//         console.error("Error fetching shorts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchShorts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#030303] text-white selection:bg-yellow-500/30">
//       <main className="max-w-7xl mx-auto px-8 py-20">
        
//         {/* Page Header */}
//         <header className="mb-20 text-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//           >
//             <span className="text-yellow-500 text-[10px] font-bold tracking-[0.7em] uppercase block mb-4 pacifico-regular">
//               Summer shorts Collection
//             </span>
//             <h1 className="text-7xl md:text-8xl font-black uppercase italic leading-none text-white italianno-bold">
//               The <span className="text-neutral-600">Season</span> <br /> 
//               of <span className="text-yellow-500">Luxury shorts.</span>
//             </h1>
//             <p className="text-neutral-400 max-w-2xl mx-auto mt-8 text-sm leading-relaxed lobster-regular">
//               "Experience unparalleled comfort and style with our exclusive range of luxury shorts. Perfect for warm weather and sophisticated leisure."
//             </p>
            
//             <div className="flex justify-center gap-6 mt-10">
//               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500">
//                 <Sun size={14} className="text-yellow-600" /> Lightweight Fabric
//               </div>
//               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500">
//                 <Shirt size={14} className="text-yellow-600" /> Tailored Fit
//               </div>
//             </div>
//           </motion.div>
//         </header>

//         {loading ? (
//           <div className="h-96 flex flex-col items-center justify-center space-y-4">
//             <Loader2 className="animate-spin text-yellow-500" size={32} />
//             <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-600">Gathering Styles...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
//             <AnimatePresence>
//               {shorts.map((item) => (
//                 <ShortsCard key={item._id} item={item} />
//               ))}
//             </AnimatePresence>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && shorts.length === 0 && (
//           <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[4rem] bg-neutral-900/30">
//             <p className="text-neutral-700 font-black uppercase text-4xl tracking-tighter opacity-80">
//               No Shorts In Season
//             </p>
//             <p className="text-neutral-500 mt-4 text-sm font-serif italic">Fresh arrivals coming soon.</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ShortsPage;



import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sun, Shirt, Check, ShoppingBag } from "lucide-react"; 
import { useCart } from "../context/CartContext";

interface ShortsItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
}

// FIXED: Added onAdd prop to ShortsCard
const ShortsCard = ({ item, onAdd }: { item: ShortsItem; onAdd: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className="group relative bg-neutral-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500"
  >
    {/* Image Container */}
    <div className="relative aspect-4/5 overflow-hidden">
      <img 
        src={`http://localhost:5000${item.imageUrl}`} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        alt={item.name} 
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#030303]/70 via-transparent to-transparent opacity-80" />
      
      {/* "Quick Add" Button - Triggered on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAdd}
          className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl"
        >
          <ShoppingBag size={14} /> Add to Wardrobe
        </motion.button>
      </div>
    </div>

    {/* Details */}
    <div className="p-5 pb-6 text-center">
      <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors tracking-tight italic">
        {item.name}
      </h3>
      <p className="text-neutral-500 text-sm mt-1">
        ₦{Number(item.price).toLocaleString()}
      </p>
    </div>
  </motion.div>
);

const ShortsPage = () => {
  const [shorts, setShorts] = useState<ShortsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // TOAST STATE
  const [showToast, setShowToast] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");

  const { addToCart } = useCart();

  const handleAddToCart = (item: ShortsItem) => {
    addToCart(item, 1);
    setAddedItemName(item.name);
    setShowToast(true);

    // Auto-hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/category/shorts");
        setShorts(response.data);
      } catch (error) {
        console.error("Error fetching shorts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShorts();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-yellow-500/30">
      <main className="max-w-7xl mx-auto px-8 py-20">
        
        {/* Page Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-yellow-500 text-[10px] font-bold tracking-[0.7em] uppercase block mb-4">
              Summer shorts Collection
            </span>
            <h1 className="text-7xl md:text-8xl font-black uppercase italic leading-none text-white italianno-bold">
              The <span className="text-neutral-600">Season</span> <br /> 
              of <span className="text-yellow-500">Luxury shorts.</span>
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto mt-8 text-sm leading-relaxed font-serif italic">
              "Experience unparalleled comfort and style with our exclusive range of luxury shorts. Perfect for warm weather and sophisticated leisure."
            </p>
            
            <div className="flex justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500">
                <Sun size={14} className="text-yellow-600" /> Lightweight Fabric
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500">
                <Shirt size={14} className="text-yellow-600" /> Tailored Fit
              </div>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-yellow-500" size={32} />
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-600">Gathering Styles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            <AnimatePresence mode="popLayout">
              {shorts.map((item) => (
                <ShortsCard 
                    key={item._id} 
                    item={item} 
                    onAdd={() => handleAddToCart(item)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && shorts.length === 0 && (
          <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[4rem] bg-neutral-900/30">
            <p className="text-neutral-700 font-black uppercase text-4xl tracking-tighter opacity-80">
              No Shorts In Season
            </p>
            <p className="text-neutral-500 mt-4 text-sm font-serif italic">Fresh arrivals coming soon.</p>
          </div>
        )}
      </main>

      {/* --- SUMMER TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 70, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 70, opacity: 0, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-100 w-[90%] max-w-sm"
          >
            <div className="bg-white text-black p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-3 pl-2">
                <div className="bg-yellow-500 p-2 rounded-full">
                  <Check size={14} strokeWidth={4} />
                </div>
                <div>
                  <p className="text-[8px] uppercase font-black text-neutral-400 tracking-widest leading-none mb-0.5">Style Selected</p>
                  <p className="font-bold text-xs truncate max-w-[150px]">{addedItemName}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowToast(false)}
                className="bg-black text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-600 transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShortsPage;