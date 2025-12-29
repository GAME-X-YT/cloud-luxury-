import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Placeholder for your blog structure
interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from Backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

    // Sample data - eventually you can fetch this from your backend
  useEffect(() => {
    const samplePosts: BlogPost[] = [
      {
        _id: '1',
        title: "The 2025 Footwear Trend: Why 'Cloud Steps' are Taking Over",
        excerpt: "Discover the intersection of comfort and high-fashion in this season's most anticipated release...",
        category: "Editorial",
        date: "Dec 28, 2024",
        author: "Admin",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
      },
      {
        _id: '2',
        title: "How to Style Your Office Wear for Late Night Events",
        excerpt: "Mastering the transition from the boardroom to the lounge with three simple adjustments...",
        category: "Styling Tips",
        date: "Dec 24, 2024",
        author: "Cloud Staff",
        imageUrl: "https://i.pinimg.com/1200x/d6/aa/32/d6aa323ede246cc567b6343c7cae70a4.jpg"
      }
    ];
    setPosts(samplePosts);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30">
      {/* Header Section */}
      <header className="pt-32 pb-20 px-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-yellow-500 text-[10px] font-bold tracking-[0.8em] uppercase block mb-6"
          >
            The Journal
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-serif italic mb-8"
          >
            Insights & <span className="text-neutral-500">Aesthetics</span>
          </motion.h1>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm tracking-wide leading-relaxed">
            Exploring the craftsmanship behind our collections and the culture of modern luxury.
          </p>
        </div>
      </header>

      {/* Blog Feed */}
      <main className="max-w-7xl mx-auto px-8 py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">Curating Journal...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {posts.map((post, index) => (
              <motion.article 
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-16/10 overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 mb-8">
                  <img 
                    // 3. Updated Image Path to point to Backend Server
                    src={`http://localhost:5000${post.imageUrl}`} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-2">
                  <div className="flex items-center gap-6 text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar size={12}/> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <User size={12}/> {post.author || 'Admin'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-serif italic mb-4 group-hover:text-yellow-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <Link to={`/blog/${post._id}`} className="inline-flex items-center gap-2 text-xs font-bold text-yellow-500 uppercase tracking-tighter group/link">
                    Read Journal <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="py-40 text-center text-neutral-600 uppercase tracking-widest text-xs italic">
            The journal is currently empty.
          </div>
        )}
      </main>

      {/* Newsletter / Footer Promo */}
                <section className="bg-neutral-900/30 py-32 px-8 border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                >
                <h3 className="text-2xl font-serif italic mb-2 text-white">Experience the Vibe.</h3>
                <p className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-8">
                    Watch our latest drops & styling guides
                </p>
                
                <div className="flex flex-col items-center gap-6">
                    {/* Replace the URL below with your actual YouTube Channel Link */}
                    <a 
                    href="https://www.youtube.com/@YOUR_CHANNEL_HANDLE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 bg-white text-black px-12 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-yellow-500 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-yellow-500/20"
                    >
                    <svg 
                        viewBox="0 0 24 24" 
                        className="w-5 h-5 fill-current text-red-600 group-hover:text-black transition-colors"
                    >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Visit Our Channel
                    </a>

                    <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
                    Join 2.5k+ subscribers for weekly luxury content
                    </p>
                </div>
                </motion.div>
            </div>
            <Link to="/" className="flex items-center space-x-3 p-4 hover:bg-white/10 rounded-xl transition-all mb-4 text-gray-400 hover:text-white hover:underline max-w-max mx-auto mt-16">
            <FontAwesomeIcon icon={faHome} />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </section>
    </div>
  );
};

export default BlogPage;