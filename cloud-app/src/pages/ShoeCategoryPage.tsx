import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import ShoeNavbar from "../component/shoeNavbar"; 

interface ShoeItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
}

const ShoeCategoryPage = () => {
  const { type } = useParams<{ type: string }>(); 
  const [shoes, setShoes] = useState<ShoeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);

  useEffect(() => {
    const fetchShoes = async () => {
      setLoading(true);
      try {
        // Backend expects the subCategory (type)
        const response = await axios.get(`http://localhost:5000/api/products/shoes/${type}`);
        setShoes(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };
    if (type) fetchShoes();
  }, [type]);

  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      <ShoeNavbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

      <motion.main 
        animate={{ paddingLeft: isNavOpen ? "256px" : "0px" }}
        className="flex-1 px-8 py-12 md:p-20"
      >
        <header className="max-w-6xl mx-auto mb-20">
          <span className="text-yellow-500 text-[10px] font-bold tracking-[0.6em] uppercase block mb-4">
            Catalog / {type?.replace('-', ' ')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic text-white leading-tight capitalize">
            The {type?.replace('-', ' ')} <span className="text-neutral-500">Edit</span>
          </h1>
        </header>

        {loading ? (
          <div className="flex flex-col h-96 items-center justify-center">
            <Loader2 className="animate-spin text-yellow-500 mb-4" size={32} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <AnimatePresence>
              {shoes.map((shoe, index) => (
                <motion.div
                  key={shoe._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-[#0a0a0a] border border-white/5">
                    <img 
                      src={`http://localhost:5000${shoe.imageUrl}`} 
                      alt={shoe.name} 
                      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute bottom-8 left-8">
                       <p className="text-2xl font-light">${shoe.price}</p>
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-serif italic text-center">{shoe.name}</h3>

                  {shoe.description && (
                <p className="mt-2 text-neutral-400 text-sm text-center line-clamp-2 px-4 italic">
                    {shoe.description}
                </p>
                )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default ShoeCategoryPage;