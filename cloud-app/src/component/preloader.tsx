// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Preloader() {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     // 1. 🔒 LOCK SCROLL: Prevents user from scrolling while loading
//     document.body.style.overflow = "hidden";

//     const timer = setTimeout(() => {
//       setShow(false);
//       // 2. 🔓 UNLOCK SCROLL: Allows scrolling once loader is gone
//       document.body.style.overflow = "auto";
//     }, 3500); // 3.5 seconds for a premium feel

//     return () => {
//       clearTimeout(timer);
//       document.body.style.overflow = "auto"; // Cleanup
//     };
//   }, []);

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ 
//             y: "-100%", 
//             transition: { duration: 0.9, ease: [0.7, 0, 0.3, 1] } 
//           }}
//           className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-black text-white"
//         >
//           {/* Your Logo & Name Animation */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl font-light tracking-[0.7em] uppercase">
//               Cloud Luxury
//             </h1>
//             <motion.div 
//               initial={{ width: 0 }}
//               animate={{ width: "100%" }}
//               transition={{ duration: 2, delay: 0.5 }}
//               className="h-px bg-white/20 mt-4"
//             />
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Preloader() {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     const timer = setTimeout(() => {
//       setShow(false);
//       document.body.style.overflow = "auto";
//     }, 9000); 

//     return () => {
//       clearTimeout(timer);
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ 
//             y: "-100%", 
//             transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
//           }}
//           className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-black text-white"
//         >
//           <div className="flex flex-col items-center">
            
//             {/* --- YOUR LOGO --- */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
//               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//               transition={{ duration: 1.5, ease: "easeOut" }}
//               className="mb-8"
//             >
//               {/* Replace 'logo.png' with your actual file in the public folder */}
//               <img 
//                 src="/logo.png" 
//                 alt="Cloud Luxury Logo" 
//                 className="w-24 h-24 md:w-32 md:h-32 object-contain" 
//               />
//             </motion.div>

//             {/* --- YOUR BRAND NAME --- */}
//             <motion.h1
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.8 }}
//               className="text-2xl md:text-3xl font-extralight tracking-[0.8em] uppercase text-gray-200"
//             >
//               Cloud Luxury
//             </motion.h1>

//             {/* --- ELEGANT PROGRESS LINE --- */}
//             <motion.div 
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: "150px", opacity: 1 }}
//               transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
//               className="h-px bg-linear-to-r from-transparent via-white/40 to-transparent mt-6"
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Preloader() {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     const timer = setTimeout(() => {
//       setShow(false);
//       document.body.style.overflow = "auto";
//     }, 9000); // 9 second total duration

//     return () => {
//       clearTimeout(timer);
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ 
//             y: "-100%", 
//             transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
//           }}
//           className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-black text-white"
//         >
//           <div className="flex flex-col items-center">
            
//             {/* --- BOUNCING LOGO --- */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
//               animate={{ 
//                 opacity: 1, 
//                 scale: 1, 
//                 filter: "blur(0px)",
//                 // This creates the continuous bounce
//                 y: [0, -20, 0] 
//               }}
//               transition={{ 
//                 // Initial entrance duration
//                 opacity: { duration: 1.5 },
//                 scale: { duration: 1.5 },
//                 filter: { duration: 1.5 },
//                 // Bounce loop settings
//                 y: {
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }
//               }}
//               className="mb-8"
//             >
//               <img 
//                 src="/logo.png" 
//                 alt="Cloud Luxury Logo" 
//                 className="w-24 h-24 md:w-32 md:h-32 object-contain" 
//               />
//             </motion.div>

//             {/* --- BRAND NAME --- */}
//             <motion.h1
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.8 }}
//               className="text-2xl md:text-3xl font-extralight tracking-[0.8em] uppercase text-gray-200"
//             >
//               Cloud Luxury
//             </motion.h1>

//             {/* --- ELEGANT PROGRESS LINE --- */}
//             <motion.div 
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: "200px", opacity: 1 }}
//               transition={{ 
//                 duration: 7, // Stretches the line growth to fill the 9s wait
//                 delay: 1.2, 
//                 ease: "linear" 
//               }}
//               className="h-px bg-linear-to-r from-transparent via-white/40 to-transparent mt-6"
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }




// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Preloader() {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     // Force scroll to top on refresh
//     window.scrollTo(0, 0);
//     document.body.style.overflow = "hidden";

//     const timer = setTimeout(() => {
//       setShow(false);
//       document.body.style.overflow = "auto";
//     }, 9000); 

//     return () => {
//       clearTimeout(timer);
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <AnimatePresence mode="wait">
//       {show && (
//         <motion.div
//           key="preloader" // Added key for AnimatePresence
//           initial={{ opacity: 1 }}
//           exit={{ 
//             y: "-100%", 
//             transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
//           }}
//           // Changed z-10000 to z-[10000] for Tailwind compatibility
//           className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-black text-white"
//         >
//           <div className="flex flex-col items-center">
            
//             {/* --- BOUNCING LOGO --- */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
//               animate={{ 
//                 opacity: 1, 
//                 scale: 1, 
//                 filter: "blur(0px)",
//                 y: [0, -20, 0] 
//               }}
//               transition={{ 
//                 opacity: { duration: 1.5 },
//                 scale: { duration: 1.5 },
//                 filter: { duration: 1.5 },
//                 y: {
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }
//               }}
//               className="mb-8"
//             >
//               <img 
//                 src="/logo.png" 
//                 alt="Cloud Luxury Logo" 
//                 className="w-24 h-24 md:w-32 md:h-32 object-contain" 
//                 // Error handling: if image is missing, show a fallback
//                 onError={(e) => (e.currentTarget.style.display = 'none')} 
//               />
//             </motion.div>

//             {/* --- BRAND NAME --- */}
//             <motion.h1
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.8 }}
//               className="text-2xl md:text-3xl font-extralight tracking-[0.8em] uppercase text-gray-200"
//             >
//               Cloud Luxury
//             </motion.h1>

//             {/* --- ELEGANT PROGRESS LINE --- */}
//             <motion.div 
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: "200px", opacity: 1 }}
//               transition={{ 
//                 duration: 7, 
//                 delay: 1.2, 
//                 ease: "linear" 
//               }}
//               // Changed bg-linear-to-r to bg-gradient-to-r for compatibility
//               className="h-px bg-linear-to-r from-transparent via-white/40 to-transparent mt-6"
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }