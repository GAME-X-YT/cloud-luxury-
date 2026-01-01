// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Plus, Minus, Search, MessageCircle, Package, ArrowRight, X } from 'lucide-react';

// const HelpCenter = () => {
//     // 1. States for Accordion, Chat, and Tracker
//     const [openIndex, setOpenIndex] = useState<number | null>(null);
//     const [isChatOpen, setIsChatOpen] = useState(false);
//     const [orderNumber, setOrderNumber] = useState("");
//     const [trackingResult, setTrackingResult] = useState<any>(null);
//     const [isSearching, setIsSearching] = useState(false);

//     const faqs = [
//         { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express takes 2-3." },
//         { q: "Can I return a luxury item?", a: "Yes, we accept returns within 14 days of delivery if tags are intact." },
//         { q: "Are the products authentic?", a: "Every item is certified and shipped with a physical certificate of authenticity." }
//     ];

//     const handleTrackOrder = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!orderNumber) return;
//         setIsSearching(true);
//         setTrackingResult(null);

//         // Simulated Luxury Tracking API Call
//         setTimeout(() => {
//             setIsSearching(false);
//             setTrackingResult({
//                 id: orderNumber,
//                 status: "In Transit",
//                 location: "London Distribution Hub",
//                 estDelivery: "Jan 05, 2026",
//                 progress: 65
//             });
//         }, 1500);
//     };

//     return (
//         <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
//             <div className="max-w-3xl mx-auto">
                
//                 {/* --- SEARCH & TRACKER SECTION --- */}
//                 <div className="text-center mb-16">
//                     <h2 className="text-4xl font-bold mb-8 uppercase tracking-[0.2em]">Help Center</h2>
                    
//                     <div className="grid md:grid-cols-2 gap-6 mb-8">
//                         <div className="relative group">
//                             <input 
//                                 placeholder="Search FAQs..." 
//                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 outline-none focus:border-indigo-500 transition-all"
//                             />
//                             <Search className="absolute left-4 top-4 text-neutral-500 group-focus-within:text-indigo-500" size={18} />
//                         </div>

//                         <form onSubmit={handleTrackOrder} className="relative group">
//                             <input 
//                                 value={orderNumber}
//                                 onChange={(e) => setOrderNumber(e.target.value)}
//                                 placeholder="Order # (e.g. CL-1029)" 
//                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 outline-none focus:border-yellow-500 transition-all"
//                             />
//                             <Package className="absolute left-4 top-4 text-neutral-500 group-focus-within:text-yellow-500" size={18} />
//                             <button type="submit" className="absolute right-3 top-2.5 p-2 bg-white text-black rounded-xl hover:bg-yellow-500 transition-colors">
//                                 {isSearching ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Search size={16}/></motion.div> : <ArrowRight size={16} />}
//                             </button>
//                         </form>
//                     </div>

//                     {/* --- STYLIZED TRACKING MESSAGE --- */}
//                     <AnimatePresence>
//                         {trackingResult && (
//                             <motion.div 
//                                 initial={{ opacity: 0, scale: 0.95, y: -10 }}
//                                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                                 exit={{ opacity: 0, scale: 0.95, y: -10 }}
//                                 className="max-w-xl mx-auto mb-12 p-6 rounded-4xl bg-linear-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 text-left relative overflow-hidden"
//                             >
//                                 <div className="flex justify-between items-start mb-6">
//                                     <div>
//                                         <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 mb-1">Status Update</p>
//                                         <h4 className="text-xl font-medium tracking-tight">{trackingResult.status}</h4>
//                                     </div>
//                                     <button onClick={() => setTrackingResult(null)} className="text-neutral-500 hover:text-white">
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                                 <div className="space-y-4">
//                                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
//                                         <motion.div 
//                                             initial={{ width: 0 }}
//                                             animate={{ width: `${trackingResult.progress}%` }}
//                                             className="h-full bg-indigo-500"
//                                         />
//                                     </div>
//                                     <p className="text-xs text-neutral-400 italic">Last seen: {trackingResult.location}</p>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>

