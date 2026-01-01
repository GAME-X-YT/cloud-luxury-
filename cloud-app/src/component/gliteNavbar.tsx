
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faHome, 
//   faArrowCircleRight, 
//   faShirt, 
//   faCloud, 
//   // faSparkles, 
//   faGem 
// } from "@fortawesome/free-solid-svg-icons";

// const GliteNavbar = () => {
//   // Animation Variants for the staggered entrance
//   const containerVariants = {
//     hidden: { opacity: 0, x: -30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2 }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -15 },
//     visible: { opacity: 1, x: 0 }
//   };

//   const navLinks = [
//     { name: "Home", path: "/", icon: faHome },
//     { name: "Hoodies", path: "/collections/hoodies", icon: faArrowCircleRight },
//     { name: "T-Shirts", path: "/collections/tshirts", icon: faShirt },
//     { name: "Jackets", path: "/collections/jackets", icon: faCloud },
//     { name: "Shoes", path: "/shoes", icon: faGem }, // Using Gem for that 'Glitz' feel
//   ];

//   return (
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 shadow-2xl"
//     >
//       <div className="p-8 flex flex-col h-full">
        
//         {/* Brand Logo - The "Glitz" Section */}
//         <motion.div 
//           whileHover={{ scale: 1.02 }}
//           className="h-20 flex flex-col bg-linear-to-b from-neutral-800 to-neutral-950 border border-neutral-700 justify-center rounded-2xl mb-12 items-center relative overflow-hidden group"
//         >
//           {/* Subtle gold glow effect on hover */}
//           <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
//           <h1 className="text-3xl font-bold italianno-bold bg-linear-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
//             Glitz Aura
//           </h1>
//           <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 -mt-1">Luxury Attire</span>
//         </motion.div>

//         {/* Navigation Links */}
//         <nav className="flex flex-col space-y-2 flex-1">
//           <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-4 ml-2">Catalogue</p>
          
//           {navLinks.map((link) => (
//             <motion.div key={link.name} variants={itemVariants}>
//               <Link 
//                 to={link.path} 
//                 className="flex items-center space-x-4 p-3 rounded-xl transition-all group relative hover:bg-white/3"
//               >
//                 {/* Active Indicator (vertical line) */}
//                 <div className="absolute left-0 w-1 h-0 bg-yellow-500 group-hover:h-1/2 transition-all duration-300 rounded-r-full" />
                
//                 <FontAwesomeIcon 
//                   icon={link.icon} 
//                   className="text-neutral-500 group-hover:text-yellow-500 transition-colors w-5" 
//                 />
//                 <span className="text-sm font-medium text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">
//                   {link.name}
//                 </span>
//               </Link>
//             </motion.div>
//           ))}
//         </nav>

//         {/* Bottom Section */}
//         <div className="mt-auto pt-6 border-t border-white/5">
//           <Link to="/" className="flex items-center text-xs text-neutral-500 hover:text-white transition-colors group italic">
//             <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> 
//             Return to Store
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default GliteNavbar;





  import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faLayerGroup,
  faStopwatch,
  faBars,
  faChevronLeft,
  faGem,
  faCircleDot,
  faRing
} from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const GliteNavbar = ({ isOpen, setIsOpen }: NavbarProps) => {
  
  
  const containerVariants = {
    hidden: { x: -256, opacity: 0 },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2, 
        type: "spring" as const, 
        stiffness: 100,
        damping: 20
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 }
  };

  const jewelryLinks = [
    { name: 'Home Page', path: '/', icon: faHome },
    { name: 'Necklaces', path: '/jewelry/necklaces', icon: faGem },
    { name: 'Bracelets', path: '/jewelry/bracelets', icon: faCircleDot },
    { name: 'Knuckles', path: '/jewelry/knuckles', icon: faRing },
    { name: 'Watches', path: '/jewelry/watches', icon: faStopwatch },
    { name: 'earrings', path: '/jewelry/earrings', icon: faLayerGroup },
    { name: 'rings', path: '/jewelry/rings', icon: faRing },
  ];

  return (
    <>
      {/* TRIGGER BUTTON (Only visible when Nav is closed) */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed top-6 left-6 z-60 bg-yellow-500 text-black p-4 rounded-2xl shadow-[0_10px_20px_rgba(234,179,8,0.3)] hover:bg-yellow-400 transition-all active:scale-95"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </motion.button>
      )}

      <motion.div 
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={containerVariants}
        className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 shadow-2xl"
      >
        <div className="p-8 flex flex-col h-full relative">
          
          {/* CLOSE BUTTON */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-neutral-500 hover:text-yellow-500 transition-colors p-2"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {/* Brand Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-24 flex flex-col bg-linear-to-b from-neutral-800 to-neutral-950 border border-neutral-700/50 justify-center rounded-3xl mb-12 items-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <h1 className="text-2xl font-bold italianno-bold bg-linear-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
              Glitz Aura
            </h1>
            <span className="text-[9px] tracking-[0.4em] uppercase text-neutral-500 font-black mt-1">Luxury Attire</span>
          </motion.div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2 flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-black mb-4 ml-2">Catalogue</p>
            
            {jewelryLinks.map((link) => (
              <motion.div key={link.name} variants={itemVariants}>
                <Link 
                  to={link.path} 
                  className="flex items-center space-x-4 p-3 rounded-xl transition-all group relative hover:bg-white/5"
                >
                  {/* Hover Indicator Line */}
                  <div className="absolute left-0 w-1 h-0 bg-yellow-500 group-hover:h-1/2 transition-all duration-300 rounded-r-full" />
                  
                  <div className="w-8 flex justify-center">
                    <FontAwesomeIcon 
                      icon={link.icon} 
                      className="text-neutral-500 group-hover:text-yellow-500 transition-colors text-lg" 
                    />
                  </div>
                  
                  <span className="text-sm font-medium text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                    {link.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Footer Link */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <Link to="/" className="flex items-center text-[10px] uppercase tracking-widest text-neutral-500 hover:text-yellow-500 transition-colors group">
              <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> 
              Main Gallery
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Background Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default GliteNavbar;
