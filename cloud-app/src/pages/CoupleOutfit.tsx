import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Heart, Users, Stars } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
}

const CoupleCard = ({ item }: { item: Product }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className="relative aspect-3/4 overflow-hidden rounded-[2.5rem] bg-neutral-900">
      {/* Dynamic Image */}
      <img 
        src={`http://localhost:5000${item.imageUrl}`} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        alt={item.name} 
      />
      
      {/* Romantic Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
        <button className="w-full bg-white text-black py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-yellow-500 transition-colors">
          View Pair Details
        </button>
      </div>

      {/* "Matching Set" Badge */}
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <Heart size={12} className="text-yellow-500 fill-yellow-500" />
        <span className="text-[10px] font-bold uppercase tracking-tighter text-white">Matching Set</span>
      </div>
    </div>

    <div className="mt-6 text-center">
      <h3 className="text-2xl font-serif italic text-white">{item.name}</h3>
      <div className="flex items-center justify-center gap-2 mt-1">
        <span className="text-yellow-500 font-bold text-lg">₦{Number(item.price).toLocaleString()}</span>
        <span className="text-neutral-600 text-sm italic">per pair</span>
      </div>
    </div>
  </motion.div>
);

const CouplePage = () => {
  const [outfits, setOutfits] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        // Fetching from the "couples outfit" category we set in your OwnerDashboard
        const response = await axios.get("http://localhost:5000/api/products/category/couples-outfit");
        setOutfits(response.data);
      } catch (error) {
        console.error("Error fetching couple outfits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOutfits();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-yellow-500/30">
      <main className="max-w-7xl mx-auto px-8 py-20">
        
        {/* Page Header */}
        <header className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-yellow-500 text-[10px] font-bold tracking-[0.8em] uppercase block mb-4">
              Better Together
            </span>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-none mb-6">
              Double <span className="text-neutral-500">The</span> Luxury.
            </h1>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm leading-relaxed italic">
              "Curated sets designed for the ultimate power couple. From coordinated street-wear to matching evening elegance."
            </p>
          </motion.div>

          {/* Icon Row */}
          <div className="flex justify-center gap-12 mt-12 opacity-30">
            <Users size={30} strokeWidth={1} />
            <Heart size={30} strokeWidth={1} />
            <Stars size={30} strokeWidth={1} />
          </div>
        </header>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-4">Syncing Collections...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatePresence>
              {outfits.map((outfit) => (
                <CoupleCard key={outfit._id} item={outfit} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && outfits.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
            <Heart className="mx-auto text-neutral-800 mb-6" size={40} />
            <p className="text-neutral-600 font-serif italic text-xl">New sets are being designed for you.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CouplePage;