import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, FileText, Loader2 } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

const BlogManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, updatedData: Partial<Blog>) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      alert("Failed to update blog");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsDeleting(null);
      fetchBlogs();
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-yellow-500" /></div>;

  return (
    <div className="mt-10">
      {/* EDIT/DELETE MODAL (Matches Product Style) */}
      <AnimatePresence>
        {(editingBlog || isDeleting) && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-150 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="bg-neutral-900 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl"
            >
              {editingBlog ? (
                <>
                  <h2 className="text-2xl font-black mb-6 uppercase text-yellow-500">Edit Journal Entry</h2>
                  <div className="space-y-4">
                    <input 
                      className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-yellow-500 text-sm"
                      value={editingBlog.title}
                      onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                    />
                    <textarea 
                      rows={2}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-yellow-500 text-sm"
                      value={editingBlog.excerpt}
                      onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                    />
                    <textarea 
                      rows={5}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-yellow-500 text-sm"
                      value={editingBlog.content}
                      onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setEditingBlog(null)} className="flex-1 py-4 rounded-xl bg-white/5 font-bold text-xs uppercase">Cancel</button>
                    <button onClick={() => handleUpdate(editingBlog._id, editingBlog)} className="flex-1 py-4 rounded-xl bg-yellow-500 text-black font-black text-xs">SAVE CHANGES</button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <Trash2 className="mx-auto text-red-500 mb-4" size={48} />
                  <h2 className="text-xl font-bold mb-6">Remove this story from Journal?</h2>
                  <div className="flex gap-4">
                    <button onClick={() => setIsDeleting(null)} className="flex-1 py-3 bg-white/5 rounded-xl text-xs font-bold">KEEP IT</button>
                    <button onClick={() => isDeleting && handleDelete(isDeleting)} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-xs">DELETE STORY</button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BLOG TABLE */}
      <section className="bg-neutral-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/2">
          <h2 className="text-xl font-bold flex items-center gap-2"><FileText className="text-yellow-500" /> Journal Manager</h2>
          <span className="text-xs bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full font-black uppercase">{blogs.length} Stories</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-neutral-400 text-[10px] uppercase tracking-[0.2em]">
              <tr>
                <th className="p-6">Story Detail</th>
                <th className="p-6">Excerpt</th>
                <th className="p-6">Date</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-white/2 transition-colors">
                  <td className="p-6 flex items-center gap-4">
                    <img src={`http://localhost:5000${blog.imageUrl}`} className="h-12 w-12 rounded-lg object-cover grayscale hover:grayscale-0 transition-all border border-white/10" alt="" />
                    <span className="font-bold text-gray-200 text-sm line-clamp-1">{blog.title}</span>
                  </td>
                  <td className="p-6 text-xs text-neutral-500 italic max-w-xs truncate">{blog.excerpt}</td>
                  <td className="p-6 text-[10px] text-neutral-500 uppercase">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingBlog(blog)} className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"><Edit3 size={14} /></button>
                      <button onClick={() => setIsDeleting(blog._id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BlogManager;