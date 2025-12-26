// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faArrowCircleRight, faShirt, faCloud, faStopwatch, faShapes } from "@fortawesome/free-solid-svg-icons";


// const wardrobeNavbar = () => {
//   return (
//     <div className="h-auto w-60 bg-gray-900 text-white flex flex-col p-6">

//         <div className="h-16 flex bg-gray-800 justify-center rounded-3xl mb-10 items-center">
//             <h1 className="text-2xl font-bold flex items-center space-x-2">
//               <FontAwesomeIcon icon={faCloud} />
//               C.L.C
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
//           <FontAwesomeIcon icon={faShapes} />
//           <span>shoes</span>
//         </Link>

//         <Link to="/watchs" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
//           <FontAwesomeIcon icon={faStopwatch} />
//           <span>watches</span>
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

// export default wardrobeNavbar;




import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, faGem, faShirt, faCloud, faStopwatch, 
  faShoePrints, faUserFriends, faLayerGroup, faTshirt 
} from "@fortawesome/free-solid-svg-icons";

const CollectNavbar = () => {
  const navItems = [
    { name: 'Shoes', path: '/shoes', icon: faShoePrints },
    { name: 'Fall Clothes', path: '/fall-clothes', icon: faLayerGroup },
    { name: 'Jewelry', path: '/jewelry', icon: faGem },
    { name: 'T-Shirt', path: '/tshirts', icon: faTshirt },
    { name: 'Baggy Jeans', path: '/baggy-jeans', icon: faShirt },
    { name: 'Watches', path: '/watches', icon: faStopwatch },
    { name: 'Shorts', path: '/shorts', icon: faShirt },
    { name: 'Couples Outfit', path: '/couples-outfit', icon: faUserFriends },
    { name: 'Hoodie', path: '/hoodies', icon: faCloud },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white flex flex-col z-50 border-r border-white/10"
    >
      <div className="p-8 h-full flex flex-col">
        {/* Animated Brand Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="h-16 flex bg-gradient-to-br from-purple-600 to-indigo-700 justify-center rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.3)] items-center mb-10"
        >
          <h1 className="text-[16px] font-black cinzel-bold flex items-center space-x-4">
            <FontAwesomeIcon icon={faCloud} className="animate-bounce"/>
            <span>CLOUD COLLECTION</span>
          </h1>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-1 overflow-y-auto no-scrollbar flex-1">
          <Link to="/" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-xl transition-all mb-4 text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faHome} />
            <span className="font-semibold">Back to Home</span>
          </Link>

          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-2">Categories</p>
          
          {navItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Link 
                to={item.path} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 hover:bg-purple-500/10 rounded-xl transition-all group border border-transparent hover:border-purple-500/30"
              >
                <motion.div whileHover={{ rotate: 15 }} className="w-5 flex justify-center">
                  <FontAwesomeIcon icon={item.icon} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
                </motion.div>
                <span className="text-sm font-medium text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-transform">
                  {item.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Footer Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pt-6 border-t border-white/5"
        >
          <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">Premium Selection</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CollectNavbar;