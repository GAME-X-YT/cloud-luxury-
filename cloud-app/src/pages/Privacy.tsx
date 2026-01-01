import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowLeft } from "@fortawesome/free-solid-svg-icons";



const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const sections = [
        {
            icon: <Eye className="w-5 h-5" />,
            title: "Information We Collect",
            content: "We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email, shipping address, and payment details."
        },
        {
            icon: <Lock className="w-5 h-5" />,
            title: "How We Protect Data",
            content: "We implement industry-standard encryption (SSL) to protect your personal data. Your payment information is processed through secure gateways and is never stored on our private servers."
        },
        {
            icon: <ShieldCheck className="w-5 h-5" />,
            title: "Third-Party Sharing",
            content: "Cloud Luxury does not sell your personal data. We only share information with trusted partners necessary to fulfill your orders (like shipping carriers) or improve our services."
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30">
            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
                    <h1 className="text-[20vw] font-black uppercase tracking-tighter leading-none">Privacy</h1>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Lock className="w-3 h-3 text-yellow-500" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-neutral-400">Secure Protocol</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-serif italic mb-6">Your Privacy is <br/> Our Priority</h2>
                    <p className="text-neutral-500 uppercase text-[10px] tracking-[0.5em]">Effective as of January 2026</p>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <section className="max-w-4xl mx-auto px-6 pb-32">
                <div className="grid gap-8">
                    {sections.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-500"
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-2xl bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed font-light">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- CLOSING NOTE --- */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-12 rounded-[3rem] bg-linear-to-b from-white/5 to-transparent border border-white/5 text-center"
                >
                    <FileText className="w-8 h-8 mx-auto mb-6 text-neutral-600" />
                    <p className="text-sm text-neutral-500 italic max-w-xl mx-auto mb-8">
                        "Luxury is nothing without trust. We handle your data with the same care we use to craft our collections."
                    </p>
                    <button 
                        onClick={() => navigate('/contact')}
                        className="px-10 py-4 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors"
                    >
                        Contact Legal Team
                    </button>
                    <div className="mt-auto pt-8 border-t border-white/5">
                        <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Main show
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;