import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import  Wardrobe from "./pages/Wardrobe";
// import Preloader from './component/preloader'
import Shoes from './pages/shoes';
import Jewelry from './pages/Glitz-jewelry';
import Auth from "./pages/Auth";
import HoodieGallery from "./pages/hoodie";
// import SignIn from './pages/SignIn';

function App() {
  return (
    <>
    {/* <Preloader /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/shoes" element={<Shoes />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/hoodie" element={<HoodieGallery />} />
        <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Auth />} /> 
        <Route path="/forgot-password" element={<Auth />} />
       <Route path="/reset-password" element={<Auth />} />
        {/* <Route path="/signin" element={<SignIn />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
