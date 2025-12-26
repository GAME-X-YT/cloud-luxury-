// import lady from '../assets/lady.png';
// import { useState } from 'react';
// import { motion, type Variants } from 'framer-motion';
// import { 
//   FaTelegramPlane, 
//   FaWhatsapp, 
//   FaInstagram, 
//   FaTiktok, 
//   FaYoutube 
// } from 'react-icons/fa'; // Make sure to: npm install react-icons

// const CinematicFinalSection = () => {

//     const sentence = "luxury stylish designs made for you";
//   const words = sentence.split(" ");

//   const [isHovered, setIsHovered] = useState(false);

//   // Social Media Data
//   const socials = [
//     { icon: <FaTelegramPlane />, link: "#", color: "hover:text-blue-400" },
//     { icon: <FaWhatsapp />, link: "#", color: "hover:text-green-400" },
//     { icon: <FaInstagram />, link: "#", color: "hover:text-pink-400" },
//     { icon: <FaTiktok />, link: "#", color: "hover:text-white" },
//     { icon: <FaYoutube />, link: "#", color: "hover:text-red-500" },
//   ];

//   const socialContainer: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 1.5 },
//     },
//   };

//   const socialItem: Variants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 },
//   };

//   // Define the two images (Front view and Back/Detail view)
//   const img1 = "https://i.pinimg.com/736x/41/a4/81/41a48107f24c90ed277d9313b9d77eb9.jpg"; // Main Fashion
//   const img2 = "https://i.pinimg.com/736x/09/c9/6c/09c96c855d654655317d6ef2b7de1902.jpg"; // Hover Fashion
//   // const centerHero = "https://i.pinimg.com/736x/e6/b2/16/e6b2166dd7b1bf22658efa22baaf9406.jpg"; // The big background image

//   // Container variants to manage the staggered timing
// const container: Variants = {
//   hidden: { opacity: 0 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     transition: { staggerChildren: 0.12, delayChildren: 0.4 * i },
//   }),
// };
//   // Individual word variants
//   const child: Variants = {
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//     hidden: {
//       opacity: 0,
//       y: 20,
//     },
//   };

  
//   return (
//     /* Gradient Background: Top color to Bottom color */
//     <section className="relative w-full h-screen bg-linear-to-b from-gray-900 to-[#1e1720e9] overflow-hidden p-10">
      
//     <motion.div 
//         initial={{ scale: 1.1, opacity: 0 }}
//         whileInView={{ scale: 1, opacity: 0.6 }} // Lower opacity so text remains readable
//         transition={{ duration: 1.5, ease: "easeOut" }}
//         className="absolute inset-0 z-0 flex justify-center items-center"
//       >
//         <img 
//           src={lady} 
//           alt="Hero Fashion" 
//           className="w-full h-full object-contain md:max-w-9xl" 
//         />

//         {/* Vignette Overlay to help text stand out */}
//         <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-30" />
//       </motion.div>

//       {/* 1. Cloud Logo: Slides in AND then moves Left/Right continuously */}
//       <motion.div
//         initial={{ x: -100, opacity: 0 }}
//         whileInView={{ 
//           x: [-5, 5, -5], // This creates the horizontal "sway"
//           opacity: 1 
//         }}
//         viewport={{ once: true }}
//         transition={{ 
//           // Entrance animation settings
//           opacity: { duration: 0.8 },
//           // Looping sway animation settings
//           x: {
//             duration: 3, // How long one full sway takes
//             repeat: Infinity, // Loop forever
//             ease: "easeInOut", // Smooth slow-down at the edges
//           }
//         }}
//         className="fixed top-10 left-10 z-50" // Changed to fixed/absolute to ensure it stays in the corner
//       >
//         <img 
//           src="https://i.pinimg.com/1200x/f9/7d/21/f97d2169bf378145eb12e3e4cc811dfc.jpg" 
//           alt="Cloud Logo" 
//           className="w-16 h-16 opacity-80 border border-white/20 rounded-full object-cover shadow-lg"
//         />
//       </motion.div>

