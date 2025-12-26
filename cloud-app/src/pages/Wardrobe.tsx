  import { motion } from "framer-motion";
  import { ShoppingCart } from "lucide-react";
  import CollectNavbar from "../component/wardrobeNav";
  import { Link } from "react-router-dom";

  // 1. FIX: Define what a Product looks like (Fixes the 'any' type errors)
  interface Product {
    _id: string;      // Change id to _id if you are using MongoDB
    name: string;
    price: number;
    imageUrl: string; // Add this line!
    description?: string; // The '?' means it is optional
    category?: string;
  }

  // 2. FIX: Ensure products is defined in this file or imported
  // If you have products in a separate file, use: import { products } from "../data/products";
  const products: Product[] = [
    { _id: "one", name: "Cashay Tapastry Jacket (CTJ)", price: 120, imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
    { _id: "two", name: "Urban Black Hoodie", price: 80, imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
    // ... rest of your 60 products
  ];

  const Collections = () => {
    return (
      <div className="flex min-h-screen bg-[#0f172a]">
        <div className="w-64 flex-shrink-0" />
        <CollectNavbar />

        <main className="flex-1 p-8 md:p-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Wardrobe Collection</h2>
            <p className="text-gray-400">Curated styles for the modern individual.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {/* 3. FIX: Add types to item and index in the map function */}
            {products.map((item: Product, index: number) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={`http://localhost:5000${item.imageUrl}`}  
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg leading-tight mb-4">{item.name}</p>
                    <Link
                      to={`/order/${item._id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-2xl font-bold hover:bg-purple-600 hover:text-white transition-all transform active:scale-95"
                    >
                      <ShoppingCart size={18} />
                      Order Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    );
  };

  export default Collections;