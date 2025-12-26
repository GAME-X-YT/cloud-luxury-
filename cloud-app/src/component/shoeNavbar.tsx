import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ShoppingBag, LogIn, Tag, BookOpen } from "lucide-react";
// import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";


const shoeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navRef = useRef<HTMLDivElement>(null);

  // hide nav on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

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

  // close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const [showSearch, setShowSearch] = useState(false);


  return (
    <motion.nav
      ref={navRef}
      className={`
        fixed left-1/2 -translate-x-1/2 
        w-[92%] md:w-[80%] 
        mt-4
        backdrop-blur-lg bg-white/20 
        shadow-lg rounded-2xl
        transition-all duration-300
      `}
      initial={{ y: -100 }}
      animate={{ y: showNavbar ? 0 : -150 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="w-full px-4 py-3 flex justify-between items-center">

        

        {/* Logo */}
       <div className="flex items-center space-x-3">
          {/* <motion.img
            src={logo}
            alt="Logo"
            className="rounded-full w-12 h-12 cursor-pointer"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          /> */}
         <span className="text-xl tangerine-regular 
          text-gray-800 lg:inline">
          shoe collections
         </span>
       </div>

                                  {/* Search Bar */}
      <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />

                                                        {/* Desktop Menu */}

        <ul className="hidden md:flex space-x-7 text-neutral-700 font-semibold items-center">

            <li className="flex items-center gap-1">
              <Home size={20} />
              <Link to="/">Home</Link>
            </li>

            <li className="flex items-center gap-1">
              <ShoppingBag size={20} />
              <Link to="/shop">Men shoes</Link>
            </li>

            <li className="flex items-center gap-1">
              <Tag size={20} />
              <Link to="/Wardrobe">Ladies shoes</Link>
            </li>
            
            <li className="flex items-center gap-1">
              <BookOpen size={20} />
              <Link to="/blog">Blog</Link>
            </li>

            <li className="flex items-center gap-1">
              <LogIn size={20} />
              <Link to="/signin">copules shoes</Link>
            </li>
          </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neutral-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/20 backdrop-blur-lg text-black text-center rounded-b-2xl"
        >
          <ul className="flex flex-col items-center py-4 space-y-4">

            <li className="flex items-center gap-2">
              <Home size={20} />
              <Link to="/">Home</Link>
            </li>

            <li className="flex items-center gap-2">
              <ShoppingBag size={20} />
              <Link to="/shop">Shop</Link>
            </li>

            <li className="flex items-center gap-1">
              <Tag size={20} />
              <Link to="/Wardrobe">wardrobe</Link>
            </li>

            <li className="flex items-center gap-2">
              <LogIn size={20} />
              <Link to="/signin">Sign In</Link>
            </li>

          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default shoeNavbar;