//      <motion.button
//         initial={{ x: 100, opacity: 0 }}
//         whileInView={{ x: 0, opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         onClick={() => window.location.href = '/wardrobe'}
//         className="absolute top-10 right-10 px-8 py-2 border border-slate-900 rounded-full font-medium tracking-wide overflow-hidden group"
//         >
//         {/* The "Closing In" Background Layer */}
//         <motion.div
//             initial={{ x: "-100%" }} // Starts hidden to the left
//             whileHover={{ x: 0 }}    // Slides in to cover the background
//             transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }} // Smooth "slow close"
//             className="absolute inset-0 bg-slate-900 z-0"
//         />

//         {/* The Button Text */}
//         <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
//             WARDROBE
//         </span>
//         </motion.button>

//      {/* 3. Word-by-Word Text Animation */}
//       <div className="flex justify-center w-full mt-48">
//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="flex flex-wrap justify-center gap-x-4 gap-y-2"
//         >
//           {words.map((word, index) => (
//             <motion.span
//               variants={child}
//               key={index}
//               className={`text-3xl md:text-5xl cinzel-regular tracking-tight ${
//                 word === "designs" ? "italianno-bold text-[#cbd2ecf0] opacity-90" : "bg-linear-to-r from-purple-900 via-slate-400 to-[#049882f0] bg-clip-text text-transparent"
//                 }`}
//             >
//               {word}
//             </motion.span>
//           ))}
//         </motion.div>
//       </div>

//             <motion.div 
//         //  Slide from bottom to top on scroll
//         initial={{ y: 200, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ 
//             y: { duration: 1, ease: "easeOut" },
//             opacity: { duration: 0.8 }
//         }}
//         className="absolute left-20 bottom-20 w-64 h-96 z-20"
//         >
//         {/*  The Constant Bouncing Animation */}
//         <motion.div
//             animate={{ y: [0, -15, 0] }}
//             transition={{ 
//             duration: 4, 
//             repeat: Infinity, 
//             ease: "easeInOut" 
//             }}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
//         >
//             {/* Image 1 (Primary) */}
//             <motion.img
//             src={img1}
//             alt="Luxury Fashion"
//             animate={{ opacity: isHovered ? 0 : 1 }}
//             transition={{ duration: 0.4 }}
//             className="absolute inset-0 w-full h-full object-cover"
//             />

//             {/* Image 2 (Secondary - Shows on Hover) */}
//             <motion.img
//             src={img2}
//             alt="Luxury Fashion Detail"
//             animate={{ opacity: isHovered ? 1 : 0 }}
//             transition={{ duration: 0.4 }}
//             className="absolute inset-0 w-full h-full object-cover"
//             />
            
//             {/* Subtle Overlay */}
//             <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors duration-300" />
//         </motion.div>
//         </motion.div>

//       {/* 4. Social Media Icons with Staggered Fade-In */}

//       <motion.div 
//         variants={socialContainer}
//         initial="hidden"
//         whileInView="visible"
//         className="absolute right-10 bottom-10 z-40 flex flex-col items-center gap-6"
//       >
//         {/* Decorative Vertical Line */}
//         <motion.div 
//           initial={{ height: 0 }}
//           whileInView={{ height: 80 }}
//           transition={{ duration: 1, delay: 1 }}
//           className="w-px bg-linear-to-b from-transparent via-white/50 to-transparent mb-2"
//         />

//         {socials.map((social, index) => (
//           <motion.a
//             key={index}
//             href={social.link}
//             variants={socialItem}
//             whileHover={{ scale: 1.3, rotate: 5 }}
//             className={`text-white/50 text-2xl transition-colors duration-300 ${social.color}`}
//           >
//             {social.icon}
//           </motion.a>
//         ))}

//         <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] vertical-text mt-4 rotate-180 [writing-mode:vertical-lr]">
//           Follow the Cloud
//         </p>
//       </motion.div>
     
//     </section>
//   );
// };

// export default CinematicFinalSection;



import lady from '../assets/lady.png';
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  FaTelegramPlane, 
  FaWhatsapp, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube 
} from 'react-icons/fa';

