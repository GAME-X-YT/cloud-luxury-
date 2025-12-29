import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Scissors, Ruler, Maximize } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
}

const JeansCard = ({ item }: { item: Product }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-[#111] border border-white/5">
      {/* High-Contrast Image */}
      <img 
        src={`http://localhost:5000${item.imageUrl}`} 
        className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0" 
        alt={item.name} 
      />

      {/* Industrial Tag */}
      <div className="absolute top-0 right-0 bg-yellow-500 text-black px-4 py-1 font-black text-[10px] uppercase tracking-tighter transform rotate-90 translate-x-3 translate-y-8">
        Loose Fit
      </div>

      {/* Price Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black via-black/40 to-transparent">
        <h3 className="text-xl font-black uppercase italic text-white tracking-tighter">
          {item.name}
        </h3>
        <p className="text-yellow-500 font-mono text-sm mt-1">
          ₦{Number(item.price).toLocaleString()}
        </p>
        
        <motion.button 
          whileHover={{ x: 5 }}
          className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white border-b border-yellow-500 pb-1"
        >
          Add to Cart <Maximize size={12} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const BaggyJeansPage = () => {
  const [jeans, setJeans] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJeans = async () => {
      try {
        // Matches the "baggy jeans" category from your owner panel
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
    <div className="min-h-screen bg-[#080808] text-white selection:bg-yellow-500/30">
      <main className="max-w-7xl mx-auto px-6 py-24">
        
        {/* Brutalist Header */}
        <header className="mb-24 border-l-4 border-yellow-500 pl-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.8] italianno-regular">
              Wide <br /> <span className="text-neutral-800">Vision.</span>
            </h1>
            
            <div className="flex flex-wrap gap-8 mt-10 text-neutral-500">
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
                <Scissors size={14} /> Raw Denim
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
                <Ruler size={14} /> Anti-Fit Cut
              </div>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-y-20">
            <AnimatePresence>
              {jeans.map((item) => (
                <JeansCard key={item._id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && jeans.length === 0 && (
          <div className="py-40 text-center opacity-20">
            <h2 className="text-5xl font-black italic">OUT OF STOCK</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default BaggyJeansPage;