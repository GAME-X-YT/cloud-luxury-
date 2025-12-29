// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Home, ShoppingBag, LogIn, Tag, BookOpen, User,  } from "lucide-react";
// import SearchBar from "./SearchBar";


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [, setIsScrolled] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const navRef = useRef<HTMLDivElement>(null);

//   // hide nav on scroll down
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setIsScrolled(currentScrollY > 50);

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setShowNavbar(false);
//         setIsOpen(false);
//       } else {
//         setShowNavbar(true);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (isOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   const [showSearch, setShowSearch] = useState(false);


//   return (
//     <motion.nav
//       ref={navRef}
//       className={`
//         fixed left-1/2 -translate-x-1/2 
//         w-[92%] md:w-[80%] 
//         mt-4
//         backdrop-blur-lg bg-white/20 
//         shadow-lg rounded-2xl
//         transition-all duration-300
//       `}
//       initial={{ y: -100 }}
//       animate={{ y: showNavbar ? 0 : -150 }}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//     >
//       <div className="w-full px-4 py-3 flex justify-between items-center">

        

//         {/* Logo */}
//        <div className="flex items-center space-x-3">
//           <motion.img
//             src="https://i.pinimg.com/1200x/f9/7d/21/f97d2169bf378145eb12e3e4cc811dfc.jpg"
//             alt="Logo"
//             className="rounded-full w-12 h-12 cursor-pointer"
//             animate={{ y: [0, -6, 0] }}
//             transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//           />
//          <span className="text-xl tangerine-regular text-gray-800 hidden lg:inline">
//           Cloud Luxury
//          </span>
//        </div>

//                                   {/* Search Bar */}
//       <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />

//                                                         {/* Desktop Menu */}

//         <ul className="hidden md:flex space-x-7 text-neutral-700 font-semibold items-center">

//             <li className="flex items-center gap-1">
//               <Home size={20} />
//               <Link to="/">Home</Link>
//             </li>

//             <li className="flex items-center gap-1">
//               <ShoppingBag size={20} />
//               <Link to="/shop">Shop</Link>
//             </li>

//             <li className="flex items-center gap-1">
//               <Tag size={20} />
//               <Link to="/wardrobe">Wardrobe</Link>
//             </li>
            
//             <li className="flex items-center gap-1">
//               <BookOpen size={20} />
//               <Link to="/blog">Blog</Link>
//             </li>

//             <li className="flex items-center gap-1">
//               <LogIn size={20} />
//               <Link to="/signup">Sign In</Link>
//             </li>

//             <li className="flex items-center gap-1">
//               <User size={20} />
//               <Link to="/profile">Profile</Link>
//             </li>
//           </ul>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-neutral-700 text-2xl"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -15 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="md:hidden bg-white/20 backdrop-blur-lg text-black text-center rounded-b-2xl"
//         >
//           <ul className="flex flex-col items-center py-4 space-y-4">

//             <li className="flex items-center gap-2">
//               <Home size={20} />
//               <Link to="/">Home</Link>
//             </li>

//             <li className="flex items-center gap-2">
//               <ShoppingBag size={20} />
//               <Link to="/shop">Shop</Link>
//             </li>

//             <li className="flex items-center gap-1">
//               <Tag size={20} />
//               <Link to="/Wardrobe">Wardrobe</Link>
//             </li>

//             <li className="flex items-center gap-2">
//               <LogIn size={20} />
//               <Link to="/signin">Sign In</Link>
//             </li>

//              <li className="flex items-center gap-1">
//               <User size={20} />
//               <Link to="/profile">Profile</Link>
//             </li>

//           </ul>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// };

// export default Navbar;







  import { useState, useEffect, useRef } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Link, useLocation } from "react-router-dom";
  import { Home, ShoppingBag, LogIn, Tag, BookOpen, User, Menu, X, Search } from "lucide-react";
  import SearchBar from "./SearchBar";

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation(); // To track active page
    const navRef = useRef<HTMLDivElement>(null);

    // Hide nav on scroll down, show on scroll up
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setShowNavbar(false);
          setIsOpen(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Close mobile menu on click outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (isOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Inside your Navbar component

// Add this useEffect to handle closing search on scroll
useEffect(() => {
  const handleScrollClose = () => {
    if (showSearch) {
      setShowSearch(false);
      // If your SearchBar has its own internal 'suggestions' state, 
      // you might need to clear that too via a prop if necessary.
    }
  };

  if (showSearch) {
    window.addEventListener("scroll", handleScrollClose);
  }

  return () => window.removeEventListener("scroll", handleScrollClose);
}, [showSearch]);

    const navLinks = [
      { name: "Home", path: "/", icon: <Home size={18} /> },
      { name: "Shop", path: "/shop", icon: <ShoppingBag size={18} /> },
      { name: "Wardrobe", path: "/wardrobe", icon: <Tag size={18} /> },
      { name: "Blog", path: "/blog", icon: <BookOpen size={18} /> },
      { name: "Sign In", path: "/signup", icon: <LogIn size={18} /> },
      { name: "Profile", path: "/profile", icon: <User size={18} /> },
    ];

    return (
      <motion.nav
        ref={navRef}
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: showNavbar ? 0 : -120, x: "-50%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 z-100 w-[94%] max-w-7xl mt-4"
      >
        <div className="backdrop-blur-2xl bg-white/40 border border-white/50 shadow-2xl rounded-[2.5rem]">
          <div className="px-6 py-3 flex justify-between items-center">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <img
                  src="https://i.pinimg.com/1200x/f9/7d/21/f97d2169bf378145eb12e3e4cc811dfc.jpg"
                  alt="Logo"
                  className="rounded-full w-10 h-10 border-2 border-purple-500/30 group-hover:border-purple-500 transition-colors"
                />
              </motion.div>
              <span className="text-2xl font-bold tangerine-regular bg-linear-to-r from-gray-700 to-purple-900 bg-clip-text text-transparent hidden sm:inline">
                Cloud Luxury
              </span>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
                      ${location.pathname === link.path 
                        ? "text-purple-700 bg-white/60 shadow-sm" 
                        : "text-gray-700 hover:text-purple-600 hover:bg-white/30"}`}
                  >
                    {link.icon}
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 border-2 border-purple-400/20 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Action Area */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 text-gray-700 hover:bg-white/50 rounded-full transition-all"
              >
                <Search size={20} />
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 text-gray-700 hover:bg-white/50 rounded-full transition-all"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Dynamic Search Bar Component */}
          <AnimatePresence>
            {showSearch && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-4 border-t border-white/20 pt-4"
              >
                <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Slide-down Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden bg-white/10 border-t border-white/20 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-4 p-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/40 backdrop-blur-md shadow-sm border border-white/50 text-gray-800"
                    >
                      <span className="text-purple-600">{link.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    );
  };

  export default Navbar;