const CinematicFinalSection = () => {
  const sentence = "luxury stylish designs made for you";
  const words = sentence.split(" ");
  const [isHovered, setIsHovered] = useState(false);

  const socials = [
    { icon: <FaTelegramPlane />, link: "#", color: "hover:text-blue-400" },
    { icon: <FaWhatsapp />, link: "#", color: "hover:text-green-400" },
    { icon: <FaInstagram />, link: "#", color: "hover:text-pink-400" },
    { icon: <FaTiktok />, link: "#", color: "hover:text-white" },
    { icon: <FaYoutube />, link: "#", color: "hover:text-red-500" },
  ];

  const socialContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 1.5 },
    },
  };

  const socialItem: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const img1 = "https://i.pinimg.com/736x/41/a4/81/41a48107f24c90ed277d9313b9d77eb9.jpg"; 
  const img2 = "https://i.pinimg.com/736x/09/c9/6c/09c96c855d654655317d6ef2b7de1902.jpg";

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <section className="relative w-full h-screen bg-linear-to-b from-gray-900 to-[#1e1720e9] overflow-hidden p-6 md:p-10 flex flex-col items-center justify-center">
      
      {/* BACKGROUND IMAGE - Responsive Scaling */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none"
      >
        <img 
          src={lady} 
          alt="Hero Fashion" 
          className="w-full h-full object-cover md:object-contain scale-125 md:scale-100" 
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-40" />
      </motion.div>

      {/* LOGO - Stays top left */}
              {/* 1. Cloud Logo: Slides in from the Left and stays ONLY in this section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ 
            x: [-5, 5, -5], // The horizontal "sway"
            opacity: 1 
          }}
          viewport={{ once: true }} // Only triggers the entrance once
          transition={{ 
            opacity: { duration: 0.8 },
            x: {
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
            }
          }}
          // "absolute" makes it stay within this section only
          className="absolute top-10 left-10 z-50" 
        >
          <img 
            src="https://i.pinimg.com/1200x/f9/7d/21/f97d2169bf378145eb12e3e4cc811dfc.jpg" 
            alt="Cloud Logo" 
            className="w-16 h-16 opacity-80 border border-white/20 rounded-full object-cover shadow-lg"
          />
        </motion.div>

      {/* WARDROBE BUTTON - Stays top right */}
      <motion.button
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        className="absolute top-6 right-6 md:top-10 md:right-10 px-4 py-1.5 md:px-8 md:py-2 border border-white/20 rounded-full font-medium tracking-wide overflow-hidden group z-50 bg-black/20 backdrop-blur-sm"
      >
        <motion.div initial={{ x: "-100%" }} whileHover={{ x: 0 }} className="absolute inset-0 bg-slate-800 z-0" />
        <span className="relative z-10 transition-colors duration-500 group-hover:text-blue-300 text-xs md:text-sm text-white">
            WARDROBE
        </span>
      </motion.button>

      {/* MAIN TEXT - Responsive Font Size */}
      <div className="relative z-20 w-full max-w-4xl px-4">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 gap-y-1 md:gap-y-2"
        >
          {words.map((word, index) => (
            <motion.span
              variants={child}
              key={index}
              className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl cinzel-regular tracking-tight ${
                word === "designs" ? "italianno-bold text-[#cbd2ecf0] opacity-90" : "bg-linear-to-r from-purple-400 via-slate-200 to-[#049882f0] bg-clip-text text-transparent drop-shadow-sm"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* HOVER IMAGE CARD - Hidden on very small screens, smaller on mobile */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="absolute left-6 bottom-6 md:left-20 md:bottom-20 w-32 h-48 md:w-64 md:h-96 z-20"
      >
        <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer border border-white/10"
        >
            <motion.img src={img1} animate={{ opacity: isHovered ? 0 : 1 }} transition={{ duration: 0.4 }} className="absolute inset-0 w-full h-full object-cover" />
            <motion.img src={img2} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </motion.div>

      {/* SOCIALS - Tucked into corner on mobile */}
      <motion.div 
        variants={socialContainer}
        initial="hidden"
        whileInView="visible"
        className="absolute right-6 bottom-6 md:right-10 md:bottom-10 z-40 flex flex-col items-center gap-4 md:gap-6"
      >
        <motion.div initial={{ height: 0 }} whileInView={{ height: 40 }} className="w-px bg-white/30 mb-2 hidden md:block" />
        {socials.map((social, index) => (
          <motion.a key={index} href={social.link} variants={socialItem} whileHover={{ scale: 1.2 }} className={`text-white/40 text-xl md:text-2xl transition-colors ${social.color}`}>
            {social.icon}
          </motion.a>
        ))}
        <p className="text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr] mt-2">
         CLOUD socials
        </p>
      </motion.div>
      
    </section>
  );
};

export default CinematicFinalSection;