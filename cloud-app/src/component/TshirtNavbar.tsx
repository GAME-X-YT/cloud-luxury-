// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faArrowLeft, 
//   faMaximize, 
//   faLayerGroup, 
//   faPalette,
//   faBars,
//   faTimes
// } from "@fortawesome/free-solid-svg-icons";

// interface NavProps {
//   isOpen: boolean;
//   setIsOpen: (val: boolean) => void;
// }

// const TshirtNavbar = ({ isOpen, setIsOpen }: NavProps) => {
//   const categories = [
//     { name: "All Essentials", path: "/collections/tshirts", icon: faLayerGroup },
//     { name: "Oversized Fit", path: "/collections/tshirts/oversized", icon: faMaximize },
//     { name: "Graphic Series", path: "/collections/tshirts/graphic", icon: faPalette },
//   ];

//   return (
//     <>
//       {/* Small Screen Toggle */}
//       {!isOpen && (
//         <button 
//           onClick={() => setIsOpen(true)} 
//           className="fixed top-6 left-6 z-60 text-white bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10 lg:hidden"
//         >
//           <FontAwesomeIcon icon={faBars} />
//         </button>
//       )}

//       <motion.div 
//         initial={false}
//         animate={{ x: isOpen ? 0 : -280 }}
//         transition={{ type: "spring", stiffness: 120, damping: 20 }}
//         className="fixed left-0 top-0 h-screen w-64 bg-[#080808] border-r border-white/5 flex flex-col z-50 shadow-2xl"
//       >
//         <div className="p-8 flex flex-col h-full">
          
//           {/* Internal Close Button (Mobile only) */}
//           <button onClick={() => setIsOpen(false)} className="lg:hidden absolute top-6 right-6 text-neutral-500">
//             <FontAwesomeIcon icon={faTimes} />
//           </button>

//           {/* Department Branding */}
//           <div className="mb-16">
//             <h1 className="text-xl font-light tracking-[0.2em] text-white uppercase">
//               cloud-urys <span className="text-yellow-500 font-bold">T-shirts</span>
//             </h1>
//             <div className="w-10 h-0.5 bg-yellow-500 mt-2" />
//           </div>

//           {/* Department Links */}
//           <nav className="flex-1 flex flex-col space-y-1">
//             <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mb-4">Fit & Style</p>
//             {categories.map((cat) => (
//               <Link 
//                 key={cat.name} 
//                 to={cat.path} 
//                 className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/3 group transition-all"
//               >
//                 <FontAwesomeIcon icon={cat.icon} className="text-neutral-700 group-hover:text-yellow-500 text-sm" />
//                 <span className="text-sm text-neutral-500 group-hover:text-white transition-colors">{cat.name}</span>
//               </Link>
//             ))}
//           </nav>

//           {/* Global Return */}
//           <div className="mt-auto pt-8 border-t border-white/5">
//             <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
//               <FontAwesomeIcon icon={faArrowLeft} className="mr-2 group-hover:-translate-x-1 transition-transform" />
//               Main Atelier
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default TshirtNavbar;




import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 
  faMaximize, 
  faLayerGroup, 
  faPalette,
  faBars,
  faTimes,
  faUser,
  faShoppingBag,
  faFileContract,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

interface NavProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const TshirtNavbar = ({ isOpen, setIsOpen }: NavProps) => {
  const categories = [
    { name: "All Essentials", path: "/collections/tshirts", icon: faLayerGroup },
    { name: "Oversized Fit", path: "/collections/tshirts/oversized", icon: faMaximize },
    { name: "Graphic Series", path: "/collections/tshirts/graphic", icon: faPalette },
  ];

  return (
    <>
      {/* Small Screen Toggle */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="fixed top-6 left-6 z-60 text-white bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10 lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}

      <motion.div 
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed left-0 top-0 h-screen w-64 bg-[#080808] border-r border-white/5 flex flex-col z-50 shadow-2xl"
      >
        <div className="p-8 flex flex-col h-full">
          
          <button onClick={() => setIsOpen(false)} className="lg:hidden absolute top-6 right-6 text-neutral-500">
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Department Branding */}
          <div className="mb-10">
            <h1 className="text-xl font-light tracking-[0.2em] text-white uppercase">
              cloud-urys <span className="text-yellow-500 font-bold">T-shirts</span>
            </h1>
            <div className="w-10 h-0.5 bg-yellow-500 mt-2" />
          </div>

          {/* User Actions: Profile & Cart */}
          <div className="flex gap-2 mb-10">
            <Link to="/profile" className="flex-1 flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-yellow-500/50 transition-all group">
              <FontAwesomeIcon icon={faUser} className="text-neutral-500 group-hover:text-yellow-500 mb-1 text-xs" />
              <span className="text-[10px] text-neutral-500 uppercase tracking-tighter">Profile</span>
            </Link>
            <Link to="/cart" className="flex-1 flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-yellow-500/50 transition-all group">
              <FontAwesomeIcon icon={faShoppingBag} className="text-neutral-500 group-hover:text-yellow-500 mb-1 text-xs" />
              <span className="text-[10px] text-neutral-500 uppercase tracking-tighter">Cart</span>
            </Link>
          </div>

          {/* Department Links */}
          <nav className="flex-1 flex flex-col space-y-1">
            <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mb-4">Fit & Style</p>
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                to={cat.path} 
                className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/3 group transition-all"
              >
                <FontAwesomeIcon icon={cat.icon} className="text-neutral-700 group-hover:text-yellow-500 text-sm" />
                <span className="text-sm text-neutral-500 group-hover:text-white transition-colors">{cat.name}</span>
              </Link>
            ))}
          </nav>

          {/* Legal & Contact */}
          <div className="space-y-4 mb-6">
            <Link to="/terms" className="flex items-center text-[10px] text-neutral-600 hover:text-white uppercase tracking-widest transition-colors group">
              <FontAwesomeIcon icon={faFileContract} className="mr-3 text-[8px]" />
              Terms of Use
            </Link>
            <Link to="/contact" className="flex items-center text-[10px] text-neutral-600 hover:text-white uppercase tracking-widest transition-colors group">
              <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-[8px]" />
              Contact Us
            </Link>
          </div>

          {/* Global Return */}
          <div className="pt-8 border-t border-white/5">
            <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Main Atelier
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TshirtNavbar;