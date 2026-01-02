// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState} from "react";
// import { AnimatePresence } from "framer-motion";
// import Home from './pages/Home';
// import Profile from './pages/profile';
// import OwnerDashboard from './pages/OwnerDashboard';
// import  Wardrobe from "./pages/Wardrobe";
// import Watche from './pages/watches';
// // import Preloader from './component/preloader'
// import Shoes from './pages/shoes';
// import Tshirt from './pages/t-shirt';
// import Jewelry from './pages/Glitz-jewelry';
// import Auth from "./pages/Auth";
// import HoodieGallery from "./pages/hoodie";
// import SiteLoading from "./component/SiteLoading";
// import CouplePage from './pages/CoupleOutfit';
// import ShortsPage from './pages/Shorts';
// import FallPage from "./pages/Fallclothes";
// import BaggyJeansPage from './pages/BaggyJeans';
// import BlogPage from "./pages/Blog";
// import JewelryCategoryPage from "./pages/JewelryCategoryPage";
// import ShoeCategoryPage from "./pages/ShoeCategoryPage";
// import OrdersPage from "./pages/OrdersPage";
// // import CartPage from "./pages/CartPage";
// // import { CartProvider } from "./context/OrderItem";
// // import SignIn from './pages/SignIn';

// // Define the type for your User for better TypeScript support
//   interface UserData {
//     role: string;
//     email?: string;
//   }

//   const getStoredUser = () => {
//     const saved = localStorage.getItem("user");
//     return saved ? JSON.parse(saved) : null;
//   };


// function App() {

//   const [user, setUser] = useState<UserData | null>(getStoredUser());
//   const [loading, setLoading] = useState(true);

//   const [isSiteReady, setIsSiteReady] = useState(false);
  
//  useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     const token = localStorage.getItem("token");

    
//     if (savedUser && token) {
//       try {
//         setUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing user from localStorage", error);
//       }
//     }
//     setLoading(false);

//     const timer = setTimeout(() => {
//       setIsSiteReady(true);
//     }, 2500); // 2.5 seconds for a premium feel

//     return () => clearTimeout(timer);

//   }, []);

//   if (loading) return null; // Prevents "flashing" the login page on refresh
//   return (
//     <>
//   {/* <CartProvider> */}
//     <AnimatePresence mode="wait">
//         {!isSiteReady && <SiteLoading key="loader" />}
//       </AnimatePresence>

//   <div className={!isSiteReady ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/shoes" element={<Shoes />} />
//           <Route path="/wardrobe" element={<Wardrobe />} />
//           <Route path="/jewelry" element={<Jewelry />} />
//           <Route path="/hoodie" element={<HoodieGallery />} />
//           <Route path="/tshirt" element={<Tshirt />} />
//           <Route path="/watches" element={<Watche />} />
//           <Route path="/couples-outfit" element={<CouplePage />} />
//           <Route path="/shorts" element={<ShortsPage />} />
//           <Route path="/fall-clothes" element={<FallPage />} />
//           <Route path="/baggy-jeans" element={<BaggyJeansPage />} />
//           <Route path="/blog" element={<BlogPage />} />
//           <Route path="/jewelry/:type" element={<JewelryCategoryPage />} />
//           <Route path="/shoes/:type" element={<ShoeCategoryPage />} />
//           {/* <Route path="/cart" element={<CartPage />} /> */}
//           <Route 
//             path="/my-orders" 
//             element={user ? <OrdersPage /> : <Navigate to="/login" />} 
//           />

//           {/* Auth Routes */}
//           <Route path="/auth" element={<Auth setUser={setUser}/>} />
//           <Route path="/signup" element={<Auth setUser={setUser}/>} />
//           <Route path="/login" element={<Auth setUser={setUser}/>} />
//           <Route path="/forgot-password" element={<Auth setUser={setUser}/>} />
//           <Route path="/reset-password" element={<Auth setUser={setUser}/>} />

//           {/* Protected Admin Route */}
//           <Route 
//             path="/secret-owner-panel" 
//             element={
//               (user?.role === 'admin') 
//                 ? <OwnerDashboard /> 
//                 : <Navigate to="/login" />
//             } 
//           />

//           {/* Protected User Route */}
//           <Route 
//             path="/profile" 
//             element={
//               (user) 
//               ? <Profile /> 
//               : <Navigate to="/login" />
//             } 
//           />
//           </Routes>
//         </Router>
//      </div>
//      {/* </CartProvider> */}
//     </>
//   );
// }

