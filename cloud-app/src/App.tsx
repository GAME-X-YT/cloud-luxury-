import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { AnimatePresence } from "framer-motion";
import Home from './pages/Home';
import Profile from './pages/profile';
import OwnerDashboard from './pages/OwnerDashboard';
import  Wardrobe from "./pages/Wardrobe";
import Watche from './pages/watches';
// import Preloader from './component/preloader'
import Shoes from './pages/shoes';
import Tshirt from './pages/t-shirt';
import Jewelry from './pages/Glitz-jewelry';
import Auth from "./pages/Auth";
import HoodieGallery from "./pages/hoodie";
import SiteLoading from "./component/SiteLoading";
import CouplePage from './pages/CoupleOutfit';
import ShortsPage from './pages/Shorts';
import FallPage from "./pages/Fallclothes";
import BaggyJeansPage from './pages/BaggyJeans';
import BlogPage from "./pages/Blog";
import JewelryCategoryPage from "./pages/JewelryCategoryPage";
import ShoeCategoryPage from "./pages/ShoeCategoryPage";
// import SignIn from './pages/SignIn';

// Define the type for your User for better TypeScript support
  interface UserData {
    role: string;
    email?: string;
  }

  const getStoredUser = () => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  };


function App() {

  const [user, setUser] = useState<UserData | null>(getStoredUser());
  const [loading, setLoading] = useState(true);

  const [isSiteReady, setIsSiteReady] = useState(false);
  
 useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem("token");

    
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
    setLoading(false);

    const timer = setTimeout(() => {
      setIsSiteReady(true);
    }, 2500); // 2.5 seconds for a premium feel

    return () => clearTimeout(timer);

  }, []);

  if (loading) return null; // Prevents "flashing" the login page on refresh
  return (
    <>
    <AnimatePresence mode="wait">
        {!isSiteReady && <SiteLoading key="loader" />}
      </AnimatePresence>

  <div className={!isSiteReady ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/jewelry" element={<Jewelry />} />
          <Route path="/hoodie" element={<HoodieGallery />} />
          <Route path="/Tshirt" element={<Tshirt />} />
          <Route path="/watches" element={<Watche />} />
          <Route path="/couples-outfit" element={<CouplePage />} />
          <Route path="/shorts" element={<ShortsPage />} />
          <Route path="/fall-clothes" element={<FallPage />} />
          <Route path="/baggy-jeans" element={<BaggyJeansPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/jewelry/:type" element={<JewelryCategoryPage />} />
          <Route path="/shoes/:type" element={<ShoeCategoryPage />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<Auth setUser={setUser}/>} />
          <Route path="/signup" element={<Auth setUser={setUser}/>} />
          <Route path="/login" element={<Auth setUser={setUser}/>} />
          <Route path="/forgot-password" element={<Auth setUser={setUser}/>} />
          <Route path="/reset-password" element={<Auth setUser={setUser}/>} />

          {/* Protected Admin Route */}
          <Route 
            path="/secret-owner-panel" 
            element={
              (user?.role === 'admin') 
                ? <OwnerDashboard /> 
                : <Navigate to="/login" />
            } 
          />

          {/* Protected User Route */}
          <Route 
            path="/profile" 
            element={
              (user) 
                ? <Profile /> 
                : <Navigate to="/login" />
            } 
          />
          </Routes>
        </Router>
     </div>
    </>
  );
}

export default App;
