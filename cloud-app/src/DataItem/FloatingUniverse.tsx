import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingUniverse = () => {

  const [textIndex, setTextIndex] = useState(0);
  const phrases = [
    "Elevated Outing Wear",
    "Weightless Luxury Style",
    "High-End Street Silhouette",
    "The Essence of Cloud"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 7000); // 7sec per phrase
    return () => clearInterval(interval);
  }, []);

  // Extended image list with "mobile" flag to control density
  const universeImages = [
    { id: 1, src: "https://i.pinimg.com/736x/73/6c/80/736c804f29ecc094000cea4b0af0231a.jpg", top: "15%", left: "10%", mobile: true },
    { id: 2, src: "https://i.pinimg.com/1200x/28/ec/e4/28ece40956d4527a605307839c15e7ae.jpg", top: "55%", left: "5%", mobile: true },
    { id: 3, src: "https://i.pinimg.com/1200x/49/ba/fd/49bafd30a74d89f332974a82a569ea64.jpg", top: "20%", right: "15%", mobile: true },
    { id: 4, src: "https://i.pinimg.com/1200x/da/76/98/da7698505f92961a1e85788819b4ca63.jpg", top: "65%", right: "10%", mobile: true },
    { id: 5, src: "https://i.pinimg.com/1200x/ab/80/0f/ab800f0858bd56e7842f7c002d62f9ea.jpg", top: "10%", left: "40%", mobile: false },
    { id: 6, src: "https://i.pinimg.com/1200x/b1/b1/4a/b1b14a9a796fb6ffdab193d0abc19fb8.jpg", top: "70%", left: "35%", mobile: false },
    // { id: 7, src: "https://i.pinimg.com/736x/af/eb/46/afeb46fdf5a26987df57e9fc6ad01831.jpg", top: "57%", right: "35%", mobile: false },
  ];

  return (
    <section className="relative h-screen overflow-hidden flex flex-col justify-center items-center">
    

      {/* ✨ Background: Stylish Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      {/* 🏷️ Foreground Text */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center pointer-events-none"
      >
        <h2 className="text-white blur-[5px] md:text-9xl cinzel-regular tracking-tighter italic font-bold bottom-10 -translate-y-1/10 animate-bounce">
          Cloud Luxury
        </h2>
      <div className="h-6 mt-6"> {/* Fixed height wrapper to prevent layout jump */}
            <motion.p 
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-blue-200/50 uppercase tracking-[0.8em] text-[10px] md:text-xs font-light"
            >
              {phrases[textIndex]}
            </motion.p>
        </div>
      </motion.div>

      {/* 🌌 Floating Images Container */}
      <div className="absolute inset-0 w-full h-full">
        {universeImages.map((item, index) => (
          <motion.div
            key={item.id}
            className={`absolute cursor-pointer transition-all duration-500
              ${!item.mobile ? "hidden xl:block" : "block"} 
              w-32 h-44 md:w-56 md:h-72 lg:w-64 lg:h-80
            `}
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right,
              zIndex: 20 
            }}
            // Animation: Floating
            animate={{
              y: [0, -80, 0],
              x: [0, 40, 60, 20, 0],
              rotate: [index % 2 === 0 ? -2 : 2, index % 2 === 0 ? 2 : -2, index % 2 === 0 ? -2 : 2]
            }}
            transition={{
              duration: 8 + index, // Varied speeds for natural feel
              repeat: Infinity,
              ease: "easeInOut",
            }}
            // Hover logic: scale up and "freeze" the animation
            whileHover={{ 
               scale: 2.15, 
               zIndex: 60, 
               filter: "brightness(1.2) contrast(1.1)",
            }}
          >
            <div className="relative w-full h-full group">
              <img 
                src={item.src} 
                className="w-full h-full object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-blue-400/50 transition-colors"
                alt="Cloud Luxury Wear"
              />
              {/* Glassmorphism Label on Hover */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <p className="text-white text-[10px] uppercase tracking-widest font-bold">Limited Edition</p>
                <p className="text-blue-200 text-[12px]">View Masterpiece</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

       {/* Decorative Particle (Optional) */}
      {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-20 bg-linear-to-t from-blue-500 to-transparent"></div>
      </div> */}
    </section>
  );
};

export default FloatingUniverse;