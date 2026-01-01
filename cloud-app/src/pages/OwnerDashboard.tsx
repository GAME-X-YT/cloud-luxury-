//   import React, { useState, useEffect } from 'react';
//   import AdminOrderList from '../components/AdminOrderList';
//   import axios from 'axios';
//   import BlogManager from '../DataItem/BlogManager';
//   import { motion, AnimatePresence } from 'framer-motion';
//   import OwnerOrders from './OwnerOrders';
//   import { Upload, Tag, CheckCircle, Loader2, Image as ImageIcon, Edit3, Trash2 } from 'lucide-react';



//   interface Product {

//     _id: string;

//     name: string;

//     price: string | number;

//     description: string;

//     category: string;

//     imageUrl: string;

//     subCategory?: string;

//   }



//   const OwnerDashboard: React.FC = () => {

//     const [file, setFile] = useState<File | null>(null);

//     const [preview, setPreview] = useState<string | null>(null);

//     const [status, setStatus] = useState('');

//     const [isUploading, setIsUploading] = useState(false);

//     const [allProducts, setAllProducts] = useState<Product[]>([]);

//     const [subCategory, setSubCategory] = useState('');

//     const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//     // Add this state at the top of your component

//    const [mode, setMode] = useState<'product' | 'blog' | 'orders'>('product');

//     const [isDeleting, setIsDeleting] = useState<string | null>(null); // To show a loading state on delete

//     const [formData, setFormData] = useState({

//       name: '',

//       price: '',

//       description: '',

//       category: 'shoes'

//     });



//     const catalogs = [

//       'shoes', 'fall-clothes', 'jewelry', 'tshirt',

//       'baggy-jeans', 'watches', 'shorts', 'couples-outfit', 'hoodie'

//     ];

   

//     const shoeCategories = [

//       'office-wear', 'sneakers', 'unisex', 'heels',

//       'ladies-flats', 'loafers', 'sport', 'school'

//     ];

//     const jewelryCategories = [
//       'necklaces', 
//       'rings', 
//       'bracelets', 
//       'earrings', 
//       'pendants', 
//       'watches',
//       'rings'
//     ];


//     const [blogData, setBlogData] = useState({

//       title: '',

//       excerpt: '',

//       content: '',

//       category: 'Editorial'

//     });



//    const fetchAllProducts = async () => {
//     try {
//       // Changed from /category/all to just /all or your main GET route
//       const res = await axios.get("http://localhost:5000/api/products/all");
//       setAllProducts(res.data);
//     } catch (err) {
//       console.error("Fetch Error: Ensure your backend has a GET /api/products/all route");
//     }
//   };



//     useEffect(() => {

//       fetchAllProducts();

//     }, []);



//     useEffect(() => {

//       if (status) fetchAllProducts();

//     }, [status]);



//     // 2. REFINED UPDATE LOGIC
//   const handleUpdate = async (id: string, updatedData: Partial<Product>) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`http://localhost:5000/api/products/${id}`, updatedData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setEditingProduct(null); // Closes container
//       fetchAllProducts(); // Refreshes list
//       setStatus("Masterpiece updated successfully.");
//     } catch (err) {
//       setStatus("Update failed. Check your token.");
//     }
//   };



//  // 3. REFINED DELETE LOGIC
//   const handleDelete = async (id: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setIsDeleting(null);
//       fetchAllProducts();
//       setStatus("Item permanently removed.");
//     } catch (err) {
//       alert("Delete failed.");
//     }
//   };


//   useEffect(() => {

//     if (!file) {

//       setPreview(null);

//       return;

//     }

//     const objectUrl = URL.createObjectURL(file);

//     setPreview(objectUrl);

//     return () => URL.revokeObjectURL(objectUrl);

//   }, [file]);



//     useEffect(() => {

//     setSubCategory(''); // Reset sub-selection when main category changes

//   }, [formData.category]);





//   const handleSubmit = async (e: React.FormEvent) => {

//     e.preventDefault();

//     if (!file) return alert("Please upload a cover image");



//     // Validation: Ensure a sub-category is picked for Shoes and Jewelry

//   if ((formData.category === 'shoes' || formData.category === 'jewelry') && !subCategory) {

//     return alert(`Please select a specific type for ${formData.category}`);

//   }



//     setIsUploading(true);

