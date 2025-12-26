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


import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from "../component/HomeNavbar";

interface Hoodie {
  id: string;
  name: string;
  price: string;
  img: string;
}

const HoodieArchive = () => {
  const [hoodies, setHoodies] = useState<Hoodie[]>([]);

  useEffect(() => {
    // GENERATING 50 UNIQUE ITEMS
    // In the next step, we will replace this with: fetch('/api/products')
    const generate50Items = Array.from({ length: 50 }).map((_, i) => ({
      id: `hoodie-${i}`,
      name: `Cloud Signature v.${i + 1}`,
      price: `$${110 + (i % 5) * 15}.00`,
      // Adding &sig=${i} is what makes every single image different
      img: `https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80&sig=${i}`
    }));
    
    setHoodies(generate50Items);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-16 border-b border-white/10 pb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl cinzel-regular uppercase tracking-tighter"
          >
            Archive <span className="text-white/20 italic">01-50</span>
          </motion.h1>
          <p className="text-white/40 mt-4 tracking-[0.2em] uppercase text-[10px]">
            Limited Edition Luxury Streetwear
          </p>
        </header>

        {/* THE 50-IMAGE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {hoodies.map((hoodie, index) => (
            <motion.div
              key={hoodie.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              className="group cursor-pointer"
            >
              {/* IMAGE BOX */}
              <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-[#1a1a1c] border border-white/5">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={hoodie.img}
                  alt={hoodie.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                
                {/* QUICK SHOP OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Piece
                   </button>
                </div>
              </div>

              {/* DETAILS */}
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-[12px] uppercase tracking-widest font-medium text-white/90">
                    {hoodie.name}
                  </h3>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-tighter">
                    Heavyweight Cotton • Oversized
                  </p>
                </div>
                <span className="text-sm font-light text-white/60">{hoodie.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HoodieArchive;