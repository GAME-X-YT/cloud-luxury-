import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  ShoppingBag, 
  ExternalLink, 
  Zap, 
  Heart,
  Users, 
  Star 
} from "lucide-react";
import { Link } from "react-router-dom";

const FeatureBlock = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center p-8 bg-neutral-900/50 border border-white/5 rounded-3xl backdrop-blur-sm">
    <div className="bg-yellow-500/10 p-4 rounded-2xl mb-6 text-yellow-500">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold uppercase tracking-tighter text-white mb-2">{title}</h3>
    <p className="text-neutral-500 text-xs leading-relaxed max-w-[200px]">{desc}</p>
  </div>
);

const AdSection = ({ title, subtitle, link, image, reverse = false }: any) => (
  <motion.section 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-20 border-b border-white/5`}
  >
    <div className="flex-1 relative group overflow-hidden rounded-[2.5rem]">
      <img src={image} alt={title} className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
    </div>
    <div className="flex-1 space-y-6 text-center md:text-left px-4">
      <span className="text-yellow-500 font-mono text-xs tracking-[0.4em] uppercase">{subtitle}</span>
      <h2 className="text-6xl md:text-8xl font-black uppercase italic leading-none">{title}</h2>
      <p className="text-neutral-400 text-sm max-w-md mx-auto md:mx-0 font-serif italic">
        Experience the intersection of architectural precision and luxury street-wear.
      </p>
      <Link to={link}>
        <motion.button 
          whileHover={{ x: 10 }}
          className="mt-4 flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-yellow-500 transition-colors"
        >
          Explore Collection <ExternalLink size={16} />
        </motion.button>
      </Link>
    </div>
  </motion.section>
);

const ManifestoPage = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30 overflow-hidden">
      
      {/* --- HERO: THE HEADLINE ADS --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/80 to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-[12vw] md:text-[10rem] font-black uppercase italic leading-[0.75] tracking-tighter mb-8">
              The <br /> <span className="text-yellow-500">Archive.</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/wardrobe" className="bg-white/10 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full hover:bg-yellow-500 hover:text-black transition-all font-bold uppercase text-[10px] tracking-widest">
                Latest Drops
              </Link>
              <Link to="/watches" className="bg-white/10 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full hover:bg-yellow-500 hover:text-black transition-all font-bold uppercase text-[10px] tracking-widest">
                The Vault
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        
        {/* --- CORE FEATURES: TECHNICAL USP --- */}
        <section className="py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureBlock 
            icon={ShieldCheck} 
            title="Authenticated" 
            desc="Every piece comes with a digital certificate of authenticity and origin." 
          />
          <FeatureBlock 
            icon={Truck} 
            title="Global Drop" 
            desc="Express worldwide shipping. Secured packaging for luxury protection." 
          />
          <FeatureBlock 
            icon={Clock} 
            title="Swiss Motion" 
            desc="Our timepiece collections feature genuine mechanical Swiss movements." 
          />
          <FeatureBlock 
            icon={Zap} 
            title="Hand Cut" 
            desc="Raw denim and heavy cottons hand-finished for architectural fit." 
          />
        </section>

        {/* --- CATEGORY SHOWCASE (THE "ADS") --- */}
        <AdSection 
          title="Metal Cotton" 
          subtitle="450 GSM Heavyweights" 
          link="/hoodies" 
          image="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop"
        />
        
        <AdSection 
          title="Wide Vision" 
          subtitle="Industrial Baggy Denim" 
          link="/baggy-jeans" 
          reverse
          image="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop"
        />

        <AdSection 
          title="Double Luxury" 
          subtitle="Curated Couple Sets" 
          link="/couples-outfit" 
          image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop"
        />

        {/* --- WEBSITE FEATURES SUMMARY --- */}
        <section className="py-32 text-center bg-yellow-400 rounded-[3rem] my-20 px-6 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-black text-5xl md:text-7xl font-black uppercase italic leading-none mb-8">
              Built for the <br /> Digital Elite.
            </h2>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="text-black">
                <p className="text-4xl font-black">01</p>
                <p className="text-[10px] uppercase font-bold tracking-widest">Real-Time Inventory</p>
              </div>
              <div className="text-black">
                <p className="text-4xl font-black">02</p>
                <p className="text-[10px] uppercase font-bold tracking-widest">Secured Vault API</p>
              </div>
              <div className="text-black">
                <p className="text-4xl font-black">03</p>
                <p className="text-[10px] uppercase font-bold tracking-widest">Smart-Cart Logic</p>
              </div>
            </div>
            <Link to="/cart">
              <button className="mt-12 bg-black text-white px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-transform">
                Open Your Cart
              </button>
            </Link>
          </div>
          {/* Subtle Decorative Icon */}
          <ShoppingBag className="absolute -bottom-10 -right-10 text-black/5 w-64 h-64 rotate-12" />
        </section>

        {/* --- FINAL CALL TO ACTION --- */}
        <footer className="py-20 text-center">
          <div className="flex justify-center gap-4 mb-8 opacity-20">
            <Users size={20} /> <Star size={20} /> <Heart size={20} />
          </div>
          <p className="text-neutral-500 text-[10px] uppercase tracking-[0.8em]">End of Archive</p>
        </footer>

      </main>
    </div>
  );
};

export default ManifestoPage;