//     setStatus('Processing high-quality upload...');

   

//     const data = new FormData();

//     data.append('image', file);

//     data.append('name', formData.name);

//     data.append('price', formData.price);

//     data.append('description', formData.description);

//     data.append('category', formData.category
//       // .toLowerCase()
//     ); // Force lowercase



//     // UPDATED LOGIC: Append subCategory for BOTH Shoes and Jewelry

//   if (formData.category === 'shoes' || formData.category === 'jewelry') {

//     data.append('subCategory', subCategory);

//   }





//     try {

//       const token = localStorage.getItem('token');

//       await axios.post('http://localhost:5000/api/products/upload', data, {

//         headers: {

//           'Authorization': `Bearer ${token}`,

//           'Content-Type': 'multipart/form-data'

//         }

//       });



//       setFormData({ name: '', price: '', description: '', category: 'shoes' });

//       setSubCategory('');

//       setFile(null);

//       setPreview(null);

//       setStatus('Success! Product is now live.');



//       await fetchAllProducts();

//     } catch (err: any) {

//       console.error("Upload Error:", err.response?.data || err.message);

//       setStatus(err.response?.status === 401 ? 'Unauthorized. Please re-login.' : 'Upload failed. Check Product validation.');

//     } finally {

//       setIsUploading(false);

//     }

//   };



//   const handleBlogSubmit = async (e: React.FormEvent) => {

//     e.preventDefault();

//     if (!file) return alert("Please upload a cover image for the article.");



//     setIsUploading(true);

//     setStatus('Publishing to Journal...');



//     const data = new FormData();

//     data.append('image', file);

//     data.append('title', blogData.title);

//     data.append('excerpt', blogData.excerpt);

//     data.append('content', blogData.content);

//     data.append('category', blogData.category);



//     try {

//       const token = localStorage.getItem('token');

//       await axios.post('http://localhost:5000/api/blogs/upload', data, {

//         headers: {

//           'Authorization': `Bearer ${token}`,

//           'Content-Type': 'multipart/form-data'

//         }

//       });

//       setBlogData({ title: '', excerpt: '', content: '', category: 'Editorial' });

//       setFile(null);

//       setStatus('Article Published Successfully!');

//     } catch (err) {

//       setStatus('Blog upload failed. Check server connection.');

//     } finally {

//       setIsUploading(false);

//     }

//   };



//  return (
//     <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
      
//       {/* 1. SINGLE MASTER OVERLAY CONTAINER (Fixes Duplication) */}
//       <AnimatePresence>
//         {(editingProduct || isDeleting) && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-100 bg-blue-900/30 backdrop-blur-xl flex items-center justify-center p-4"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               className="bg-neutral-900 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//             >
//               {editingProduct ? (
//                 <>
//                   <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter text-yellow-500">Edit Masterpiece</h2>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Product Name</label>
//                       <input 
//                         className="w-full bg-black border border-white/10 rounded-xl p-3 mt-1 outline-none focus:border-yellow-500 text-sm"
//                         value={editingProduct.name}
//                         onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
//                       />
//                     </div>
//                     <div>
//                       <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Price (₦)</label>
//                       <input 
//                         type="number"
//                         className="w-full bg-black border border-white/10 rounded-xl p-3 mt-1 outline-none focus:border-yellow-500 text-sm"
//                         value={editingProduct.price}
//                         onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
//                       />
//                     </div>
//                     <div>
//                       <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Category</label>
//                       <select 
//                         className="w-full bg-black border border-white/10 rounded-xl p-3 mt-1 outline-none focus:border-yellow-500 text-sm uppercase"
//                         value={editingProduct.category}
//                         onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
//                       >
//                         {catalogs.map(cat => (
//                           <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Description</label>
//                       <textarea 
//                         rows={3}
//                         className="w-full bg-black border border-white/10 rounded-xl p-3 mt-1 outline-none focus:border-yellow-500 text-sm"
//                         value={editingProduct.description}
//                         onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex gap-4 mt-8">
//                     <button onClick={() => setEditingProduct(null)} className="flex-1 py-4 rounded-xl bg-white/5 font-bold text-xs uppercase">Cancel</button>
//                     <button 
//                       onClick={() => handleUpdate(editingProduct._id, editingProduct)} 
//                       className="flex-1 py-4 rounded-xl bg-yellow-500 text-black font-black text-xs hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]"
//                     >
//                       SAVE CHANGES
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center py-4">
//                   <Trash2 className="mx-auto text-red-500 mb-4" size={48} />
//                   <h2 className="text-xl font-bold mb-6">Permanently delete this piece?</h2>
//                   <div className="flex gap-4">
//                     <button onClick={() => setIsDeleting(null)} className="flex-1 py-3 bg-white/5 rounded-xl text-xs font-bold">NO, KEEP IT</button>
//                     <button 
//                       onClick={() => isDeleting && handleDelete(isDeleting)} 
//                       className="flex-1 py-3 bg-red-600/20 text-red-500 border border-red-500/50 rounded-xl font-black text-xs hover:bg-red-600 hover:text-white transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
//                     >
//                       YES, DELETE
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
//         <header className="mb-12">
//           <h1 className="text-4xl font-black tracking-tighter bg-linear-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent">
//             OWNER COMMAND CENTER
//           </h1>
//           <p className="text-neutral-500 mt-2">Manage your luxury catalog and global inventory.</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <section className="bg-neutral-900/50 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
//             {/* MODE TOGGLE */}
//             {/* 1. THE SWITCH BUTTONS */}
//               <div className="flex gap-4 mb-8">
//                 <button 
//                   onClick={() => setMode('product')}
//                   className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${mode === 'product' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-neutral-500'}`}
//                 >
//                   PRODUCTS
//                 </button>
//                 <button 
//                   onClick={() => setMode('blog')}
//                   className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${mode === 'blog' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-neutral-500'}`}
//                 >
//                   JOURNAL
//                 </button>
//                 <button 
//                   onClick={() => setMode('orders')} // Add this button!
//                   className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${mode === 'orders' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-neutral-500'}`}
//                 >
//                   ORDERS
//                 </button>
//               </div>

