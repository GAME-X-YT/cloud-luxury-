// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, Package, DollarSign, Tag, CheckCircle, Loader2, Image as ImageIcon, Edit3, Trash2 } from 'lucide-react';

// interface Product {
// _id: string;
//   name: string;
//   price: string | number;
//   description: string;
//   category: string;
//   imageUrl: string;
// }

// const OwnerDashboard: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [status, setStatus] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
//   const [allProducts, setAllProducts] = useState<Product[]>([]); // Use the interface here
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     description: '',
//     category: 'shoes'
//   });

//   const catalogs = [
//     'shoes', 'fall clothes', 'jewelry', 'T-shirt', 
//     'baggy jeans', 'watches', 'shorts', 'couples outfit', 'hoodie'
//   ];

//   // 2. Fix TypeScript 'any' errors by adding types to parameters
//     const handleUpdate = async (id: string, updatedData: Partial<Product>) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`http://localhost:5000/api/products/${id}`, updatedData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       // Call this directly instead of relying on the 'status' useEffect
//       fetchAllProducts(); 
//       setStatus("Inventory updated successfully.");
//     } catch (err) {
//       setStatus("Update failed.");
//     }
//   };

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products/category/all");
//       setAllProducts(res.data);
//     } catch (err) {
//       console.error("Failed to load inventory");
//     }
//   };

//   useEffect(() => {
//     fetchAllProducts();
//   }, [status]);

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this piece?")) return;
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAllProducts(allProducts.filter(p => p._id !== id));
//       setStatus("Product removed from vault.");
//     } catch (err) {
//       alert("Delete failed.");
//     }
//   };



//   // Handle Image Preview
//   useEffect(() => {
//     if (!file) {
//       setPreview(null);
//       return;
//     }
//     const objectUrl = URL.createObjectURL(file);
//     setPreview(objectUrl);
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [file]);

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!file) return;

//   setIsUploading(true);
//   setStatus('Processing high-quality upload...');
  
//   const data = new FormData();
//   data.append('image', file);
//   data.append('name', formData.name);
//   data.append('price', formData.price);
//   data.append('description', formData.description);
//   data.append('category', formData.category);

//   try {
//     const token = localStorage.getItem('token');
//     await axios.post('http://localhost:5000/api/products/upload', data, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     // --- NEW: Reset form so owner can add next item ---
//     setFormData({ name: '', price: '', description: '', category: 'jewelry' });
//     setFile(null);
//     setPreview(null);
    
//     setStatus('Success! Product is now live.');
//     fetchAllProducts(); // Refresh the list
//     setIsUploading(false);
//   } catch (err) {
//     setStatus('Upload failed. Check permissions.');
//     setIsUploading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-6xl mx-auto"
//       >
//         <header className="mb-12">
//           <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent">
//             OWNER COMMAND CENTER
//           </h1>
//           <p className="text-neutral-500 mt-2">Manage your luxury catalog and global inventory.</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
//           {/* LEFT: FORM SECTION */}
//           <section className="bg-neutral-900/50 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               {/* Category Selection */}
//               <div>
//                 <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
//                   <Tag size={14} className="text-yellow-500" /> 1. Select Catalog
//                 </label>
//                 <select 
//                   value={formData.category} 
//                   onChange={(e) => setFormData({...formData, category: e.target.value})}
//                   className="w-full bg-black border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-yellow-500/50 outline-none appearance-none cursor-pointer"
//                 >
//                   {catalogs.map(cat => (
//                     <option key={cat} value={cat}>{cat.toUpperCase()}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Product Info */}
//               <div className="space-y-4">
//                 <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
//                   <Package size={14} className="text-yellow-500" /> 2. Details
//                 </label>
//                 <input 
//                   type="text" placeholder="Product Name" required 
//                   className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-yellow-500/50 transition-all"
//                   onChange={(e) => setFormData({...formData, name: e.target.value})} 
//                 />
                