// export default App;






  import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { AnimatePresence } from "framer-motion";
  import { CartProvider } from "./context/CartContext";
  import { Toaster } from 'sonner';

  // Pages
  import Home from './pages/Home';
  import Profile from './pages/profile';
  import OwnerDashboard from './pages/OwnerDashboard';
  import Wardrobe from "./pages/Wardrobe";
  import Watche from './pages/watches';
  import Shoes from './pages/shoes';
  import Tshirt from './pages/t-shirt';
  import Jewelry from './pages/Glitz-jewelry';
  import Auth from "./pages/Auth";
  import HoodieGallery from "./pages/hoodie";
  import CouplePage from './pages/CoupleOutfit';
  import ShortsPage from './pages/Shorts';
  import FallPage from "./pages/Fallclothes";
  import BaggyJeansPage from './pages/BaggyJeans';
  import BlogPage from "./pages/Blog";
  import JewelryCategoryPage from "./pages/JewelryCategoryPage";
  import ShoeCategoryPage from "./pages/ShoeCategoryPage";
  import OrdersPage from "./pages/OrdersPage";
  import CheckoutPage from "./pages/Checkout";
  import CartPage from './pages/Cartpage';
  import ManifestoPage from './pages/ManifestoPage';
  import PrivacyPolicy from './pages/Privacy';
  import Terms from './pages/Terms';
  import HelpCenter from './pages/Help';
  import Info from './pages/info';
  import Contact from './pages/Contact';
  import About from './pages/About';


  // Components
  import SiteLoading from "./component/SiteLoading";

  interface UserData {
    role: string;
    email?: string;
  }

  // const getStoredUser = (): UserData | null => {
  //   const saved = localStorage.getItem("user");
  //   try {
  //     return saved ? JSON.parse(saved) : null;
  //   } catch {
  //     return null;
  //   }
  // };

  // FIX: Added React.FC return type to fix the "implicitly has any" error
 const App: React.FC = () => {
  // Layer 1: Immediate state recovery from storage
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    // ONLY set user if BOTH token and user object exist
    if (savedUser && token) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  // const [loading, setLoading] = useState(false);
  const [isSiteReady, setIsSiteReady] = useState(false);

  useEffect(() => {
    // Timer for your custom loading screen
    const timer = setTimeout(() => {
      setIsSiteReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

    // if (loading) return null;

    return (
      <CartProvider>
        <>
        <Toaster 
        theme="dark" 
        position="top-center" 
        richColors 
        closeButton
        toastOptions={{
          style: {
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: '16px',
          },
        }}
      />
      
        <AnimatePresence mode="wait">
          {!isSiteReady && <SiteLoading key="loader" />}
        </AnimatePresence>

        <div className={!isSiteReady ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
          <Router>
            <Routes>
              {/* 
                   PUBLIC ROUTES
                  Accessible by everyone
              */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth setUser={setUser} />} />
              <Route path="/login" element={<Auth setUser={setUser} />} />
              <Route path="/signup" element={<Auth setUser={setUser} />} />
              
              {/* Information pages (Optional: Keep public or lock them) */}
              <Route path="/vault" element={<ManifestoPage />} />
              <Route path="/info" element={<Info />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />

              {/*
                   PROTECTED ROUTES
                  Only accessible if 'user' is logged in
              */}
              
              {/* Main Collection Pages */}
              <Route path="/wardrobe" element={user ? <Wardrobe /> : <Navigate to="/signup" />} />
              <Route path="/shoes" element={user ? <Shoes /> : <Navigate to="/signup" />} />
              <Route path="/jewelry" element={user ? <Jewelry /> : <Navigate to="/signup" />} />
              <Route path="/hoodie" element={user ? <HoodieGallery /> : <Navigate to="/signup" />} />
              <Route path="/tshirt" element={user ? <Tshirt /> : <Navigate to="/signup" />} />
              <Route path="/watches" element={user ? <Watche /> : <Navigate to="/signup" />} />
              <Route path="/couples-outfit" element={user ? <CouplePage /> : <Navigate to="/signup" />} />
              <Route path="/shorts" element={user ? <ShortsPage /> : <Navigate to="/signup" />} />
              <Route path="/fall-clothes" element={user ? <FallPage /> : <Navigate to="/signup" />} />
              <Route path="/baggy-jeans" element={user ? <BaggyJeansPage /> : <Navigate to="/signup" />} />
              
              {/* Category & Dynamic Routes */}
              <Route path="/jewelry/:type" element={user ? <JewelryCategoryPage /> : <Navigate to="/signup" />} />
              <Route path="/shoes/:type" element={user ? <ShoeCategoryPage /> : <Navigate to="/signup" />} />
              <Route path="/collections/tshirts" element={user ? <Tshirt /> : <Navigate to="/signup" />} />

              {/* Shopping & Profile */}
              <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/signup" />} />
              <Route path="/my-orders" element={user ? <OrdersPage /> : <Navigate to="/signup" />} />
              <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/signup" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signup" />} />
              <Route path="/blog" element={user ? <BlogPage /> : <Navigate to="/signup" />} />

              {/* Legal & Help (Locking these ensures only members see policies) */}
              <Route path="/Privacy" element={user ? <PrivacyPolicy /> : <Navigate to="/signup" />} />
              <Route path="/terms" element={user ? <Terms /> : <Navigate to="/signup" />} />
              <Route path="/help" element={user ? <HelpCenter /> : <Navigate to="/signup" />} />

              {/* Admin Panel */}
              <Route 
                path="/secret-owner-panel" 
                element={user?.role === 'admin' ? <OwnerDashboard /> : <Navigate to="/signup" replace />} 
              />
            </Routes>
          </Router>
        </div>
        </>
      </CartProvider>
    );
  };

  export default App;