//             {mode === 'blog' ? (
//               <form onSubmit={handleBlogSubmit} className="space-y-6">
//                 <div className="space-y-4">
//                   <input type="text" placeholder="Article Title" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none" value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value})} />
//                   <input type="text" placeholder="Short Excerpt" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none" value={blogData.excerpt} onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})} />
//                   <textarea placeholder="Story..." rows={6} required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none" value={blogData.content} onChange={(e) => setBlogData({...blogData, content: e.target.value})} />
//                 </div>
//                 <div className="relative group">
//                   <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//                   <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-black/20">
//                     <Upload className="mx-auto mb-2 text-neutral-500" />
//                     <p className="text-sm text-neutral-400">{file ? file.name : "Upload Journal Cover"}</p>
//                   </div>
//                 </div>
//                 <button disabled={isUploading} type="submit" className="w-full bg-yellow-500 py-4 rounded-2xl text-black font-black flex items-center justify-center gap-2">
//                   {isUploading ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />} {isUploading ? "PUBLISHING..." : "POST TO JOURNAL"}
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3"><Tag size={14} className="text-yellow-500" /> 1. Select Catalog</label>
//                   <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none cursor-pointer uppercase">
//                     {catalogs.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                   </select>
//                 </div>

//                 {(formData.category === 'shoes' || formData.category === 'jewelry') && (
//                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                     <select 
//                       value={subCategory} 
//                       onChange={(e) => setSubCategory(e.target.value)} 
//                       className="w-full bg-black border border-white/10 rounded-xl p-3 mb-4 outline-none uppercase"
//                     >
//                       <option value="">Select {formData.category} Type...</option>
//                       {/* Use shoeCategories if shoes, otherwise use your jewelry list */}
//                       {(formData.category === 'shoes' ? shoeCategories : jewelryCategories).map(cat => (
//                         <option key={cat} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </motion.div>
//                 )}

//                 <div className="space-y-4">
//                   <input type="text" placeholder="Product Name" required value={formData.name} className="w-full bg-black/40 border border-white/10 rounded-xl p-3" onChange={(e) => setFormData({...formData, name: e.target.value})} />
//                   <input type="number" placeholder="Price" required value={formData.price} className="w-full bg-black/40 border border-white/10 rounded-xl p-3" onChange={(e) => setFormData({...formData, price: e.target.value})} />
//                   <textarea placeholder="Description..." rows={3} value={formData.description} className="w-full bg-black/40 border border-white/10 rounded-xl p-3" onChange={(e) => setFormData({...formData, description: e.target.value})} />
//                 </div>

