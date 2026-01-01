// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Loader2, Scissors, Ruler, Maximize } from "lucide-react";

// interface Product {
//   _id: string;
//   name: string;
//   imageUrl: string;
//   price: number;
//   description?: string;
// }

// const JeansCard = ({ item }: { item: Product }) => (
//   <motion.div 
//     initial={{ opacity: 0, scale: 0.9 }}
//     whileInView={{ opacity: 1, scale: 1 }}
//     viewport={{ once: true }}
//     className="group relative"
//   >
//     <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-[#111] border border-white/5">
//       {/* High-Contrast Image */}
//       <img 
//         src={`http://localhost:5000${item.imageUrl}`} 
//         className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0" 
//         alt={item.name} 
//       />

//       {/* Industrial Tag */}
//       <div className="absolute top-0 right-0 bg-yellow-500 text-black px-4 py-1 font-black text-[10px] uppercase tracking-tighter transform rotate-90 translate-x-3 translate-y-8">
//         Loose Fit
//       </div>

//       {/* Price Overlay */}
//       <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black via-black/40 to-transparent">
//         <h3 className="text-xl font-black uppercase italic text-white tracking-tighter">
//           {item.name}
//         </h3>
//         <p className="text-yellow-500 font-mono text-sm mt-1">
//           ₦{Number(item.price).toLocaleString()}
//         </p>
        
//         <motion.button 
//           whileHover={{ x: 5 }}
//           className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white border-b border-yellow-500 pb-1"
//         >
//           Add to Cart <Maximize size={12} />
//         </motion.button>
//       </div>
//     </div>
//   </motion.div>
// );

// const BaggyJeansPage = () => {
//   const [jeans, setJeans] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJeans = async () => {
//       try {
//         // Matches the "baggy jeans" category from your owner panel
//         const response = await axios.get("http://localhost:5000/api/products/category/baggy-jeans");
//         setJeans(response.data);
//       } catch (error) {
//         console.error("Error fetching jeans:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJeans();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#080808] text-white selection:bg-yellow-500/30">
//       <main className="max-w-7xl mx-auto px-6 py-24">
        
//         {/* Brutalist Header */}
//         <header className="mb-24 border-l-4 border-yellow-500 pl-8">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.8] italianno-regular">
//               Wide <br /> <span className="text-neutral-800">Vision.</span>
//             </h1>
            
//             <div className="flex flex-wrap gap-8 mt-10 text-neutral-500">
//               <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
//                 <Scissors size={14} /> Raw Denim
//               </div>
//               <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
//                 <Ruler size={14} /> Anti-Fit Cut
//               </div>
//             </div>
//           </motion.div>
//         </header>

//         {loading ? (
//           <div className="h-96 flex items-center justify-center">
//             <Loader2 className="animate-spin text-yellow-500" size={40} />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-y-20">
//             <AnimatePresence>
//               {jeans.map((item) => (
//                 <JeansCard key={item._id} item={item} />
//               ))}
//             </AnimatePresence>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && jeans.length === 0 && (
//           <div className="py-40 text-center opacity-20">
//             <h2 className="text-5xl font-black italic">OUT OF STOCK</h2>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default BaggyJeansPage;



import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Scissors, Ruler, Maximize, Check, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
}

const JeansCard = ({ item, onAdd }: { item: Product; onAdd: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-[#111] border border-white/5 shadow-2xl">
      {/* High-Contrast Image */}
      <img 
        src={`http://localhost:5000${item.imageUrl}`} 
        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 grayscale-[0.3] group-hover:grayscale-0" 
        alt={item.name} 
      />

      {/* Industrial Tag */}
      <div className="absolute top-0 right-0 bg-yellow-500 text-black px-6 py-1 font-black text-[10px] uppercase tracking-tighter transform rotate-90 translate-x-4 translate-y-10 z-20">
        Loose Fit
      </div>

      {/* Industrial Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm z-10">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAdd}
          className="bg-yellow-500 text-black px-6 py-3 rounded-full font-black text-xs uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
        >
          <ShoppingBag size={16} /> Grab Denim
        </motion.button>
      </div>

      {/* Price Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black via-black/80 to-transparent z-10">
        <p className="text-yellow-500 font-mono text-xs tracking-widest mb-1 uppercase">Denim Archive // 001</p>
        <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter leading-none">
          {item.name}
        </h3>
        <div className="mt-4 flex items-center justify-between">
            <p className="text-white font-mono text-lg font-bold">
              ₦{Number(item.price).toLocaleString()}
            </p>
            <Maximize size={16} className="text-white/20" />
        </div>
      </div>
    </div>
  </motion.div>
);

const BaggyJeansPage = () => {
  const [jeans, setJeans] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // TOAST NOTIFICATION STATE
  const [showToast, setShowToast] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");

  const { addToCart } = useCart();

  const handleAddToCart = (item: Product) => {
    addToCart(item, 1);
    setAddedItemName(item.name);
    setShowToast(true);

    // Auto-hide toast
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const fetchJeans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/category/baggy-jeans");
        setJeans(response.data);
      } catch (error) {
        console.error("Error fetching jeans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJeans();
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-yellow-500/30 overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 py-24">
        
        {/* Brutalist Header */}
        <header className="mb-32 border-l-8 border-yellow-500 pl-12">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <h1 className="text-8xl md:text-[12rem] font-black uppercase italic leading-[0.75] tracking-tighter">
              Wide <br /> <span className="text-neutral-900 stroke-text">Vision.</span>
            </h1>
            
            <div className="flex flex-wrap gap-12 mt-12 text-neutral-500">
              <div className="flex items-center gap-3 text-[12px] uppercase font-black tracking-[0.3em] text-yellow-500/50">
                <Scissors size={18} strokeWidth={3} /> Raw Heavy Denim
              </div>
              <div className="flex items-center gap-3 text-[12px] uppercase font-black tracking-[0.3em]">
                <Ruler size={18} strokeWidth={3} /> Signature Loose Cut
              </div>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-yellow-500" size={50} />
            <p className="text-yellow-500 font-mono text-xs animate-pulse uppercase tracking-widest">Loading Hardware...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <AnimatePresence mode="popLayout">
              {jeans.map((item) => (
                <JeansCard 
                  key={item._id} 
                  item={item} 
                  onAdd={() => handleAddToCart(item)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && jeans.length === 0 && (
          <div className="py-40 text-center">
            <h2 className="text-6xl font-black italic text-neutral-900 border-y border-neutral-900 py-10">OUT OF STOCK // ARCHIVE CLOSED</h2>
          </div>
        )}
      </main>

      {/* --- INDUSTRIAL TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed bottom-10 right-10 z-100"
          >
            <div className="bg-yellow-500 text-black p-1 pr-6 flex items-center gap-4 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
              <div className="bg-black text-yellow-500 p-4">
                <Check size={24} strokeWidth={4} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-tighter leading-none">Gear Secured</p>
                <p className="font-black uppercase italic text-lg tracking-tighter">{addedItemName}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px #171717;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default BaggyJeansPage;