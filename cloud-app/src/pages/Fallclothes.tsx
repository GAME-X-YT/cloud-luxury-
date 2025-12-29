import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Leaf, ThermometerSnowflake, Wind } from "lucide-react";

interface FallItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
}

const FallCard = ({ item }: { item: FallItem }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative"
  >
    {/* Card Container */}
    <div className="relative aspect-4/5 overflow-hidden rounded-4xl bg-[#1a1512] border border-white/5 shadow-2xl">
      {/* Texture Overlay (Gives a grainy, wool-like feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')] z-10" />
      
      <img 
        src={`http://localhost:5000${item.imageUrl}`} 
        className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000" 
        alt={item.name} 
      />

      {/* Seasonal Badge */}
      <div className="absolute top-5 left-5 z-20 bg-[#c2410c]/80 backdrop-blur-md px-3 py-1 rounded-full border border-orange-400/20">
        <span className="text-[9px] font-black uppercase tracking-tighter text-white flex items-center gap-1">
          <Leaf size={10} /> Autumn Ready
        </span>
      </div>

      {/* Bottom Info Glassmorphism */}
      <div className="absolute inset-x-4 bottom-4 z-20 bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-serif italic text-white leading-none">{item.name}</h3>
            <p className="text-orange-200/60 text-[10px] uppercase tracking-widest mt-2 font-medium">Insulated Comfort</p>
          </div>
          <p className="text-white font-bold text-sm italic">₦{Number(item.price).toLocaleString()}</p>
        </div>
        
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-white text-black py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-colors"
        >
          Add to Wardrobe
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const FallPage = () => {
  const [items, setItems] = useState<FallItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFall = async () => {
      try {
        // Fetches from the "fall" category in your dashboard
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
      {/* Decorative Falling Particles (Visual only) */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, 800], 
              x: [0, 50, -50, 0],
              rotate: [0, 360] 
            }}
            transition={{ 
              duration: 15 + i * 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute text-orange-700/30"
            style={{ left: `${i * 20}%`, top: '-10%' }}
          >
            <Leaf size={24 + i * 5} />
          </motion.div>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Editorial Header */}
        <header className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#c2410c] text-[10px] font-bold tracking-[1em] uppercase block mb-6">
              Seasonal Transition
            </span>
            <h1 className="text-7xl md:text-9xl font-serif italic text-white leading-none">
              Golden <br /> <span className="text-neutral-700">Layers.</span>
            </h1>
            
            <div className="flex justify-center gap-12 mt-12 text-neutral-500 italic font-serif">
              <div className="flex flex-col items-center gap-2">
                <Wind size={20} strokeWidth={1} className="text-orange-800" />
                <span className="text-xs">Windproof</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ThermometerSnowflake size={20} strokeWidth={1} className="text-orange-800" />
                <span className="text-xs">Thermal Lite</span>
              </div>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-orange-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <AnimatePresence>
              {items.map((item) => (
                <FallCard key={item._id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="text-center py-40 border border-white/5 rounded-[4rem] bg-[#14100e]">
            <p className="text-neutral-700 font-serif italic text-3xl">The leaves are falling, but our stock hasn't arrived.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FallPage;