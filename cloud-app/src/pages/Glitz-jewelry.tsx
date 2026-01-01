import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import GliteNavbar from "../component/gliteNavbar";

// 1. Define the TypeScript structure for your uploaded backend items
interface JewelryItem {
  _id: string; 
  name: string;
  image?: string;
  imageUrl: string; 
  price: number;
  category: string;
  subCategory: string;
}

const JewelryCollections = () => {
  const [jewelry, setJewelry] = useState<JewelryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);

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
    <div className="min-h-screen bg-[#050505] text-white">
      <GliteNavbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />


      <motion.main 
        initial={false}
        animate={{ 
          // Adjust padding so content pushes/pulls when nav opens/closes
          paddingLeft: isNavOpen ? "256px" : "0px", 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex-1 w-full"
      ></motion.main>
      {/* Responsive Layout: 
          - No margin on mobile
          - pl-64 (sidebar width) on large screens */}
      <main className="transition-all duration-300 lg:pl-64 p-5 md:p-10">
        
        {/* Header Section */}
        <header className="mt-16 lg:mt-0 mb-12 border-b border-white/5 pb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            The <span className="text-yellow-500">Glitz</span> Gallery
          </h2>
          <p className="text-neutral-500 italic text-sm md:text-base">Exclusive jewelry pieces, hand-selected for aura.</p>
        </header>

        {loading ? (
          <div className="flex h-64 items-center justify-center text-yellow-500">
            <Loader2 className="animate-spin mr-2" /> 
            <span>Consulting the vault...</span>
          </div>
        ) : (
          /* Responsive Grid: 1 col on mobile, 2 on tablet, 3-4 on desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
            {jewelry.length > 0 ? (
              jewelry.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-neutral-900/40 border border-white/5 rounded-4xl p-4"
                >
                  <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-neutral-800">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full border border-white/10">
                      <span className="text-yellow-500 text-sm font-bold">${item.price}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold mb-4">{item.name}</h3>
                    {/* CHANGE: This now links to the specific category section */}
                  <Link 
                    to={`/jewelry/${item.subCategory.toLowerCase()}`}
                    className="block w-full py-3 bg-white text-black text-center font-bold rounded-xl active:scale-95 transition-all hover:bg-yellow-500"
                  >
                    VIEW COLLECTION
                  </Link>
                 </div>
                </motion.div>
              ))
            ) : (
              <p className="text-neutral-500 col-span-full text-center">The vault is currently empty.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default JewelryCollections;