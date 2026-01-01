import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, MapPin } from 'lucide-react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 

} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('sent'), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-light tracking-[0.2em] uppercase mb-4">Inquiries</h2>
                    <p className="text-neutral-500 text-sm">Response times are dictated by client tier status.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 mb-20">
                    <div className="text-center">
                        <Mail className="mx-auto mb-4 text-indigo-500" size={20} />
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500">Concierge</p>
                        <p className="text-sm">concierge@cloudluxury.com</p>
                    </div>
                    <div className="text-center">
                        <Globe className="mx-auto mb-4 text-indigo-500" size={20} />
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500">Press</p>
                        <p className="text-sm">private@arinze.global</p>
                    </div>
                    <div className="text-center">
                        <MapPin className="mx-auto mb-4 text-indigo-500" size={20} />
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500">Showroom</p>
                        <p className="text-sm">1er Arr., Paris</p>
                    </div>
                </div>

                <motion.form 
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto bg-white/2 border border-white/5 p-10 rounded-3xl backdrop-blur-sm"
                >
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-neutral-500">Full Name</label>
                            <input type="text" className="w-full bg-white/5 border-b border-white/10 py-2 outline-none focus:border-indigo-500 transition-colors text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-neutral-500">Order Ref (Optional)</label>
                            <input type="text" placeholder="CL-0000" className="w-full bg-white/5 border-b border-white/10 py-2 outline-none focus:border-indigo-500 transition-colors text-sm" />
                        </div>
                    </div>
                    <div className="space-y-2 mb-8">
                        <label className="text-[10px] uppercase tracking-widest text-neutral-500">Message</label>
                        <textarea rows={4} className="w-full bg-white/5 border-b border-white/10 py-2 outline-none focus:border-indigo-500 transition-colors text-sm resize-none" />
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-colors"
                    >
                        {status === 'idle' && "Submit Inquiry"}
                        {status === 'sending' && "Encrypting..."}
                        {status === 'sent' && "Received. Wait for us."}
                    </button>
                     <div className="mt-auto pt-8 border-t border-white/5">
                    <Link to="/" className="flex items-center text-[11px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors group">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Main Atelier
                    </Link>
                </div>
                </motion.form>
            </div>
        </div>
    );
};

export default Contact;