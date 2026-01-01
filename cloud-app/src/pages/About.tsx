import { motion, type Variants } from 'framer-motion';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 

} from "@fortawesome/free-solid-svg-icons";

const About = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] 
            } 
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 px-6 overflow-hidden">
             <div className="mt-auto pt-8 border-t border-white/5">
                    <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Main Atelier
                    </Link>
                </div>
            <div className="max-w-6xl mx-auto">
                
                {/* HERO SECTION */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-2 gap-20 items-center mb-40"
                >
                    <motion.div variants={itemVariants}>
                        <motion.span 
                            initial={{ letterSpacing: "0.1em", opacity: 0 }}
                            animate={{ letterSpacing: "0.4em", opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="text-indigo-500 text-xs uppercase mb-6 block font-bold"
                        >
                            The Heritage
                        </motion.span>
                        
                        <h1 className="text-6xl font-light tracking-tighter mb-8 leading-[1.1]">
                            CURATED BY <br />
                            <motion.span 
                                initial={{ clipPath: "inset(0 100% 0 0)" }}
                                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="font-serif italic text-7xl text-neutral-500 inline-block"
                            >
                                Arinze
                            </motion.span>
                        </h1>
                        
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8 font-light max-w-md">
                            Cloud Luxury was born from a singular vision: that true exclusivity cannot be found on a shelf. It must be hunted, verified, and delivered with surgical precision.
                        </p>
                        
                        <div className="border-l border-indigo-500/50 pl-6 py-2">
                            <p className="text-neutral-500 text-sm italic font-light">
                                "We don't sell products. We sell the silence that comes with knowing you have the best."
                            </p>
                        </div>
                    </motion.div>

                    {/* IMAGE ANIMATION */}
                    <motion.div 
                        initial={{ scale: 1.2, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative aspect-3/4 group cursor-none"
                    >
                        <div className="absolute inset-0 border border-indigo-500/20 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                        <div className="relative h-full w-full overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
                            <img 
                                src="https://i.pinimg.com/736x/d8/4a/98/d84a98ae6f56f83cc338cee4784273ff.jpg" 
                                alt="Luxury" 
                                className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-[3s]"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* STATS / VALUES SECTION */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-16 border-t border-white/5 pt-24 pb-40"
                >
                    {[
                        { title: "Authentication", desc: "Every thread is inspected under 40x magnification in our Zurich vault." },
                        { title: "Sourcing", desc: "Private channels with houses in Milan and Paris that don't exist to the public." },
                        { title: "Discretion", desc: "Your data is encrypted. Your delivery is unmarked. Your status is silent." }
                    ].map((val, i) => (
                        <motion.div 
                            key={i}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="overflow-hidden mb-6">
                                <motion.h3 
                                    className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-bold"
                                    whileHover={{ x: 10 }}
                                >
                                    0{i+1} // {val.title}
                                </motion.h3>
                            </div>
                            <p className="text-sm text-neutral-400 font-light leading-loose group-hover:text-white transition-colors duration-500">
                                {val.desc}
                            </p>
                            <motion.div 
                                className="h-px bg-indigo-500 mt-6 w-0 group-hover:w-full transition-all duration-700"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* FINAL CALL TO ACTION */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="pb-40 text-center"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="inline-block"
                    >
                        <h2 className="text-2xl font-serif italic text-neutral-500">
                            The sky is not the limit. It is the beginning.
                        </h2>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;