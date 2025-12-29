import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShoppingBag, Eye } from "lucide-react";
import GliteNavbar from "../component/gliteNavbar";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

const JewelryCategoryPage = () => {
  const { type } = useParams<{ type: string }>(); 
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);

  useEffect(() => {
    const fetchJewelry = async () => {
      setLoading(true);
      try {
        // Fetching specifically from jewelry category and the sub-type
        const response = await axios.get(`http://localhost:5000/api/products/jewelry/${type}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching jewelry:", error);
      } finally {
        setLoading(false);
      }
    };
    if (type) fetchJewelry();
  }, [type]);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <GliteNavbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

      <motion.main 
        animate={{ paddingLeft: isNavOpen ? "256px" : "0px" }}
        className="flex-1 px-8 py-12 md:p-20 transition-all duration-500"
      >
        <header className="max-w-6xl mx-auto mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-yellow-500 text-[10px] font-black tracking-[0.8em] uppercase block mb-4"
          >
            The Atelier / {type}
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-serif italic capitalize">
            {type} <span className="text-neutral-700 font-sans not-italic font-black text-4xl ml-2">Collection</span>
          </h1>
        </header>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="aspect-4/5 overflow-hidden rounded-t-[4rem] rounded-b-xl bg-neutral-900/50 border border-white/5 relative">
                    <img 
                      src={`http://localhost:5000${item.imageUrl}`} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    
                    {/* Floating Price Tag */}
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                       <span className="text-yellow-500 font-bold text-sm">₦{item.price.toLocaleString()}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button className="p-4 bg-white text-black rounded-full hover:bg-yellow-500 transition-colors"><ShoppingBag size={20}/></button>
                        <button className="p-4 bg-white text-black rounded-full hover:bg-yellow-500 transition-colors"><Eye size={20}/></button>
                    </div>
                  </div>

                  <div className="mt-8 text-center px-4">
                    <h3 className="text-2xl font-light tracking-tight group-hover:text-yellow-500 transition-colors">{item.name}</h3>
                    <p className="text-neutral-500 text-xs mt-2 leading-relaxed italic">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default JewelryCategoryPage;