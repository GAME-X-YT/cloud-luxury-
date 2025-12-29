import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import TshirtNavbar from "../component/TshirtNavbar";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
}

const TShirtCollection = () => {
  const [tshirts, setTshirts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);

  useEffect(() => {
    const fetchTshirts = async () => {
      try {
        // Fetching specifically from the t-shirt category
        const response = await axios.get("http://localhost:5000/api/products/category/tshirt");
        setTshirts(response.data);
      } catch (error) {
        console.error("Error fetching t-shirts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTshirts();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30">
            {/* Specialized T-Shirt Sidebar */}
        <TshirtNavbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

      <motion.main 
        animate={{ paddingLeft: isNavOpen && window.innerWidth > 1024 ? "256px" : "0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex-1 px-6 py-12 md:p-16"
      >
        {/* Header Section */}
        <header className="max-w-7xl mx-auto mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-yellow-500 mb-2">
              <Sparkles size={20} />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Premium Essentials</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter italic font-serif">
              Cotton <span className="text-yellow-500">Couture</span>
            </h1>
            <p className="text-neutral-500 max-w-md text-sm md:text-base leading-relaxed">
              Experience the pinnacle of everyday luxury. Crafted from the finest materials for those who appreciate aura.
            </p>
          </motion.div>
        </header>

        {loading ? (
          <div className="flex flex-col h-96 items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
            <span className="text-neutral-500 tracking-widest text-xs uppercase">Unlocking the collection...</span>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {tshirts.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/5">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                       <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                          Quick Order
                       </button>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl">
                       <span className="text-white font-medium">${item.price}</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-6 space-y-1 px-2">
                    <h3 className="text-lg font-medium text-white group-hover:text-yellow-500 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs uppercase tracking-widest">Luxury Fit</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {tshirts.length === 0 && !loading && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
            <p className="text-neutral-500 font-serif italic text-xl">The summer collection is arriving soon.</p>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default TShirtCollection;