//                 <div className="relative group">
//                   <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//                   <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-black/20">
//                     <Upload className="mx-auto mb-2 text-neutral-500" />
//                     <p className="text-sm text-neutral-400">{file ? file.name : "Upload Product Image"}</p>
//                   </div>
//                 </div>

//                 <button disabled={isUploading} type="submit" className="w-full bg-yellow-500 py-4 rounded-2xl text-black font-black flex items-center justify-center gap-2">
//                   {isUploading ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />} {isUploading ? "UPLOADING..." : "PUBLISH TO STORE"}
//                 </button>
//               </form>
//             )}
//           </section>

//           {/* LIVE PREVIEW SECTION */}
//           <section className="sticky top-12 h-fit">
//             <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6 text-center">Live Preview</h2>
//             <div className="flex justify-center">
//               <motion.div animate={{ scale: [0.98, 1] }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }} className="w-80 bg-neutral-900 border border-white/10 rounded-[3rem] p-4 shadow-2xl">
//                 <div className="bg-neutral-800 rounded-[2.5rem] h-80 overflow-hidden relative">
//                   {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600"><ImageIcon size={48} strokeWidth={1} /><p className="text-[10px] mt-2">Awaiting Image...</p></div>}
//                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full"><span className="text-yellow-500 font-bold text-sm">₦{formData.price || '0'}</span></div>
//                 </div>
//                 <div className="mt-6 px-2 pb-2">
//                   <h3 className="text-xl font-bold truncate">{mode === 'product' ? (formData.name || 'Product Title') : (blogData.title || 'Article Title')}</h3>
//                   <p className="text-neutral-500 text-xs mt-1 uppercase tracking-widest">{mode === 'product' ? `${formData.category} ${subCategory ? `> ${subCategory}` : ''}` : blogData.category}</p>
//                   <p className="text-neutral-400 text-[10px] mt-3 line-clamp-2 italic leading-relaxed">{mode === 'product' ? formData.description : blogData.excerpt}</p>
//                   <div className="mt-4 h-10 w-full bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
//                     {mode === 'product' ? 'Add to Vault' : 'Read Article'}
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//             <AnimatePresence>
//               {status && (
//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center text-yellow-500 text-sm font-medium">
//                   {status}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </section>
//         </div>

//         {/* 2. THE TABLE SECTION (Fixes Delete Button) */}
//         <section className="mt-20 bg-neutral-900/30 border border-white/5 rounded-[2.5rem] mb-20 overflow-hidden">
//           <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/2">
//             <h2 className="text-xl font-bold">Live Inventory Manager</h2>
//             <span className="text-xs bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full font-black uppercase">
//               {allProducts.length} Pieces Live
//             </span>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-white/5 text-neutral-400 text-[10px] uppercase tracking-[0.2em]">
//                 <tr>
//                   <th className="p-6">Product Detail</th>
//                   <th className="p-6">Description</th>
//                   <th className="p-6">Category</th>
//                   <th className="p-6 text-right">Price</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/5">
//                 {allProducts.map((item) => (
//                   <tr key={item._id} className="hover:bg-white/2 transition-colors group">
//                     <td className="p-6 min-w-[250px]">
//                       <div className="flex items-center gap-4 mb-3">
//                         <img src={`http://localhost:5000${item.imageUrl}`} className="h-12 w-12 rounded-lg object-cover border border-white/10" alt="" />
//                         <span className="font-bold text-gray-200">{item.name}</span>
//                       </div>
//                       <div className="flex gap-2">
//                         <button onClick={() => setEditingProduct(item)} className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all">
//                           <Edit3 size={14} />
//                         </button>
//                         <button 
//                           onClick={() => setIsDeleting(item._id)} // CHANGED: Now opens the confirm modal
//                           className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     </td>
//                     <td className="p-6 max-w-[300px]">
//                       <p className="text-xs text-neutral-500 line-clamp-2 italic">{item.description || "No description."}</p>
//                     </td>
//                     <td className="p-6">
//                       <div className="flex flex-col">
//                         <span className="text-[10px] font-bold text-white uppercase">{item.category}</span>
//                         {item.subCategory && <span className="text-[9px] text-yellow-500 uppercase tracking-tighter">↳ {item.subCategory}</span>}
//                       </div>
//                     </td>
//                     <td className="p-6 text-right">
//                       <span className="text-lg font-black text-yellow-500 font-mono">₦{Number(item.price).toLocaleString()}</span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         <section className="mt-10">
//           <BlogManager />
//         </section>

