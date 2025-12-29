import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShoppingCart, Info } from "lucide-react";
import ShoeNavbar from "../component/shoeNavbar";

interface ShoeItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
}

const ShoePage = () => {
  const [shoes, setShoes] = useState<ShoeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);

  // Fetch only shoes from the backend
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/category/shoes");
        setShoes(response.data);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShoes();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#030303] text-white selection:bg-yellow-500/30">
      {/* Specialized Shoe Navigation */}
      <ShoeNavbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

      <motion.main 
        animate={{ 
          paddingLeft: isNavOpen && window.innerWidth > 1024 ? "256px" : "0px" 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex-1 px-8 py-12 md:p-20"
      >
        {/* Shoe Department Header */}
        <header className="max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-yellow-500 text-[10px] font-bold tracking-[0.6em] uppercase block mb-4">
              Premium Footwear Division
            </span>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">
              The <span className="text-neutral-500">Art</span> of the <br /> 
              <span className="text-yellow-500">Perfect</span> Stride.
            </h1>
            <div className="h-px w-32 bg-linear-to-r from-yellow-500 to-transparent mt-8" />
          </motion.div>
        </header>

        {loading ? (
          <div className="flex flex-col h-96 items-center justify-center">
            <Loader2 className="animate-spin text-yellow-500 mb-4" size={32} />
            <p className="text-neutral-600 text-xs uppercase tracking-widest">Entering the Vault...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <AnimatePresence>
              {shoes.map((shoe, index) => (
                <motion.div
                  key={shoe._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="group relative"
                >
                  {/* Image Display */}
                  <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-[#0a0a0a] border border-white/5 shadow-2xl">
                    <motion.img
                      whileHover={{ scale: 1.1, rotate: -2 }}
                      transition={{ duration: 0.6 }}
                      src={`http://localhost:5000${shoe.imageUrl}`}
                      alt={shoe.name}
                      className="w-full h-full object-contain p-8"
                    />
                    
                    {/* Hover Interaction Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                       <button className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-tighter hover:bg-yellow-400 transition-colors">
                          <ShoppingCart size={16} /> Order Now
                       </button>
                       <button className="flex items-center gap-2 text-white/70 hover:text-white text-[10px] uppercase tracking-widest transition-colors">
                          <Info size={14} /> View Details
                       </button>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-8 left-8">
                       <p className="text-2xl font-light text-white">${shoe.price}</p>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="mt-8 text-center">
                    <h3 className="text-xl font-serif italic text-white mb-2">{shoe.name}</h3>
                    <div className="flex justify-center gap-1">
                       <div className="w-1 h-1 rounded-full bg-yellow-500" />
                       <div className="w-1 h-1 rounded-full bg-neutral-800" />
                       <div className="w-1 h-1 rounded-full bg-neutral-800" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && shoes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40">
            <p className="text-neutral-500 font-serif italic text-xl">The footwear collection is currently being curated.</p>
            <button className="mt-6 text-yellow-500 text-xs uppercase tracking-widest border-b border-yellow-500/30 pb-1">Notify me of arrivals</button>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default ShoePage;