import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ShoppingBag, LogIn, Tag, BookOpen, Menu, X, Search } from "lucide-react";
import SearchBar from "./SearchBar";

const ShoeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

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

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Men Shoes", path: "/shop", icon: <ShoppingBag size={18} /> },
    { name: "Ladies Shoes", path: "/Wardrobe", icon: <Tag size={18} /> },
    { name: "Couples", path: "/signin", icon: <LogIn size={18} /> },
    { name: "Blog", path: "/blog", icon: <BookOpen size={18} /> },
  ];

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: showNavbar ? 0 : -120, x: "-50%" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="fixed left-1/2 z-50 w-[95%] max-w-6xl mt-5"
    >
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-3xl overflow-hidden">
        <div className="px-6 py-3 flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-indigo-600 bg-clip-text text-transparent tangerine-regular">
              Cloud Collections
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:text-purple-700 group"
                >
                  {link.icon}
                  {link.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-800 hover:bg-white/40 rounded-full transition-all"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-800 hover:bg-white/40 rounded-full transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Integrated SearchBar Container */}
        <AnimatePresence>
          {showSearch && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-4"
            >
              <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/20 bg-white/10"
            >
              <ul className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/40 text-gray-900 font-medium transition-all"
                    >
                      <span className="text-purple-700">{link.icon}</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default ShoeNavbar;