//                 <div className="relative">
//                   <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
//                   <input 
//                     type="number" placeholder="Price" required 
//                     className="w-full bg-black/40 border border-white/10 rounded-xl p-3 pl-10 focus:border-yellow-500/50"
//                     onChange={(e) => setFormData({...formData, price: e.target.value})} 
//                   />
//                 </div>
                
//                 <textarea 
//                   placeholder="Description..." rows={3}
//                   className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-yellow-500/50"
//                   onChange={(e) => setFormData({...formData, description: e.target.value})} 
//                 />
//               </div>

//               {/* File Upload */}
//               <div>
//                 <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
//                   <ImageIcon size={14} className="text-yellow-500" /> 3. Media
//                 </label>
//                 <div className="relative group">
//                   <input 
//                     type="file" accept="image/*" required 
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                     onChange={(e) => setFile(e.target.files?.[0] || null)} 
//                   />
//                   <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center group-hover:border-yellow-500/50 transition-all bg-black/20">
//                     <Upload className="mx-auto mb-2 text-neutral-500 group-hover:text-yellow-500 transition-colors" />
//                     <p className="text-sm text-neutral-400">{file ? file.name : "Drag image or click to browse"}</p>
//                   </div>
//                 </div>
//               </div>

//               <button 
//                 disabled={isUploading}
//                 type="submit" 
//                 className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(234,179,8,0.2)]"
//               >
//                 {isUploading ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
//                 {isUploading ? "UPLOADING..." : "PUBLISH TO STORE"}
//               </button>
//             </form>
//           </section>

//           {/* RIGHT: LIVE PREVIEW SECTION */}
//           <section className="sticky top-12 h-fit">
//             <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6 text-center">Live Preview</h2>
//             <div className="flex justify-center">
//               <motion.div 
//                 animate={{ scale: [0.98, 1] }}
//                 transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
//                 className="w-80 bg-neutral-900 border border-white/10 rounded-[3rem] p-4 shadow-2xl"
//               >
//                 <div className="bg-neutral-800 rounded-[2.5rem] h-80 overflow-hidden relative">
//                   {preview ? (
//                     <img src={preview} alt="Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600">
//                       <ImageIcon size={48} strokeWidth={1} />
//                       <p className="text-[10px] mt-2">Awaiting Image...</p>
//                     </div>
//                   )}
//                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full">
//                     <span className="text-yellow-500 font-bold text-sm">₦{formData.price || '0'}</span>
//                   </div>
//                 </div>
//                 <div className="mt-6 px-2 pb-2">
//                   <h3 className="text-xl font-bold truncate">{formData.name || 'Product Title'}</h3>
//                   <p className="text-neutral-500 text-xs mt-1 uppercase tracking-widest">{formData.category}</p>
//                   <div className="mt-4 h-10 w-full bg-white rounded-xl" />
//                 </div>
//               </motion.div>
//             </div>
            
//             <AnimatePresence>
//               {status && (
//                 <motion.div 
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center text-yellow-500 text-sm font-medium"
//                 >
//                   {status}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </section>


//         </div>
//       </motion.div>
//       {/* INVENTORY MANAGER TABLE */}
//             <section className="mt-20 bg-neutral-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden">
//       <div className="p-8 border-b border-white/5 flex justify-between items-center">
//         <h2 className="text-xl font-bold">Live Inventory Manager</h2>
//         <span className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full uppercase tracking-tighter">
//           {allProducts.length} Pieces Live
//         </span>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-white/5 text-neutral-400 text-xs uppercase tracking-widest">
//             <tr>
//               <th className="p-6">Item</th>
//               <th className="p-6">Category</th>
//               <th className="p-6">Price</th>
//               <th className="p-6 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-white/5">
//             {allProducts.map((item) => (
//               <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
//                 <td className="p-6 flex items-center gap-4">
//                   <img 
//                     src={`http://localhost:5000${item.imageUrl}`} 
//                     className="w-12 h-12 rounded-lg object-cover border border-white/10" 
//                     alt="" 
//                   />
//                   <span className="font-medium text-gray-200">{item.name}</span>
//                 </td>
//                 <td className="p-6 text-neutral-500 text-sm">{item.category}</td>
//                 <td className="p-6 text-yellow-500 font-mono">₦{item.price}</td>
//                 <td className="p-6 text-right">

