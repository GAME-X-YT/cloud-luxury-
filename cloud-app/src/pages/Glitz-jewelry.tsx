import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingBag, Loader2 } from "lucide-react";
import GliteNavbar from "../component/gliteNavbar";

// 1. Define the TypeScript structure for your uploaded backend items
interface JewelryItem {
  _id: string; // MongoDB uses _id
  name: string;
  image?: string;
  imageUrl: string; // ADD THIS LINE
  price: number;
  category: string;
}

const JewelryCollections = () => {
  const [jewelry, setJewelry] = useState<JewelryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from your backend
  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        // Replace with your actual backend URL
        const response = await axios.get("http://localhost:5000/api/products/category/jewelry");
        console.log("Data received:", response.data); // Debug: Check your console!
        setJewelry(response.data);
      } catch (error) {
        console.error("Error fetching jewelry:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJewelry();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Sidebar Spacer */}
      <div className="w-64 flex-shrink-0" />
      <GliteNavbar />

      <main className="flex-1 p-10">
        {/* Header Section */}
        <header className="mb-12 border-b border-white/5 pb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            The <span className="text-yellow-500">Glitz</span> Gallery
          </h2>
          <p className="text-neutral-500 italic">Exclusive jewelry pieces, hand-selected for aura.</p>
        </header>

        {loading ? (
          <div className="flex h-64 items-center justify-center text-yellow-500">
            <Loader2 className="animate-spin mr-2" /> 
            <span>Consulting the vault...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {jewelry.length > 0 ? (
              jewelry.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-4 hover:border-yellow-500/30 transition-all duration-500"
                >
                  {/* Product Image */}
                  <div className="relative h-64 w-full overflow-hidden rounded-[2rem] bg-neutral-800">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Price Tag Overlay */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                      <span className="text-yellow-500 font-bold">${item.price}</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-6 px-2 text-center">
                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-1">{item.name}</h3>
                    
                    <button className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:from-yellow-500 hover:to-yellow-300 transform active:scale-95 transition-all shadow-[0_10px_20px_rgba(234,179,8,0.2)]">
                      <ShoppingBag size={18} />
                      ORDER PIECE
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-neutral-500">The vault is currently empty. Check back soon.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default JewelryCollections;