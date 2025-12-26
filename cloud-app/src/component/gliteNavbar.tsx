// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faArrowCircleRight, faShirt, faCloud } from "@fortawesome/free-solid-svg-icons";


// const gliteNavbar = () => {
//   return (
//     <div className="h-auto w-60 bg-gray-900 text-white flex flex-col p-6">

//         <div className="h-16 flex bg-gray-800 justify-center rounded-3xl mb-10 items-center italianno-bold">
//             <h1 className="text-2xl font-bold flex items-center space-x-2 italianno-bold">
//               {/* <FontAwesomeIcon icon={faCloud} /> */}
//               Glitz Aura
//             </h1>
//          </div>
         
//       <nav className="flex flex-col space-y-4">
//         <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
//           <FontAwesomeIcon icon={faHome} />
//           <span>Home</span>
//         </Link>

//         <Link to="/collections/hoodies" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
//           <FontAwesomeIcon icon={faArrowCircleRight} />
//           <span>Hoodies</span>
//         </Link>

//         <Link to="/collections/tshirts" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
//           <FontAwesomeIcon icon={faShirt} />
//           <span>T-Shirts</span>
//         </Link>

//         <Link to="/collections/jackets" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
//           <FontAwesomeIcon icon={faCloud} />
//           <span>Jackets</span>
//         </Link>

//         <Link to="/shoes" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
//           <FontAwesomeIcon icon={faCloud} />
//           <span>shoes</span>
//         </Link>
//       </nav>

//       <div className="mt-auto">
//         <Link to="/" className="text-gray-300 hover:text-white underline">
//           ← Back to Home
//         </Link>
//       </div>

//     </div>
//   );
// };

// export default gliteNavbar;



import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faArrowCircleRight, 
  faShirt, 
  faCloud, 
  // faSparkles, 
  faGem 
} from "@fortawesome/free-solid-svg-icons";

const GliteNavbar = () => {
  // Animation Variants for the staggered entrance
  const containerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: faHome },
    { name: "Hoodies", path: "/collections/hoodies", icon: faArrowCircleRight },
    { name: "T-Shirts", path: "/collections/tshirts", icon: faShirt },
    { name: "Jackets", path: "/collections/jackets", icon: faCloud },
    { name: "Shoes", path: "/shoes", icon: faGem }, // Using Gem for that 'Glitz' feel
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 shadow-2xl"
    >
      <div className="p-8 flex flex-col h-full">
        
        {/* Brand Logo - The "Glitz" Section */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="h-20 flex flex-col bg-gradient-to-b from-neutral-800 to-neutral-950 border border-neutral-700 justify-center rounded-2xl mb-12 items-center relative overflow-hidden group"
        >
          {/* Subtle gold glow effect on hover */}
          <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
          <h1 className="text-3xl font-bold italianno-bold bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
            Glitz Aura
          </h1>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 -mt-1">Luxury Attire</span>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 flex-1">
          <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-4 ml-2">Catalogue</p>
          
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={itemVariants}>
              <Link 
                to={link.path} 
                className="flex items-center space-x-4 p-3 rounded-xl transition-all group relative hover:bg-white/[0.03]"
              >
                {/* Active Indicator (vertical line) */}
                <div className="absolute left-0 w-1 h-0 bg-yellow-500 group-hover:h-1/2 transition-all duration-300 rounded-r-full" />
                
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className="text-neutral-500 group-hover:text-yellow-500 transition-colors w-5" 
                />
                <span className="text-sm font-medium text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                  {link.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <Link to="/" className="flex items-center text-xs text-neutral-500 hover:text-white transition-colors group italic">
            <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> 
            Return to Store
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GliteNavbar;