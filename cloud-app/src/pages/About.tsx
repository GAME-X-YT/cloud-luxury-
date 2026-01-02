import { motion, useScroll, useTransform } from 'framer-motion'; // 1. Added useScroll and useTransform
import { useRef } from 'react'; // 2. Added useRef
import { FaGem, FaCloud, FaCrown } from 'react-icons/fa';

const AboutSection = () => {
  // 3. Create a reference to the page scroll
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 4. Define the 'scale' value: it starts at 1 and grows to 1.2 as you scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-black text-white py-20 px-6 overflow-hidden">
      
      {/* BACKGROUND IMAGE - Now scales correctly */}
      <motion.div style={{ scale }} className="fixed inset-0 opacity-40 z-0">
        <img 
          src="https://i.pinimg.com/1200x/6a/37/75/6a37750267ed11519dd4d34a76aadef4.jpg" 
          className="w-full h-full object-cover" 
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/80 to-[#050505]" />
      </motion.div> 
      
      {/* Animated Background Glows */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10 pt-20"
      >
        {/* Title Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-yellow-500 font-serif text-sm tracking-[0.5em] uppercase mb-4">Our Legacy</h2>
          <h1 className="text-5xl md:text-7xl font-bold italic font-serif bg-linear-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
            Cloud Luxury
          </h1>
        </motion.div>

        {/* The Story Cards */}
        <div className="grid gap-12">
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/40 backdrop-blur-xl border border-yellow-600/20 p-8 rounded-3xl shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaCloud className="text-yellow-500 text-3xl" />
              <h3 className="text-2xl font-semibold cinzel-regular">The Spark</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg italic tracking-wide">
              "It began in the mist of the high-altitude peaks, where the air is thin and the vision is clear. 
              We realized that luxury isn't just about what you wear; it's about the feeling of being 
              above the noise."
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:row gap-8 items-center bg-black/30 p-8 rounded-3xl border border-white/5"
          >
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-yellow-500 flex items-center gap-2 cinzel-regular">
                <FaGem /> Unmatched Quality
              </h3>
              <p className="text-gray-400 font-light">
                Every piece in our collection is hand-vetted. Our inspiration comes from the 
                timeless architecture of European palaces mixed with the sleek, modern lines of 
                private jets.
              </p>
            </div>
            <div className="w-full md:w-64 h-64 bg-yellow-900/10 rounded-[40px] border-2 border-yellow-600/30 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all duration-700 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                <FaCrown className="text-6xl text-yellow-600" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;