// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext<any>(null);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<any[]>([]);

//   // Load cart from local storage on startup
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cloud_cart');
//     if (savedCart) setCart(JSON.parse(savedCart));
//   }, []);

//   // Save to local storage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem('cloud_cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: any, quantity: number) => {
//     setCart((prev) => {
//       const exists = prev.find(item => item._id === product._id);
//       if (exists) {
//         return prev.map(item => 
//           item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
//         );
//       }
//       return [...prev, { ...product, quantity }];
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setCart(prev => prev.filter(item => item._id !== id));
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);




// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext<any>(null);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<any[]>(() => {
//     try {
//       const saved = localStorage.getItem('cloud_app_cart');
//       return saved ? JSON.parse(saved) : [];
//     } catch (err) {
//       return [];
//     }
//   });

//   const [notification, setNotification] = useState<string | null>(null);

//   useEffect(() => {
//     localStorage.setItem('cloud_app_cart', JSON.stringify(cart));
//   }, [cart]);

//   // Load cart from localStorage so it stays even if user refreshes
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) setCart(JSON.parse(savedCart));
//   }, []);

//   const addToCart = (product: any) => {
//       setCart((prev) => {
//         const exists = prev.find(item => item._id === product._id);
//         if (exists) {
//           return prev.map(item => 
//             item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//           );
//         }
//         return [...prev, { ...product, quantity: 1 }];
//       });
//       // Optional: Alert the user
//      setNotification(`${product.name} added to bag`);
//      setTimeout(() => setNotification(null), 3000);
//     };

//     const updateQuantity = (id: string, amount: number) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
//       )
//     );
//   };

//     const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((item) => item._id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cloud_app_cart');
//   };

//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ 
//       cart, 
//       cartCount, 
//       addToCart, 
//       removeFromCart, 
//       updateQuantity, 
//       clearCart 
//     }}>
//       {children}
      
//       {/* STYLISH NOTIFICATION POPUP */}
//       {notification && (
//         <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 bg-white text-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce border border-yellow-500">
//           <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
//           <span className="text-xs font-bold uppercase tracking-widest">{notification}</span>
//         </div>
//       )}
//     </CartContext.Provider>
//   );
// };

// // 3. Export the hook separately
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };



import React, { useState } from 'react';
import axios from 'axios';

// This tells TypeScript what an 'order' looks like
interface OrderProps {
  order: {
    _id: string;
    orderStatus: string;
    totalAmount: number;
  };
}

const OrderItem: React.FC<OrderProps> = ({ order }) => {
  const [status, setStatus] = useState(order.orderStatus);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel?")) return;
    
    setLoading(true);
    try {
      // This sends the request to your Node.js backend
      await axios.patch(`http://localhost:5000/api/orders/${order._id}/cancel`);
      setStatus('Cancelled'); 
      alert("Order Cancelled");
    } catch (err) {
      alert("Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

 // Inside your OrderItem.tsx return:
return (
  <div className="bg-neutral-900 border border-white/10 p-6 rounded-4xl flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Order ID</p>
      <p className="font-mono text-sm">{order._id}</p>
    </div>
    
    <div className="text-center">
      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Status</p>
      <span className={`px-4 py-1 rounded-full text-xs font-black uppercase ${
        status === 'Paid' ? 'bg-green-500/20 text-green-500' : 
        status === 'Cancelled' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
      }`}>
        {status}
      </span>
    </div>

    <div className="text-right">
      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total</p>
      <p className="text-xl font-black text-yellow-500">₦{order.totalAmount.toLocaleString()}</p>
    </div>

    {status === 'Processing' && (
      <button 
        onClick={handleCancel} 
        disabled={loading}
        className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-6 py-3 rounded-xl text-xs font-black transition-all border border-red-600/20"
      >
        {loading ? '...' : 'CANCEL ORDER'}
      </button>
    )}
  </div>
);
};

export default OrderItem;