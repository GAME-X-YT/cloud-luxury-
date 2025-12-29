// import { motion } from 'framer-motion';

// interface Hoodie {
// id: number;
// name: string;
// price: string;
// img: string;
// }
// const HoodieGallery = () => {
//   // Logic to simulate 100 hoodies
//   const hoodies = Array.from({ length: 100 }).map((_, i) => ({
//     id: i,
//     name: `Cloud Signature Hoodie v.${i + 1}`,
//     price: "$120",
//     // Replace with your actual image logic
//     img: `https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80` 
//   }));

  
//   return (
//     <div className="min-h-screen bg-[#0a0a0b] text-white pt-32 pb-20 px-6 md:px-12">
      
//       {/* HEADER SECTION */}
//       <header className="mb-20 text-center">
//         <motion.span 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-4 block"
//         >
//           Essential Wear
//         </motion.span>
//         <motion.h1 
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-5xl md:text-7xl cinzel-regular uppercase tracking-tighter"
//         >
//           Hoodie <span className="italic font-light opacity-60">Archive</span>
//         </motion.h1>
//       </header>

//       {/* THE GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
//         {hoodies.map((hoodie, index) => (
//           <HoodieCard key={hoodie.id} hoodie={hoodie} index={index} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Sub-component for individual items to keep code clean
// const HoodieCard = ({ hoodie, index }: { hoodie: Hoodie; index: number }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{ duration: 0.6, delay: (index % 4) * 0.1 }} // Staggers rows
//       className="group cursor-pointer"
//     >
//       <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-[#161618] border border-white/5">
//         <motion.img
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.6 }}
//           src={hoodie.img}
//           alt={hoodie.name}
//           className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
//           loading="lazy" // Critical for 100 images
//         />
        
//         {/* Quick Add Overlay */}
//         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//             <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform">
//                 Add to Bag
//             </button>
//         </div>
//       </div>

//       <div className="mt-6 flex justify-between items-start">
//         <div>
//           <h3 className="text-[11px] uppercase tracking-widest text-white/80 font-medium">
//             {hoodie.name}
//           </h3>
//           <p className="text-[10px] text-white/40 mt-1 uppercase tracking-tighter">
//             Oversized Fit
//           </p>
//         </div>
//         <span className="text-sm font-light text-white/60">{hoodie.price}</span>
//       </div>
//     </motion.div>
//   );
// };

// export default HoodieGallery;
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Wind, Layers, ShoppingBag } from "lucide-react";

interface HoodieItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
}

const HoodieCard = ({ item }: { item: HoodieItem }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 group-hover:border-yellow-500/30 transition-all duration-500">
      {/* Product Image */}
      <img 
        src={`http://localhost:5000${item.imageUrl}`} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        alt={item.name} 
      />
      
      {/* Floating Price Badge */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex justify-between items-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Premium Fleece</p>
            <p className="text-yellow-500 font-black text-sm">₦{Number(item.price).toLocaleString()}</p>
          </div>
          <button className="bg-yellow-500 p-2 rounded-lg text-black hover:bg-white transition-colors">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>

    <div className="mt-4 px-2">
      <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">{item.name}</h3>
      <p className="text-neutral-500 text-xs font-medium uppercase tracking-widest mt-1">Street Architecture</p>
    </div>
  </motion.div>
);

const HoodiePage = () => {
  const [hoodies, setHoodies] = useState<HoodieItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoodies = async () => {
      try {
        // Matches the "hoodie" category from your OwnerDashboard
        const response = await axios.get("http://localhost:5000/api/products/category/hoodie");
        setHoodies(response.data);
      } catch (error) {
        console.error("Error fetching hoodies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHoodies();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30">
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Urban Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-yellow-500" />
                <span className="text-yellow-500 text-[10px] font-bold tracking-[0.5em] uppercase">
                  Urban Essential
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
                Heavy <span className="text-neutral-800">Metal</span> <br /> 
                <span className="text-yellow-500">Cotton.</span>
              </h1>
            </div>

            <div className="flex gap-6 pb-2">
              <div className="flex flex-col items-center">
                <Wind size={20} className="text-neutral-700 mb-2" />
                <span className="text-[8px] uppercase tracking-widest text-neutral-500">Breathable</span>
              </div>
              <div className="flex flex-col items-center">
                <Layers size={20} className="text-neutral-700 mb-2" />
                <span className="text-[8px] uppercase tracking-widest text-neutral-500">450 GSM</span>
              </div>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-yellow-500" size={32} />
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-600">Unlocking Gallery</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {hoodies.map((item) => (
                <HoodieCard key={item._id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && hoodies.length === 0 && (
          <div className="py-40 text-center border border-white/5 rounded-[4rem]">
            <p className="text-neutral-700 font-black uppercase text-4xl tracking-tighter opacity-80">
              Collection Out Of Stock
            </p>
            <p className="text-neutral-500 mt-4 text-sm font-serif italic">Check back shortly for the next drop.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HoodiePage;