//         <section className="mt-10">
//           <OwnerOrders />
//         </section>

//         {/* <section className="mt-10">
//           <AdminOrderList />
//         </section> */}
        
//       </motion.div>
//     </div>
//   );
// };



// export default OwnerDashboard;




    import React, { useState, useEffect } from 'react';
    import AdminOrderList from '../component/AdminOrderList';
    import axios from 'axios';
    import BlogManager from '../DataItem/BlogManager';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Upload, Loader2, Image as ImageIcon, Edit3, Trash2, ShoppingBag, BookOpen, Package } from 'lucide-react';

    interface Product {
      _id: string;
      name: string;
      price: string | number;
      description: string;
      category: string;
      imageUrl: string;
      subCategory?: string;
    }

    const OwnerDashboard: React.FC = () => {
      const [file, setFile] = useState<File | null>(null);
      const [preview, setPreview] = useState<string | null>(null);
      const [, setStatus] = useState('');
      const [isUploading, setIsUploading] = useState(false);
      const [allProducts, setAllProducts] = useState<Product[]>([]);
      const [subCategory, setSubCategory] = useState('');
      const [editingProduct, setEditingProduct] = useState<Product | null>(null);
      const [isDeleting, setIsDeleting] = useState<string | null>(null);
      const [mode, setMode] = useState<'product' | 'blog' | 'orders'>('product');

      const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'shoes'
      });

      const [blogData, setBlogData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Editorial'
      });

    const catalogs = ['shoes', 'fall-clothes', 'jewelry', 'tshirt', 'baggy-jeans', 'watches', 'shorts', 'couples-outfit', 'hoodie'];
    const shoeCategories = ['office-wear', 'sneakers', 'unisex', 'heels', 'ladies-flats', 'loafers', 'sport', 'school'];
    const jewelryCategories = ['necklaces', 'rings', 'bracelets', 'earrings', 'pendants', 'watches'];

    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/all");
        setAllProducts(res.data);
      } catch (err) {
        console.error("Fetch Error");
      }
    };

    useEffect(() => { fetchAllProducts(); }, []);

    const handleUpdate = async (id: string, updatedData: Partial<Product>) => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/products/${id}`, updatedData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditingProduct(null);
        fetchAllProducts();
        setStatus("Masterpiece updated successfully.");
      } catch (err) {
        setStatus("Update failed.");
      }
    };

    const handleDelete = async (id: string) => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsDeleting(null);
        fetchAllProducts();
        setStatus("Item permanently removed.");
      } catch (err) {
        alert("Delete failed.");
      }
    };

    useEffect(() => {
      if (!file) { setPreview(null); return; }
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) return alert("Please upload a cover image");
      if ((formData.category === 'shoes' || formData.category === 'jewelry') && !subCategory) {
        return alert(`Please select a specific type for ${formData.category}`);
      }

      setIsUploading(true);
      const data = new FormData();
      data.append('image', file);
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('category', formData.category);
      if (formData.category === 'shoes' || formData.category === 'jewelry') {
        data.append('subCategory', subCategory);
      }

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/products/upload', data, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        setFormData({ name: '', price: '', description: '', category: 'shoes' });
        setFile(null);
        setStatus('Success! Product is now live.');
        fetchAllProducts();
      } catch (err) {
        setStatus('Upload failed.');
      } finally {
        setIsUploading(false);
      }
    };

    const handleBlogSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) return alert("Please upload a cover image");
      setIsUploading(true);
      const data = new FormData();
      data.append('image', file);
      data.append('title', blogData.title);
      data.append('excerpt', blogData.excerpt);
      data.append('content', blogData.content);
      data.append('category', blogData.category);

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/blogs/upload', data, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        setBlogData({ title: '', excerpt: '', content: '', category: 'Editorial' });
        setFile(null);
        setStatus('Article Published!');
      } catch (err) {
        setStatus('Blog upload failed.');
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
        
        {/* MODALS (Edit/Delete) */}
        <AnimatePresence>
          {(editingProduct || isDeleting) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-100 bg-blue-900/30 backdrop-blur-xl flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-neutral-900 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl">
                {editingProduct ? (
                  <>
                    <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter text-yellow-500">Edit Masterpiece</h2>
                    <div className="space-y-4">
                      <input className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-yellow-500 text-sm" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                      <input type="number" className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-yellow-500 text-sm" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                      <textarea rows={3} className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-yellow-500 text-sm" value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button onClick={() => setEditingProduct(null)} className="flex-1 py-4 rounded-xl bg-white/5 font-bold text-xs uppercase">Cancel</button>
                      <button onClick={() => handleUpdate(editingProduct._id, editingProduct)} className="flex-1 py-4 rounded-xl bg-yellow-500 text-black font-black text-xs">SAVE CHANGES</button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Trash2 className="mx-auto text-red-500 mb-4" size={48} />
                    <h2 className="text-xl font-bold mb-6">Permanently delete this piece?</h2>
                    <div className="flex gap-4">
                      <button onClick={() => setIsDeleting(null)} className="flex-1 py-3 bg-white/5 rounded-xl text-xs font-bold">NO, KEEP IT</button>
                      <button onClick={() => isDeleting && handleDelete(isDeleting)} className="flex-1 py-3 bg-red-600/20 text-red-500 border border-red-500/50 rounded-xl font-black text-xs hover:bg-red-600 hover:text-white transition-all">YES, DELETE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter bg-linear-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent">OWNER COMMAND CENTER</h1>
            <p className="text-neutral-500 mt-2">Manage your luxury catalog and global inventory.</p>
          </header>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Total Inventory</p>
              <p className="text-2xl font-black mt-2 text-yellow-500">{allProducts.length} <span className="text-xs text-neutral-400">Items</span></p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Catalog Value</p>
              <p className="text-2xl font-black mt-2">
                ₦{allProducts.reduce((acc, item) => acc + Number(item.price), 0).toLocaleString()}
              </p>
            </div>

            {/* These stats will eventually come from your Orders data */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Active Orders</p>
              <p className="text-2xl font-black mt-2 text-blue-400 flex items-center gap-2">
                0 <span className="text-[10px] bg-blue-400/10 px-2 py-1 rounded">PENDING</span>
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Total Sales</p>
              <p className="text-2xl font-black mt-2 text-green-400">₦0</p>
            </div>
          </div>

          {/* MODE TOGGLE SWITCHES */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button onClick={() => setMode('product')} className={`flex-1 min-w-[140px] py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black tracking-widest transition-all ${mode === 'product' ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-white/5 text-neutral-500 border border-white/5'}`}>
              <ShoppingBag size={14} /> PRODUCTS
            </button>
            <button onClick={() => setMode('blog')} className={`flex-1 min-w-[140px] py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black tracking-widest transition-all ${mode === 'blog' ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-white/5 text-neutral-500 border border-white/5'}`}>
              <BookOpen size={14} /> JOURNAL
            </button>
            <button onClick={() => setMode('orders')} className={`flex-1 min-w-[140px] py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black tracking-widest transition-all ${mode === 'orders' ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-white/5 text-neutral-500 border border-white/5'}`}>
              <Package size={14} /> ORDERS
            </button>
          </div>

          {/* DYNAMIC CONTENT AREA */}
          <AnimatePresence mode="wait">
            {mode === 'orders' ? (
              <motion.div key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <AdminOrderList />
              </motion.div>
            ) : (
              <motion.div key="management" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* UPLOADER FORM */}
                <section className="bg-neutral-900/50 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
                  {mode === 'blog' ? (
                    <form onSubmit={handleBlogSubmit} className="space-y-6">
                      <input type="text" placeholder="Article Title" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none" value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value})} />
                      <input type="text" placeholder="Short Excerpt" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none" value={blogData.excerpt} onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})} />
                      <textarea placeholder="Story..." rows={6} required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none" value={blogData.content} onChange={(e) => setBlogData({...blogData, content: e.target.value})} />
                      <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-black/20">
                        <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        <Upload className="mx-auto mb-2 text-neutral-500" />
                        <p className="text-sm text-neutral-400">{file ? file.name : "Upload Journal Cover"}</p>
                      </div>
                      <button type="submit" disabled={isUploading} className="w-full bg-yellow-500 py-4 rounded-2xl text-black font-black uppercase tracking-widest">
                        {isUploading ? <Loader2 className="animate-spin mx-auto" /> : "Publish to Journal"}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none uppercase">
                        {catalogs.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      {(formData.category === 'shoes' || formData.category === 'jewelry') && (
                        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none uppercase">
                          <option value="">Select Type...</option>
                          {(formData.category === 'shoes' ? shoeCategories : jewelryCategories).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      )}
                      <input type="text" placeholder="Product Name" required value={formData.name} className="w-full bg-black/40 border border-white/10 rounded-xl p-3" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      <input type="number" placeholder="Price" required value={formData.price} className="w-full bg-black/40 border border-white/10 rounded-xl p-3" onChange={(e) => setFormData({...formData, price: e.target.value})} />
                      <textarea placeholder="Description..." rows={3} value={formData.description} className="w-full bg-black/40 border border-white/10 rounded-xl p-3" onChange={(e) => setFormData({...formData, description: e.target.value})} />
                      <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-black/20">
                        <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        <Upload className="mx-auto mb-2 text-neutral-500" />
                        <p className="text-sm text-neutral-400">{file ? file.name : "Upload Product Image"}</p>
                      </div>
                      <button type="submit" disabled={isUploading} className="w-full bg-yellow-500 py-4 rounded-2xl text-black font-black uppercase tracking-widest">
                        {isUploading ? <Loader2 className="animate-spin mx-auto" /> : "Publish to Store"}
                      </button>
                    </form>
                  )}
                </section>

                {/* LIVE PREVIEW SECTION */}
                <section className="sticky top-12 h-fit hidden lg:block">
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6 text-center">Live Preview</h2>
                  <div className="flex justify-center">
                    <div className="w-80 bg-neutral-900 border border-white/10 rounded-[3rem] p-4 shadow-2xl">
                      <div className="bg-neutral-800 rounded-[2.5rem] h-80 overflow-hidden relative">
                        {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600"><ImageIcon size={48} /><p className="text-[10px] mt-2">Awaiting Image...</p></div>}
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full"><span className="text-yellow-500 font-bold text-sm">₦{formData.price || '0'}</span></div>
                      </div>
                      <div className="mt-6 px-2 pb-2">
                        <h3 className="text-xl font-bold truncate">{mode === 'product' ? (formData.name || 'Product Title') : (blogData.title || 'Article Title')}</h3>
                        <p className="text-neutral-500 text-xs mt-1 uppercase tracking-widest">{mode === 'product' ? `${formData.category}` : blogData.category}</p>
                        <p className="text-neutral-400 text-[10px] mt-3 line-clamp-2 italic">{mode === 'product' ? formData.description : blogData.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* INVENTORY MANAGER (Only shows in Product Mode) */}
          {mode === 'product' && (
            <section className="mt-20 bg-neutral-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/2">
                <h2 className="text-xl font-bold">Live Inventory Manager</h2>
                <span className="text-xs bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full font-black uppercase">{allProducts.length} Pieces Live</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-neutral-400 text-[10px] uppercase tracking-[0.2em]">
                    <tr><th className="p-6">Detail</th><th className="p-6">Category</th><th className="p-6 text-right">Price</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allProducts.map((item) => (
                      <tr key={item._id} className="hover:bg-white/2 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <img src={`http://localhost:5000${item.imageUrl}`} className="h-10 w-10 rounded-lg object-cover" alt="" />
                            <span className="font-bold">{item.name}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => setEditingProduct(item)} className="p-1.5 rounded bg-yellow-500/10 text-yellow-500"><Edit3 size={12} /></button>
                            <button onClick={() => setIsDeleting(item._id)} className="p-1.5 rounded bg-red-500/10 text-red-500"><Trash2 size={12} /></button>
                          </div>
                        </td>
                        <td className="p-6"><span className="text-[10px] font-bold uppercase">{item.category}</span></td>
                        <td className="p-6 text-right"><span className="text-yellow-500 font-black">₦{Number(item.price).toLocaleString()}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* BLOG MANAGER (Only shows in Blog Mode) */}
          {mode === 'blog' && (
            <section className="mt-10">
              <BlogManager />
            </section>
          )}

        </motion.div>
      </div>
    );
  };

  export default OwnerDashboard;