//                   <button 
//                   onClick={() => {
//                     const newPrice = prompt("Update price for " + item.name, item.price.toString());
//                     if (newPrice) handleUpdate(item._id, { price: newPrice });
//                   }}
//                   className="text-neutral-500 hover:text-yellow-500 transition-colors"
//                   title="Edit Item"
//                 >
//                   <Edit3 size={18} />
//                 </button>

//                   <button 
//                     onClick={() => handleDelete(item._id)}
//                     className="text-red-500/50 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest"
//                   >
//                     Delete <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//     </div>
//   );
// };

// export default OwnerDashboard;


  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Upload, Package, DollarSign, Tag, CheckCircle, Loader2, Image as ImageIcon, Edit3, Trash2 } from 'lucide-react';

  interface Product {
    _id: string;
    name: string;
    price: string | number;
    description: string;
    category: string;
    imageUrl: string;
  }

  const OwnerDashboard: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      description: '',
      category: 'shoes'
    });

    const catalogs = [
      'shoes', 'fall clothes', 'jewelry', 't-shirt', 
      'baggy jeans', 'watches', 'shorts', 'couples outfit', 'hoodie'
    ];

    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/category/all");
        console.log("Inventory Data Received:", res.data); // Open Browser Console (F12) to see this
        setAllProducts(res.data);
      } catch (err) {
        console.error("Dashboard could not connect to backend.");
      }
    };

    useEffect(() => {
      fetchAllProducts();
    }, []);

    useEffect(() => {
      if (status) fetchAllProducts();
    }, [status]);

    const handleUpdate = async (id: string, updatedData: Partial<Product>) => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/products/${id}`, updatedData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchAllProducts(); 
        setStatus("Inventory updated successfully.");
      } catch (err) {
        setStatus("Update failed.");
      }
    };

    const handleDelete = async (id: string) => {
      if (!window.confirm("Are you sure you want to delete this piece?")) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllProducts(allProducts.filter(p => p._id !== id));
        setStatus("Product removed from vault.");
      } catch (err) {
        alert("Delete failed. Your session might have expired.");
      }
    };

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setStatus('Processing high-quality upload...');
    
    const data = new FormData();
    data.append('image', file);
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category.toLowerCase()); // Force lowercase

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/products/upload', data, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setFormData({ name: '', price: '', description: '', category: 'shoes' });
      setFile(null);
      setPreview(null);
      setStatus('Success! Product is now live.');
      fetchAllProducts();
    } catch (err: any) {
      console.error("Upload Error:", err.response?.data || err.message);
      setStatus(err.response?.status === 401 ? 'Unauthorized. Please re-login.' : 'Upload failed. Check server console.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent">
            OWNER COMMAND CENTER
          </h1>
          <p className="text-neutral-500 mt-2">Manage your luxury catalog and global inventory.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="bg-neutral-900/50 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                  <Tag size={14} className="text-yellow-500" /> 1. Select Catalog
                </label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-yellow-500/50 outline-none appearance-none cursor-pointer"
                >
                  {catalogs.map(cat => (
                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  <Package size={14} className="text-yellow-500" /> 2. Details
                </label>
                <input 
                  type="text" placeholder="Product Name" required value={formData.name}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-yellow-500/50 transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input 
                    type="number" placeholder="Price" required value={formData.price}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 pl-10 focus:border-yellow-500/50"
                    onChange={(e) => setFormData({...formData, price: e.target.value})} 
                  />
                </div>
                <textarea 
                  placeholder="Description..." rows={3} value={formData.description}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-yellow-500/50"
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                  <ImageIcon size={14} className="text-yellow-500" /> 3. Media
                </label>
                <div className="relative group">
                  <input 
                    type="file" accept="image/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                  />
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center group-hover:border-yellow-500/50 transition-all bg-black/20">
                    <Upload className="mx-auto mb-2 text-neutral-500 group-hover:text-yellow-500 transition-colors" />
                    <p className="text-sm text-neutral-400">{file ? file.name : "Drag image or click to browse"}</p>
                  </div>
                </div>
              </div>

              <button 
                disabled={isUploading} type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_10px_30px_rgba(234,179,8,0.2)]"
              >
                {isUploading ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                {isUploading ? "UPLOADING..." : "PUBLISH TO STORE"}
              </button>
            </form>
          </section>

          <section className="sticky top-12 h-fit">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6 text-center">Live Preview</h2>
            <div className="flex justify-center">
              <motion.div animate={{ scale: [0.98, 1] }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }} className="w-80 bg-neutral-900 border border-white/10 rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-neutral-800 rounded-[2.5rem] h-80 overflow-hidden relative">
                  {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600"><ImageIcon size={48} strokeWidth={1} /><p className="text-[10px] mt-2">Awaiting Image...</p></div>}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full"><span className="text-yellow-500 font-bold text-sm">₦{formData.price || '0'}</span></div>
                </div>
                <div className="mt-6 px-2 pb-2">
                  <h3 className="text-xl font-bold truncate">{formData.name || 'Product Title'}</h3>
                  <p className="text-neutral-500 text-xs mt-1 uppercase tracking-widest">{formData.category}</p>
                  <div className="mt-4 h-10 w-full bg-white/5 rounded-xl" />
                </div>
              </motion.div>
            </div>
            <AnimatePresence>
              {status && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center text-yellow-500 text-sm font-medium">
                  {status}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

              <section className="mt-20 bg-neutral-900/30 border border-white/5 rounded-[2.5rem] mb-20">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Live Inventory Manager</h2>
            <p className="text-neutral-500 text-xs mt-1 uppercase tracking-widest">Global Catalog Control</p>
          </div>
          <span className="text-xs bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full font-black uppercase tracking-tighter">
            {allProducts.length} Pieces Live
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-neutral-400 text-[10px] uppercase tracking-[0.2em]">
              <tr>
                <th className="p-6">Product & Actions</th>
                <th className="p-6">Category</th>
                <th className="p-6 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allProducts.map((item) => (
                <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                  {/* COLUMN 1: IMAGE, ACTIONS TOP, NAME BOTTOM */}
                  <td className="p-6 min-w-[300px]">
                    <div className="flex flex-col gap-4">
                      {/* ACTION ROW (TOP) */}
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => {
                            const newPrice = prompt("Update price:", item.price.toString());
                            if (newPrice) handleUpdate(item._id, { price: newPrice });
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                        >
                          <Edit3 size={14} />
                          <span className="text-[10px] font-black uppercase">Edit</span>
                        </button>

                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <Trash2 size={14} />
                          <span className="text-[10px] font-black uppercase">Delete</span>
                        </button>
                      </div>

                      {/* PRODUCT INFO ROW */}
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 flex-shrink-0">
                          <img 
                            src={`http://localhost:5000${item.imageUrl}`} 
                            className="h-full w-full rounded-xl object-cover border border-white/10 group-hover:border-yellow-500/50 transition-colors" 
                            alt="" 
                          />
                        </div>
                        <span className="font-bold text-gray-200 tracking-tight text-lg">{item.name}</span>
                      </div>
                    </div>
                  </td>

                  {/* COLUMN 2: CATEGORY */}
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-md bg-neutral-800 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                  </td>

                  {/* COLUMN 3: PRICE */}
                  <td className="p-6 text-right">
                    <span className="text-xl font-black text-yellow-500 font-mono">
                      ₦{Number(item.price).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {allProducts.length === 0 && (
            <div className="p-20 text-center text-neutral-600 uppercase tracking-[0.3em] text-xs">
              The vault is empty
            </div>
          )}
        </div>
      </section>
      </motion.div>
    </div>
  );
};

export default OwnerDashboard;