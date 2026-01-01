import { motion } from 'framer-motion';
import { Scale, Ban, ShoppingBag } from 'lucide-react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 

} from "@fortawesome/free-solid-svg-icons";

const Terms = () => {
    const rules = [
        { icon: <ShoppingBag size={20} />, title: "Orders", desc: "All orders are subject to availability and confirmation of the order price." },
        { icon: <Scale size={20} />, title: "Intellectual Property", desc: "The content, logos, and designs on this site are owned by Cloud Luxury." },
        { icon: <Ban size={20} />, title: "Prohibited Use", desc: "You may not use our products for any illegal or unauthorized purpose." },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl font-serif italic mb-12"
                >
                    Terms of Use
                </motion.h1>

                <div className="space-y-12">
                    {rules.map((rule, i) => (
                        <div key={i} className="border-b border-white/10 pb-8 group">
                            <div className="flex items-center gap-4 mb-4 text-yellow-500">
                                {rule.icon}
                                <h3 className="text-xl uppercase tracking-widest">{rule.title}</h3>
                            </div>
                            <p className="text-neutral-400 font-light leading-relaxed">{rule.desc}</p>
                        </div>
                    ))}
                </div>
             <div className="mt-auto pt-8 border-t border-white/5">
                <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Main Atelier
                </Link>
            </div>
            </div>
        </div>
    );
};

export default Terms;