import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, BookOpen, Crown, Shirt, Zap } from "lucide-react";
import CollectNavbar from "../component/wardrobeNav";
import { Link } from "react-router-dom";
import axios from 'axios';

// 1. IMPORT YOUR ACTUAL SPLASH COMPONENT HERE
// import LoadingScreen from "../component/LoadingScreen"; 

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Collections = () => {
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDataReady, setIsDataReady] = useState(false);

  const brandStatements = [
    { main: "ARCHITECTURE FOR THE BODY", sub: "Redefining the silhouette of modern ambition." },
    { main: "THE VELVET REVOLUTION", sub: "Where premium craftsmanship meets street-ready utility." },
    { main: "CURATED FOR THE CROWD", sub: "Limited drops designed for those who lead, never follow." },
    { main: "A SYMPHONY OF TEXTURE", sub: "Touch the future of high-fashion Nigerian streetwear." },
  ];

  // Header Text Rotation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatementIndex((prev) => (prev + 1) % brandStatements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // 2. FETCH DATA & SYNC SPLASH
  useEffect(() => {
    const initializePage = async () => {
      try {
        // Start fetching products
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        
        // Artificial delay so the splash screen feels intentional
        setTimeout(() => {
          setIsDataReady(true);
        }, 2500); 

      } catch (err) {
        console.error("Backend offline:", err);
        // If the server fails, we show the page anyway so it's not stuck
        setIsDataReady(true);
      }
    };

    initializePage();
  }, []);

  // 3. THE SPLASH GATEKEEPER
  if (!isDataReady) {
    return (
      <div className="h-screen w-full bg-[#020617] flex items-center justify-center">
         {/* Replace this with <LoadingScreen /> if you have it as a component */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex flex-col items-center"
         >
            <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
            <h2 className="text-purple-500 font-black text-xl tracking-[0.8em] animate-pulse">
              CLOUD LUXURY
            </h2>
         </motion.div>
      </div>
    );
  }

  // 4. MAIN PAGE CONTENT (Only shows after data is ready)
  const features = [
    { 
      title: "THE CLOUD VAULT", 
      desc: "Our most exclusive, numbered pieces.", 
      icon: <Crown className="text-amber-400" />,
      img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1000",
      link: "/vault"
    },
    { 
      title: "DESIGN PHILOSOPHY", 
      desc: "How we blend culture with luxury.", 
      icon: <BookOpen className="text-purple-400" />,
      
      img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000",
      link: "/blog"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-[#020617] text-white overflow-hidden"
    >
      <div className="hidden lg:block w-64 shrink-0" />
      <CollectNavbar />

      <main className="lg:ml-64 px-6 py-12 md:p-16 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        
        <header className="mb-24 min-h-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStatementIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-purple-500 font-mono text-sm tracking-[0.5em] mb-4 uppercase">
                Cloud Luxury Edition
              </h2>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter max-w-4xl leading-[0.95] mb-6">
                {brandStatements[currentStatementIndex].main}
              </h1>
              <p className="text-gray-500 text-xl font-light tracking-wide max-w-xl">
                {brandStatements[currentStatementIndex].sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </header>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feat, i) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={i}
              className="relative h-[400px] rounded-[3rem] overflow-hidden group border border-white/5"
            >
              <img src={feat.img} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt="" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-3 mb-4">
                  {feat.icon}
                  <span className="text-xs font-bold tracking-[0.3em] uppercase">{feat.title}</span>
                </div>
                <h3 className="text-3xl font-bold mb-6">{feat.desc}</h3>
                <Link 
                to={feat.link}
                target="_blank"             // Opens in a new tab
                rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-sm font-bold border-b border-white/20 pb-2 hover:border-purple-500 transition-colors">
                  DISCOVER MORE <MoveRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WARDROBE GRID */}
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Shirt className="text-purple-500" /> Current Wardrobe
          </h3>
          <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block" />
          <span className="text-gray-500 text-sm font-mono">{products.length} PIECES TOTAL</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {products.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-3/4 rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5 transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(168,85,247,0.1)]">
                <img
                  src={item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:5000${item.imageUrl}`}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-purple-400 font-mono text-xs mb-1 uppercase tracking-widest">Available Now</p>
                  <h4 className="text-xl font-bold mb-6">{item.name}</h4>
                  <Link
                    to={`/order/${item._id}`}
                    target="_blank"             // Opens in a new tab
                     rel="noopener noreferrer"
                    className="flex items-center justify-between w-full py-4 px-6 bg-white text-black rounded-2xl font-bold hover:bg-purple-600 hover:text-white transition-all transform active:scale-95"
                  >
                    <span className="text-xs uppercase tracking-tighter">Acquire Piece</span>
                    <Zap size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default Collections;