//                 {/* --- FAQ SECTION (Using openIndex and faqs) --- */}
//                 <div className="space-y-4 mb-20">
//                     <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-6 px-2">Frequently Asked</h3>
//                     {faqs.map((faq, i) => (
//                         <div key={i} className="border border-white/5 rounded-2xl overflow-hidden bg-white/1">
//                             <button 
//                                 onClick={() => setOpenIndex(openIndex === i ? null : i)}
//                                 className="w-full flex justify-between items-center p-6 hover:bg-white/3 transition-colors"
//                             >
//                                 <span className="text-sm font-light tracking-wide">{faq.q}</span>
//                                 {openIndex === i ? <Minus size={16} className="text-indigo-500"/> : <Plus size={16}/>}
//                             </button>
                            
//                             <AnimatePresence>
//                                 {openIndex === i && (
//                                     <motion.div 
//                                         initial={{ height: 0, opacity: 0 }}
//                                         animate={{ height: "auto", opacity: 1 }}
//                                         exit={{ height: 0, opacity: 0 }}
//                                         className="border-t border-white/5"
//                                     >
//                                         <p className="p-6 text-neutral-400 font-light italic text-sm leading-relaxed">
//                                             {faq.a}
//                                         </p>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </div>
//                     ))}
//                 </div>

//                 {/* --- FLOATING CHAT --- */}
//                 <div className="fixed bottom-8 right-8 z-50">
//                     <AnimatePresence>
//                         {isChatOpen && (
//                             <motion.div 
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: 20 }}
//                                 className="absolute bottom-20 right-0 w-80 h-96 bg-[#121212] border border-white/10 rounded-3xl shadow-2xl flex flex-col"
//                             >
//                                 <div className="p-4 bg-indigo-600 rounded-t-3xl flex justify-between">
//                                     <span className="text-xs font-bold uppercase tracking-widest">Concierge</span>
//                                     <button onClick={() => setIsChatOpen(false)}><X size={16}/></button>
//                                 </div>
//                                 <div className="flex-1 p-4 text-[11px] text-neutral-400">
//                                     How can we assist your Cloud Luxury experience today?
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                     <button 
//                         onClick={() => setIsChatOpen(!isChatOpen)}
//                         className="bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
//                     >
//                         {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default HelpCenter;





import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, MessageCircle, Package, ArrowRight, X, Send } from 'lucide-react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 
} from "@fortawesome/free-solid-svg-icons";

