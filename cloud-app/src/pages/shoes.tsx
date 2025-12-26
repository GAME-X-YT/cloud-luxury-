  import { useEffect, useState } from "react";
  import ShoeNavbar from "../component/shoeNavbar";
  // Import your API instance
  import { motion } from "framer-motion";
  import { getAllShoes } from '../api/api'; 

  interface Shoe {
    _id: string; // Backend usually uses _id
    name: string;
    price: string | number;
    image: string; // The URL from Cloudinary/Backend
    description?: string;
  }

  const Shoes = () => {
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchShoes = async () => {
        try {
          const res = await getAllShoes(); // Assuming this is your API function
          // If your backend returns data in a specific structure, adjust here:
          setShoes(res.data.shoes || res.data); 
        } catch (error) {
          console.error("Failed to fetch shoes:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchShoes();
    }, []);

    return (
  <div className="min-h-screen bg-slate-50 relative overflow-hidden">
    {/* Animated Background Decor */}
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/50 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/50 blur-[120px]" />
    </div>

    <ShoeNavbar />

    {/* Header Section */}
    <header className="relative pt-40 pb-16 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-7xl rancho-regular bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-4">
          Shoes Collection
        </h1>
        <div className="h-1 w-24 bg-purple-500 mx-auto rounded-full mb-6" />
        <p className="max-w-2xl mx-auto text-lg text-slate-600 trade-winds-regular leading-relaxed">
          Step into elegance. Explore our curated selection of premium footwear designed for style and absolute comfort.
        </p>
      </motion.div>
    </header>

    {loading ? (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        <p className="mt-4 text-purple-800 font-semibold animate-pulse">Refining the collection...</p>
      </div>
    ) : (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        {shoes.length > 0 ? (
          shoes.map((shoe) => (
            <motion.div
              key={shoe._id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ y: -10 }}
              className="group relative bg-white border border-slate-100 rounded-[2rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden rounded-[1.5rem] bg-slate-100">
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-bold text-purple-700">${shoe.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-slate-800 cinzel-bold mb-2 group-hover:text-purple-700 transition-colors">
                  {shoe.name}
                </h2>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                  Premium craftsmanship meets modern design in every stitch.
                </p>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold overflow-hidden relative group/btn transition-all active:scale-95">
                  <span className="relative z-10">Shop Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-xl italic">Our new arrivals are currently in transit. Check back soon!</p>
          </div>
        )}
      </motion.div>
    )}
  </div>
);
  };

  export default Shoes;