import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState} from "react";
import Home from './pages/Home';
import Profile from './pages/profile';
import OwnerDashboard from './pages/OwnerDashboard';
import  Wardrobe from "./pages/Wardrobe";
// import Preloader from './component/preloader'
import Shoes from './pages/shoes';
import Jewelry from './pages/Glitz-jewelry';
import Auth from "./pages/Auth";
import HoodieGallery from "./pages/hoodie";
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
  }, []);
  if (loading) return null; // Prevents "flashing" the login page on refresh
  return (
    <>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/hoodie" element={<HoodieGallery />} />
        
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
    </>
  );
}

export default App;