const HelpCenter = () => {
    // 1. STATE DECLARATIONS (Must come first!)
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [orderNumber, setOrderNumber] = useState("");
    const [trackingResult, setTrackingResult] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    
    // Chat States
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [isTyping, setIsTyping] = useState(false); // Added this missing state
    const [messages, setMessages] = useState([
        { text: "Welcome to Cloud Luxury. How can I assist you?", isBot: true }
    ]);

    const scrollRef = useRef<HTMLDivElement>(null);

    // 2. USEEFFECT (Now it can "see" messages and isTyping)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // 3. LOGIC
    const allFaqs = [
        { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express takes 2-3." },
        { q: "Can I return a luxury item?", a: "Yes, we accept returns within 14 days of delivery if tags are intact." },
        { q: "Are the products authentic?", a: "Every item is certified and shipped with a physical certificate of authenticity." },
        { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide including customs handling." }
    ];

    const filteredFaqs = useMemo(() => {
        return allFaqs.filter(faq => 
            faq.q.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleTrackOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber) return;
        setIsSearching(true);
        try {
            const response = await fetch('http://localhost:5000/api/help/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: orderNumber })
            });
            const result = await response.json();
            if (result.success) {
                setTrackingResult(result);
            } else {
                setTrackingResult({ status: "Not Found", location: result.message, progress: 0 });
            }
        } catch (err) {
            console.error("Tracking connection failed");
        } finally {
            setIsSearching(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = { text: chatInput, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = chatInput; // Store input before clearing
        setChatInput("");
        setIsTyping(true); // Start typing animation

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: currentInput })
            });
            
            const data = await response.json();
            setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "The concierge is currently unavailable.", isBot: true }]);
        } finally {
            setIsTyping(false); // Stop typing animation
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                
                {/* TRACKER & SEARCH SECTION */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-8 uppercase tracking-[0.2em]">Help Center</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="relative">
                            <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search FAQs..." 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 outline-none focus:border-indigo-500 transition-all"
                            />
                            <Search className="absolute left-4 top-4 text-neutral-500" size={18} />
                        </div>

                        <form onSubmit={handleTrackOrder} className="relative">
                            <input 
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="Order # (CL-1029)" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 outline-none focus:border-yellow-500 transition-all"
                            />
                            <Package className="absolute left-4 top-4 text-neutral-500" size={18} />
                            <button className="absolute right-3 top-2.5 p-2 bg-white text-black rounded-xl">
                                {isSearching ? <div className="animate-spin text-black"><Search size={16}/></div> : <ArrowRight size={16} />}
                            </button>
                        </form>
                    </div>

                    <AnimatePresence>
                        {trackingResult && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl bg-linear-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 text-left">
                                <h4 className="text-xl mb-4">{trackingResult.status}</h4>
                                <div className="h-1.5 w-full bg-white/10 rounded-full mb-2">
                                    <div style={{ width: `${trackingResult.progress}%` }} className="h-full bg-indigo-500 transition-all duration-1000" />
                                </div>
                                <p className="text-xs text-neutral-400 italic">Location: {trackingResult.location}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* FAQ SECTION */}
                <div className="space-y-4 mb-20">
                    {filteredFaqs.map((faq, i) => (
                        <div key={i} className="border border-white/5 rounded-2xl overflow-hidden bg-white/5">
                            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex justify-between p-6 uppercase tracking-widest text-[11px]">
                                {faq.q} {openIndex === i ? <Minus size={14}/> : <Plus size={14}/>}
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-6 pb-6 text-neutral-400 text-sm font-light italic">
                                        {faq.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* FLOATING CHAT */}
                <div className="fixed bottom-8 right-8 z-50">
                    <AnimatePresence>
                        {isChatOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                                animate={{ opacity: 1, y: 0, scale: 1 }} 
                                exit={{ opacity: 0, y: 20, scale: 0.95 }} 
                                className="absolute bottom-20 right-0 w-80 h-[450px] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                            >
                                <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold">Cloud Concierge</span>
                                    </div>
                                    <button onClick={() => setIsChatOpen(false)} className="text-neutral-500 hover:text-white"><X size={16}/></button>
                                </div>

                                <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
                                    {messages.map((m, i) => (
                                        <motion.div 
                                            initial={{ opacity: 0, x: m.isBot ? -10 : 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={i} 
                                            className={`max-w-[85%] p-3 rounded-2xl text-[12px] leading-relaxed ${
                                                m.isBot  
                                                ? 'bg-white/10 border border-white/5 text-neutral-300 self-start rounded-tl-none' 
                                                : 'bg-indigo-600 text-white ml-auto rounded-tr-none shadow-lg shadow-indigo-500/10'
                                            }`}
                                        >
                                            {m.text}
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 p-3 bg-white/5 w-12 rounded-2xl">
                                            <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" />
                                        </motion.div>
                                    )}
                                </div>

                                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-white/5 flex gap-2">
                                    <input 
                                        value={chatInput} 
                                        onChange={(e) => setChatInput(e.target.value)} 
                                        placeholder="Ask the concierge..." 
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500/50 transition-all" 
                                    />
                                    <button 
                                        disabled={isTyping}
                                        type="submit" 
                                        className={`p-2.5 rounded-xl transition-all ${chatInput.trim() ? 'bg-indigo-600' : 'bg-white/5 text-neutral-600'}`}
                                    >
                                        <Send size={14}/>
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        onClick={() => setIsChatOpen(!isChatOpen)} 
                        className="bg-white text-black p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 relative"
                    >
                        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
                    </button>
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

export default HelpCenter;