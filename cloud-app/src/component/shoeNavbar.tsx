import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { 
  Menu,
   X,
  Briefcase, 
  Footprints, 
  Users, 
  Flower2, 
  ShoppingBag, 
  Trophy, 
  GraduationCap 
} from "lucide-react";
// import { faSnowman  } from "@fortawesome/free-solid-svg-icons";

// The data for your sub-categories
const shoeLinks = [
  { name: 'Office Wear', slug: 'office-wear', icon: Briefcase },
  { name: 'Sneakers', slug: 'sneakers', icon: Footprints },
  { name: 'Unisex', slug: 'unisex', icon: Users },
  { name: 'Heels', slug: 'heels', icon: ShoppingBag },
  { name: 'Ladies Flats', slug: 'ladies-flats', icon: Flower2 },
  { name: 'Loafers', slug: 'loafers', icon: ShoppingBag },
  { name: 'Sport', slug: 'sport', icon: Trophy },
  { name: 'School', slug: 'school', icon: GraduationCap },
];

interface NavProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const ShoeNavbar: React.FC<NavProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* 1. FLOATING TOGGLE BUTTON (Visible when menu is closed) */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed left-6 top-6 z-60 p-4 bg-yellow-500 text-black rounded-2xl shadow-2xl hover:scale-110 transition-transform"
        >
          <Menu size={20} strokeWidth={3} />
        </motion.button>
      )}

      {/* 2. THE MAIN SIDEBAR */}
      <motion.nav 
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -256, // Slides the whole bar off-screen
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 bg-[#050505] border-r border-white/5 z-50 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="p-8 h-full flex flex-col">
          {/* HEADER WITH CLOSE ICON */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-yellow-500 font-black text-[10px] tracking-[0.4em] uppercase">
              Footwear Menu
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-white p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* NAV LINKS */}
          <ul className="space-y-4 flex-1">
            {shoeLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.slug}>
                  <Link 
                    to={`/shoes/${link.slug}`} 
                    target="_blank" 
                    className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-all py-2"
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-medium tracking-wide group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto pt-8 border-t border-white/5">
            <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Main store
            </Link>
          </div>

          {/* OPTIONAL BOTTOM FOOTER */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest text-center">
              Premium Collection 2025
            </p>
          </div>
        </div>
      </motion.nav>

      {/* 3. BACKGROUND OVERLAY (Closes menu when clicking outside) */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
        />
      )}
    </>
  );
};

export default ShoeNavbar;