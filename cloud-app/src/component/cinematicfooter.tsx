import { motion } from 'framer-motion';

const CinematicFooter = () => {
  const footerLinks = [
    { title: "collections", items: ["Hoodies", "T-shirts", "Accessories", "Shoes", "MORE"] },
    { title: "SITE", items: ["Our Story", "Blog", "wardrobe", "Contact", "App info"] },
    { title: "Legal", items: ["Privacy Policy", "Terms of Use", "help center"] }
  ];

  return (
    <footer className="relative w-full bg-[#131320] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* 1. MASSIVE BACKGROUND TEXT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
        <motion.h1 
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 20, opacity: 0.03 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-[28vw] font-black leading-none tracking-tighter uppercase"
        >
          CLOUD 
        </motion.h1>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          
          {/* 2. BRAND IDENTITY */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-2 md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://i.pinimg.com/1200x/f9/7d/21/f97d2169bf378145eb12e3e4cc811dfc.jpg" 
                className="w-10 h-10 rounded-full border border-white/20"
                alt="Logo"
              />
              <span className="text-sm tracking-[0.3em] font-light">CLOUDLUXURY</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-[0.2em] font-light max-w-xs">
              Redefining luxury through intentional design and atmospheric aesthetics.
            </p>
          </motion.div>

          {/* 3. LINK COLUMNS */}
          {footerLinks.map((column, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * idx }}
              className="flex flex-col gap-6"
            >
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.items.map((item, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      className="text-[12px] text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-widest relative group inline-block"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 4. FINAL BOTTOM BAR */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="text-[9px] tracking-[0.4em] text-gray-600 uppercase satisfy-regular">
            © 2026 CLOUD LUXURY. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex gap-10">
            {['Instagram', 'Tiktok', 'Youtube'].map((social, i) => (
              <a key={i} href="#" className="text-[9px] tracking-[0.3em] text-gray-500 hover:text-white uppercase transition-colors">
                {social}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default CinematicFooter;