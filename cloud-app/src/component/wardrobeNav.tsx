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
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, faGem, faShirt, faCloud, faStopwatch, 
  faShoePrints, faUserFriends, faLayerGroup, faTshirt, 
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CollectNavbar = () => {

  // On small screens we start closed, on big screens we start open
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1024);
  
  const navItems = [
    { name: 'Shoes', path: '/shoes', icon: faShoePrints },
    { name: 'Fall Clothes', path: '/fall-clothes', icon: faLayerGroup },
    { name: 'Jewelry', path: '/jewelry', icon: faGem },
    { name: 'T-Shirt', path: '/Tshirt', icon: faTshirt },
    { name: 'Baggy Jeans', path: '/baggy-jeans', icon: faShirt },
    { name: 'Watches', path: '/watches', icon: faStopwatch },
    { name: 'Shorts', path: '/shorts', icon: faShirt },
    { name: 'Couples Outfit', path: '/couples-outfit', icon: faUserFriends },
    { name: 'Hoodie', path: '/hoodie', icon: faCloud },
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
      <>
        {/* MOBILE TRIGGER - Only shows when Nav is closed OR on small screens */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-6 left-6 z-100 bg-slate-900 border border-white/10 text-white p-3 rounded-xl lg:hidden hover:bg-purple-600 transition-all"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* DARK OVERLAY - Only shows on mobile to dim the background */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />

              <motion.div 
                key="sidebar"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
                className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white flex flex-col z-50 border-r border-white/10"
              >
                <div className="p-8 h-full flex flex-col">
                  {/* Close Button inside Nav for Desktop/Mobile ease */}
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white lg:hidden"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>

                  {/* Brand Logo */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="h-16 flex bg-linear-to-br from-purple-600 to-indigo-700 justify-center rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.3)] items-center mb-10 mt-4 lg:mt-0"
                  >
                    <h1 className="text-[14px] font-black flex items-center space-x-3">
                      <FontAwesomeIcon icon={faCloud} className="animate-bounce text-xs"/>
                      <span>CLOUD COLLECTION</span>
                    </h1>
                  </motion.div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-1 overflow-y-auto no-scrollbar flex-1">
                    <Link 
                      to="/" 
                      onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                      className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-xl transition-all mb-4 text-gray-400 hover:text-white"
                    >
                      <FontAwesomeIcon icon={faHome} />
                      <span className="font-semibold">Back to Home</span>
                    </Link>

                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-2">Categories</p>
                    
                    {navItems.map((item) => (
                      <motion.div key={item.name} variants={itemVariants}>
                        <Link 
                          to={item.path} 
                          onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 hover:bg-purple-500/10 rounded-xl transition-all group border border-transparent hover:border-purple-500/30"
                        >
                          <div className="w-5 flex justify-center">
                            <FontAwesomeIcon icon={item.icon} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <span className="text-sm font-medium text-gray-400 group-hover:text-white">
                            {item.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] text-gray-500 text-center tracking-widest">Premium Selection</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  };

export default CollectNavbar;

