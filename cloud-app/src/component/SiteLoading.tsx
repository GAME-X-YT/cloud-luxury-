// import { motion } from "framer-motion";

// const SiteLoading = () => {
//   return (
//     <motion.div 
//       initial={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//       className="fixed inset-0 z-100 bg-[#030303] flex flex-col items-center justify-center"
//     >
//       {/* Animated Logo or Branding */}
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
//         className="text-center"
//       >
//         <h1 className="text-4xl font-serif italic text-yellow-500 tracking-tighter">
//           Cloud <span className=" tangerine-regular">Luxury</span>
//         </h1>
//         <div className="mt-4 flex gap-1 justify-center">
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               animate={{ 
//                 height: [10, 20, 10],
//                 opacity: [0.3, 1, 0.3]
//               }}
//               transition={{ 
//                 duration: 1, 
//                 repeat: Infinity, 
//                 delay: i * 0.2 
//               }}
//               className="w-1 bg-yellow-600 rounded-full"
//             />
//           ))}
//         </div>
//       </motion.div>

//       {/* Subtle Progress Text */}
//       <motion.p 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="absolute bottom-12 text-[10px] text-neutral-600 uppercase tracking-[0.5em]"
//       >
//         Initializing Luxury Suite
//       </motion.p>
//     </motion.div>
//   );
// };

// export default SiteLoading;

import { motion } from "framer-motion";

const SiteLoading = () => {
  // Define the colors you want to cycle through
  const colorCycle = ["#b3881b", "#509954", "#3f43b5", "#1c396b"]; 

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-100 bg-[#030303] flex flex-col items-center justify-center"
    >
      <motion.div
        // 1. BOUNCE ANIMATION
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="text-center"
      >
        <motion.h1 
          // 2. COLOR CHANGE ANIMATION (Synced with bounce)
          animate={{ 
            color: colorCycle 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="text-5xl md:text-6xl font-serif italic tracking-tighter"
        >
          Cloud <span className="rochester-regular">Luxury</span>
        </motion.h1>

        {/* Animated Bar Indicator */}
        <div className="mt-6 flex gap-1.5 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                height: [10, 30, 10],
                backgroundColor: colorCycle
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.1 
              }}
              className="w-1 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* Subtle Progress Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 text-[10px] text-neutral-100 uppercase tracking-[0.5em] font-light"
      >
        Entering the Vault
      </motion.p>
    </motion.div>
  );
};

export default SiteLoading;