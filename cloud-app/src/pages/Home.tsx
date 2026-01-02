// import { motion } from "framer-motion";
// // import { useParams } from "react-router-dom";
// // import ProductsCategoryPage from "./pages/ProductsCategoryPage";
// import { useState, useEffect, useRef,  } from "react";
// import Navbar from "../component/HomeNavbar"; 
// import cloud001 from "../assets/cloud001.jpg";
// import cloude002 from "../assets/cloud002.jpg";
// import cloud003 from "../assets/cloud003.jpg";
// import cloud004 from "../assets/cloud004.jpg";
// import  Dpic  from "../assets/roundpic.png";
// import roundpic2 from "../assets/roundpic002.png";
// import blackpic from "../assets/black.jpg";
// import cloudvid from "../video/cloudvid.mp4"; 
// import rocks from "../assets/rock.png"


// const Home = () => {
//   const products = [
//     { id: 1, img: cloud001, name: "cloud up and down", price: "$25.00" },
//     { id: 2, img: cloude002, name: "cloud nike", price: "$30.00" },
//     { id: 3, img: cloud003, name: "cloude hoode", price: "$40.00" },
//     { id: 4, img: cloud004, name: "cloud sunglasses", price: "$20.00" },
//     { id: 5, img: blackpic, name: "cloudy hat", price: "$15.00" },
//     { id: 6, img: blackpic, name: "cloudy hat", price: "$35.00" },
    
//   ];

//   // Image list for the marquee
//   const fashionImages = [
//     "https://img.kwcdn.com/product/fancy/c271e893-cde0-4e1c-b077-7811c30c4eda.jpg?imageView2/2/w/800/q/70/format/webp",
//     "https://img.kwcdn.com/product/algo_check/auto/a3244fb30435e454df2d8bc6f90fb2fd_1728207890678.jpg?imageView2/2/w/800/q/70/format/webp",
//     "https://img.kwcdn.com/product/fancy/b9bb200c-f677-4abc-bd5a-f8af1bda69d6.jpg?imageView2/2/w/800/q/70/format/webp",
//     "https://img.kwcdn.com/product/fancy/a8e291e5-fd2a-46c2-82e9-e5ef6a584d07.jpg?imageView2/2/w/800/q/70/format/webp",
//     "https://img.kwcdn.com/product/fancy/76ac683c-e7c1-4c26-9bfc-321db1733469.jpg?imageView2/2/w/800/q/70/format/webp",
//     "https://img.kwcdn.com/product/fancy/77025e1e-1ab1-49a8-b49b-ead9828b7408.jpg?imageView2/2/w/800/q/70/format/webp",
// ];

// const fashionImagesTwo = [
//   "https://img.kwcdn.com/product/fancy/e11d1a68-85de-4342-bb38-640c42050825.jpg?imageView2/2/w/800/q/70/format/webp",
//   "https://i.pinimg.com/736x/2e/8f/f0/2e8ff01691120a020ae05aa7974b4855.jpg",
//   "https://img.kwcdn.com/product/fancy/d58e785d-e9da-466d-b1a9-f70a70f6be5a.jpg?imageView2/2/w/800/q/70/format/webp",
//   "https://i.pinimg.com/736x/d9/a7/c9/d9a7c993eeccc0667bafcafa3604aecc.jpg",
//   "https://i.pinimg.com/736x/70/e0/74/70e07484f6f9e34f1845376d5f5337b2.jpg",
//   "https://i.pinimg.com/736x/28/0f/53/280f539c6e9edf0c3b069ddb3b8815ba.jpg",
// ];

// // HERO IMAGES 
// const changeImages = [
//   "https://img.kwcdn.com/product/fancy/e11d1a68-85de-4342-bb38-640c42050825.jpg?imageView2/2/w/800/q/70/format/webp",
//   "https://i.pinimg.com/736x/2e/8f/f0/2e8ff01691120a020ae05aa7974b4855.jpg",
//   "https://img.kwcdn.com/product/fancy/d58e785d-e9da-466d-b1a9-f70a70f6be5a.jpg?imageView2/2/w/800/q/70/format/webp",
//   "https://i.pinimg.com/736x/d9/a7/c9/d9a7c993eeccc0667bafcafa3604aecc.jpg",
//   "https://i.pinimg.com/736x/70/e0/74/70e07484f6f9e34f1845376d5f5337b2.jpg",
//   "https://i.pinimg.com/736x/28/0f/53/280f539c6e9edf0c3b069ddb3b8815ba.jpg",
//   "https://i.pinimg.com/1200x/30/77/68/307768a8e3643e0d04e828018c7c4096.jpg",
//   Dpic,
//   roundpic2,
// ];

// const [currentImage, setCurrentImage] = useState(0);
// const [isHovered] = useState(false);

// // Auto-change images every 5 seconds (pauses on hover)
// useEffect(() => {
//   if (isHovered) return; // pause on hover

//   const interval = setInterval(() => {
//     setCurrentImage((prev) =>
//       prev === changeImages.length - 1 ? 0 : prev + 1  // loop back to previous start
//     ); //If the current image is the last one → go back to the first image (0)
//   }, 5000); // Change image every 5 seconds

//   return () => clearInterval(interval);
// }, [isHovered]);

//     const videoRef = useRef(null);

//   if (videoRef.current) {
//     (videoRef.current as HTMLVideoElement).playbackRate = 0.5; // Slow down video playback speed
//   }

  

//   return (
   
//       <div className=" w-full min-h-screen overflow-hidden">

//          <Navbar/>

//       {/* 🔥 Background Video */}
//         <video
//               ref={videoRef}
//               className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
//               autoPlay
//               loop
//               muted
//               playsInline
//             >
//             <source src={cloudvid} type="video/mp4" />
//         </video>
      
//          {/* HERO SECTION */}
//           <section className="h-screen flex flex-col md:flex-row items-center px-10 space-x-67 md:space-y-0 justify-center">

//             {/* Text */}
//             <div className="text-center md:text-left max-w-xl rounded-3xl h-[90px] md:h-[150px] px-6 md:px-10 py-4 md:py-8 mb-10 md:mb-0">
//               <h1 className="text-5xl ole-bold mb-4 text-gray-900">Cloud Luxury Style</h1>
//               <p className="text-lg text-gray-700 ole-regular">
//                 Discover the latest fashion trends just for you
//               </p>
//             </div>


//                {/* 🔥 Center Hero Image (Auto-changing) */}
//               <div className="hidden min-[1400px]:flex justify-center items-center">

//                 <motion.img
//                   key={currentImage}
//                   src={changeImages[currentImage]}
//                   alt="Hero Image"
//                   className=" w-[350px] object-cover z-10 rounded-full opacity-200"
//                   initial={{ opacity: 30 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.8, ease: "easeInOut" }}
//                 />
//               </div>
//           </section>
//           {/* {bg image} */}
//         <div className="bg-cover bg-center"
//             style={{ backgroundImage: `url(${rocks})` }}>

//               {/* 🔥 Dual Motion Marquee Section */}
//               <section className="relative h-[70vh] w-full flex flex-col justify-center space-y-8 py-8 text-center"
//               >
//                 {/* Row 1 → moves right to left */}
//                 <motion.div
//                   className="flex gap-4 min-w-max"
//                   animate={{ x: ["0%", "-30%"] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 25,
//                     ease: "linear",
//                   }}
//                 >
//                   {[...Array(3)].flatMap(() =>
//                     fashionImages.map((src, index) => (
//                       <img
//                         key={`row1-${index}-${src}`}
//                         src={src}
//                         alt={`Fashion item ${index + 1}`}
//                         className="w-50 h-50 object-cover rounded-xl shadow-lg shrink-0"
//                       />
//                     ))
//                   )}
//                 </motion.div>

//                 {/* Row 2 → moves left to right */}
//                 <motion.div
//                   className="flex gap-4 min-w-max"
//                   animate={{ x: ["-30%", "0%"] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 25,
//                     ease: "linear",
//                   }}
//                 >
//                   {[...Array(2)].flatMap(() =>
//                     fashionImagesTwo.map((src, index) => (
//                       <img
//                         key={`row2-${index}-${src}`}
//                         src={src}
//                         alt={`Fashion item Two ${index + 1}`}
//                         className="w-60 h-40 object-cover rounded-xl shadow-lg shrink-0"
//                       />
//                     ))
//                   )}
//                 </motion.div>
//               </section>

//           {/* Product Grid Section */}
//           <section
//           className="p-10">

//             <h2 className="text-3xl croissant-one-bold mb-8 text-center text-gray-800">
//               Featured Products
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 wrap-anywhere">

//               {products.map((product) => (
//                 <div
//                   key={product.id}
//                   className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition w-full"
//                 >
//                   {/* Image */}
//                   <div className="overflow-hidden">
//                     <img
//                       src={product.img}
//                       alt={product.name}
//                       className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-500"
//                     />
//                   </div>

//                   {/* Panel ALWAYS visible + hover adds extra lift */}
//                   <div
//                     className="
//                       absolute bottom-0 left-0 w-full bg-black/70 text-center py-5 px-4

//                     { /* ALWAYS visible */}
//                       translate-y-0

//                       {/* Hover gives a small extra slide-up */}
//                       group-hover:translate-y-2

//                       transition-all duration-500 ease-in-out
//                     "
//                   >
//                     <h3 className="text-white text-lg font-semibold">{product.name}</h3>
//                     <p className="text-gray-200 mb-3">{product.price}</p>

//                   <button
//                     onClick={() => (window.location.href = "/categories")}
//                     className="bg-white text-black px-4 py-2 rounded-full"
//                   >
//                     Shop Now
//                   </button>

//                   </div>

//                 </div>
//               ))}
//             </div>
//           </section>
//       </div>
//     </div>
//   );
// };

// export default Home;





// Updated Home component with TypeScript type fixes
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/HomeNavbar";
import Dpic from "../assets/roundpic.png";
import roundpic2 from "../assets/roundpic002.png";
import cloudvid from "../video/cloudvid.mp4";
import FloatingUniverse from "../DataItem/FloatingUniverse";
import CinematicFinalSection from "../DataItem/Cinematic";
import CinematicFooter from "../component/cinematicfooter";
// import rocks from "../assets/rock.png";

interface Product {
  id: string;
  img: string;
  name: string;
  price: string;
  category: string; 
}

const images = [
  //shots
  { src: "https://i.pinimg.com/736x/4d/b4/70/4db4706fd503307fcabfc485573db654.jpg", text: "Short on length ★ long on style"

   },

   //shoes
  { src: "https://i.pinimg.com/1200x/c6/83/90/c683902acf2b0740aacc76eff0440858.jpg", text: "Crafted for all-day comfort ◊ trusted for the long run" },

  //t-shirts
  { src: "https://i.pinimg.com/1200x/e5/4b/e8/e54be81bbf68a7911feb343e136f349c.jpg", text: "Designed for comfort 🌢 built for durability" },

  //hoodies
  { src: "https://i.pinimg.com/736x/9e/d5/5b/9ed55ba70993f9b3402496c3b80e1a64.jpg", text: "The perfect weight. Constructed with durable fabric and a relaxed ✧ structured fit that keeps its shape season after season." },

  //jewelry
  { src: "https://i.pinimg.com/1200x/28/ec/e4/28ece40956d4527a605307839c15e7ae.jpg", text: "◎ Every piece is meticulously crafted to catch the light and designed to become your signature detail ◎" },

  //baggy pants
  { src: "https://i.pinimg.com/1200x/da/76/98/da7698505f92961a1e85788819b4ca63.jpg", text: "⊛ The essential foundation for any oversized look; layer up and keep the vibe chill ⊛" },


  { src: "https://i.pinimg.com/736x/af/eb/46/afeb46fdf5a26987df57e9fc6ad01831.jpg", text: "✵ The perfect slouch and volume for a modern, street-inspired silhouette ✵" },

  // { src: "https://i.pinimg.com/736x/fb/de/e8/fbdee8643593887892ff26d19fb1b90d.jpg", text: "This is image 6 description" },

];

const Home = () => {
  const navigate = useNavigate();

const products: Product[] = [
  { id: "shoes", img: "https://i.pinimg.com/1200x/49/ba/fd/49bafd30a74d89f332974a82a569ea64.jpg", name: "Cloud Shoes", price: "$25.00", category: "shoes" },

  { id: "T-shirt", img: "https://i.pinimg.com/1200x/5d/72/d0/5d72d03bf3775cb1d35ae6fe517e2ae0.jpg", name: "Cloud T-Shirt", price: "$30.00", category: "Tshirt" },

  { id: "couples-outfit", img: 'https://i.pinimg.com/736x/58/b2/d4/58b2d4afaae9ee6953344f5c3dccb318.jpg', name: "Cloud couples outfit", price: "$100.00", category: "couples-outfit" },

  { id: "shorts", img: 'https://i.pinimg.com/1200x/ab/80/0f/ab800f0858bd56e7842f7c002d62f9ea.jpg', name: "Cloud Shorts", price: "$20.00", category: "shorts" },

  { id: "hoodie", img: 'https://i.pinimg.com/1200x/b1/b1/4a/b1b14a9a796fb6ffdab193d0abc19fb8.jpg', name: "Cloud Hoodie", price: "$35.00", category: "hoodie" },

  { id: "jewelry", img: 'https://i.pinimg.com/1200x/95/9d/20/959d20787fd5a8a0862fcb1668c7d646.jpg', name: "jewelry",price: "", category: "jewelry" },

];

  const fashionImages: string[] = [
    "https://img.kwcdn.com/product/fancy/c271e893-cde0-4e1c-b077-7811c30c4eda.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://img.kwcdn.com/product/algo_check/auto/a3244fb30435e454df2d8bc6f90fb2fd_1728207890678.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://img.kwcdn.com/product/fancy/b9bb200c-f677-4abc-bd5a-f8af1bda69d6.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://img.kwcdn.com/product/fancy/a8e291e5-fd2a-46c2-82e9-e5ef6a584d07.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://img.kwcdn.com/product/fancy/76ac683c-e7c1-4c26-9bfc-321db1733469.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://img.kwcdn.com/product/fancy/77025e1e-1ab1-49a8-b49b-ead9828b7408.jpg?imageView2/2/w/800/q/70/format/webp",
  ];

  const fashionImagesTwo: string[] = [
    "https://img.kwcdn.com/product/fancy/e11d1a68-85de-4342-bb38-640c42050825.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://i.pinimg.com/736x/2e/8f/f0/2e8ff01691120a020ae05aa7974b4855.jpg",
    "https://img.kwcdn.com/product/fancy/d58e785d-e9da-466d-b1a9-f70a70f6be5a.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://i.pinimg.com/736x/d9/a7/c9/d9a7c993eeccc0667bafcafa3604aecc.jpg",
    "https://i.pinimg.com/736x/70/e0/74/70e07484f6f9e34f1845376d5f5337b2.jpg",
    "https://i.pinimg.com/736x/28/0f/53/280f539c6e9edf0c3b069ddb3b8815ba.jpg",
  ];

  const changeImages: (string | typeof Dpic)[] = [
    "https://img.kwcdn.com/product/fancy/e11d1a68-85de-4342-bb38-640c42050825.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://i.pinimg.com/736x/2e/8f/f0/2e8ff01691120a020ae05aa7974b4855.jpg",
    "https://img.kwcdn.com/product/fancy/d58e785d-e9da-466d-b1a9-f70a70f6be5a.jpg?imageView2/2/w/800/q/70/format/webp",
    "https://i.pinimg.com/736x/d9/a7/c9/d9a7c993eeccc0667bafcafa3604aecc.jpg",
    "https://i.pinimg.com/736x/70/e0/74/70e07484f6f9e34f1845376d5f5337b2.jpg",
    "https://i.pinimg.com/736x/28/0f/53/280f539c6e9edf0c3b069ddb3b8815ba.jpg",
    "https://i.pinimg.com/1200x/30/77/68/307768a8e3643e0d04e828018c7c4096.jpg",
    Dpic,
    roundpic2,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === changeImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

    const goToCategoryPage = (category: string) => {
      navigate(`/${category}`);
    };


  return (
    <div className="w-full min-h-screen overflow-hidden">
      <Navbar />

      {/* 🔥 Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={cloudvid} type="video/mp4"/>
      </video>

              {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 md:px-16 lg:px-24 pt-20">
        
        {/* 🔥 FLOATING TEXT CONTENT */}
        <motion.div 
          // This creates the continuous floating effect
          animate={{ 
            // This controls the movement distance (y)
            y: [0, -15, 0],
          }}
          transition={{ 
            // Lower number = Faster bounce
            duration: 3, 
            repeat: Infinity, 
            // "easeInOut" makes the top and bottom of the bounce feel smooth
            ease: "easeInOut" 
          }}
          className="z-10 text-center lg:text-left max-w-2xl lg:mr-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl ole-regular mb-6 text-black leading-tight drop-shadow-2xl">
              Cloud <br />
              <span className="text-yellow-500">Luxury</span> Style
            </h1>
            <p className="text-lg md:text-xl text-gray-800 font-light tracking-widest max-w-md mx-auto lg:mx-0 opacity-80 italianno-regular">
              Discover the latest fashion trends curated for the perfect stride.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#6259de", color: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/wardrobe')}
              className="mt-10 px-10 py-4 border border-blue-900 text-blue-700 rounded-full text-xs uppercase tracking-[0.3em] backdrop-blur-sm transition-all"
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Dynamic Animated Image - Now Visible & Responsive */}
        <div className="relative hidden lg:block w-full max-w-[300px] md:max-w-[450px] lg:max-w-[500px] aspect-square justify-center items-center">
          
          {/* Decorative Rotating Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-yellow-500/40 rounded-full"
          />

          {/* The Changing Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="w-full h-full p-4"
            >
              <img
                src={changeImages[currentImage]}
                alt="Luxury Fashion"
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/10"
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}

            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 bg-yellow-500 text-black w-20 h-20 rounded-full flex items-center justify-center text-[10px] font-bold uppercase text-center p-2 shadow-xl border-2 border-black"
          >
            New <br /> Drop
          </motion.div>
        </div>
      </section>

      {/* {bg image} */}

      <div className="bg-linear-to-b from-gray-200 to-gray-900 bg-cover bg-center" 
          // style={{ 
          //   backgroundImage: `url(${rocks})` 
          //   }}
      >

                {/* 🔥 High-Fashion Dual Motion Marquee Section */}
        <section className="relative min-h-[80vh] w-full flex flex-col justify-center space-y-12 py-20 overflow-hidden bg-transparent">
          
          {/* Background Text Decor */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[20vw] font-black uppercase italic">Vogue</h2>
          </div>

          {/* First Marquee: Moving Left */}
          <div className="group relative flex overflow-hidden">
            <motion.div 
              className="flex gap-6 min-w-max px-4" 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ 
                repeat: Infinity, 
                duration: 35, 
                ease: "linear" 
              }}
              // Pauses the marquee when hovering anywhere in the row
              whileHover={{ transition: { duration: 60 } }} 
            >
              {[...Array(4)].flatMap((_, i) => 
                fashionImages.map((src, index) => (
                  <motion.div
                    key={`row1-${i}-${index}`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 2,
                      zIndex: 50,
                    }}
                    className="relative w-64 h-80 cursor-pointer transition-all duration-500"
                  >
                    <img 
                      src={src} 
                      className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10" 
                      alt="Fashion Look"
                    />
                    {/* Hover Glass Overlay */}
                    <div className="absolute inset-0 bg-yellow-500/10 opacity-0 hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white pb-1">View</span>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>

        {/* Second Marquee: Moving Right */}
        <div className="group relative flex overflow-hidden">
          <motion.div 
            className="flex gap-6 min-w-max px-4" 
            animate={{ x: ["-50%", "0%"] }} 
            transition={{ 
              repeat: Infinity, 
              duration: 40, 
              ease: "linear" 
            }}
            whileHover={{ transition: { duration: 80 } }}
          >
            {[...Array(4)].flatMap((_, i) => 
              fashionImagesTwo.map((src, index) => (
                <motion.div
                  key={`row2-${i}-${index}`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: -2,
                    zIndex: 50
                  }}
                  className="relative w-80 h-56 cursor-pointer transition-all duration-500"
                >
                  <img 
                    src={src} 
                    className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10" 
                    alt="Fashion Look"
                  />
                  {/* Hover Glass Overlay */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Lookbook</span>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="max-w-xs mx-auto h-px bg-linear-to-r from-transparent via-yellow-500/50 to-transparent" />
      </section>

          {/* 🔥 High-Fashion Alternating Scroll Section */}
        <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-transparent">
          
          {/* Optional: Background Ambient Light */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 blur-[150px] -z-10" />

          {images.map((item, index) => (
            <motion.div
              key={index}
              className={`
                flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-40
                ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
              `}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              
              {/* 📸 IMAGE CONTAINER with Mask Reveal */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, clipPath: "inset(10% 10% 10% 10% rounded 100%)" },
                  visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0% rounded 100%)" }
                }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="relative w-full sm:w-[400px] lg:w-[450px] aspect-4/5 md:aspect-square shrink-0"
              >
                <img
                  src={item.src}
                  alt={`collection-${index}`}
                  className="w-full h-full object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                />
                
                {/* Decorative Floating Number */}
                <span className="absolute -top-6 -left-6 text-7xl font-serif italic text-white/5 select-none hidden lg:block">
                  0{index + 1}
                </span>
              </motion.div>

              {/* ✍️ TEXT CONTENT with Floating Animation */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 1, delay: 0.3 }}
                className="max-w-md relative"
              >
                {/* The Golden Blur behind text */}
                <div className={`absolute -z-10 w-64 h-64 ${index % 2 === 0 ? "bg-yellow-500/10" : "bg-blue-500/10"} blur-[80px] -top-20`} />

                <div className="space-y-6">
                  <div className="h-px w-12 bg-yellow-500" />
                  
                  <p className="text-3xl md:text-4xl leading-snug rochester-regular text-white italic tracking-wide">
                    {item.text}
                  </p>

                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-yellow-500/60 text-[10px] uppercase tracking-[0.5em] font-bold cursor-pointer"
                  >
                    <span>Explore Details</span>
                    <div className="h-px w-6 bg-yellow-500/40" />
                  </motion.div>
                </div>
              </motion.div>

            </motion.div>
          ))}
        </section>


        {/* Product Grid Section */}
        
        <section className="p-10">

          <h2 className="text-3xl rancho-regular mb-8 text-center text-gray-200">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {products.map((product) => (
              <div 
              key={product.id} 
              className="relative group rounded-3xl overflow-hidden shadow-lg cursor-pointer" 
               onClick={() => goToCategoryPage(product.category)}
              >

                <div className="overflow-hidden">

                  <img src={product.img} 
                  alt={product.name} 
                  className="w-full h-64 object-cover transform group-hover:scale-110 duration-500" />
                </div>

                <div className="absolute bottom-0 left-0 w-full bg-black/70 text-center py-5 px-4 translate-y-0 group-hover:translate-y-2 duration-500">

                  <h3 className="text-white text-lg cinzel-regular mb-1">{product.name}</h3>

                  {/* <p className="text-gray-200 mb-3">{product.price}</p> */}

                  <button className="bg-white text-black px-4 py-2 rounded-full">
                    View collections
                  </button>

                </div>
              </div>

            ))}
          </div>
          {/* 🔥 NEW SECTION ADDED HERE */}
      <FloatingUniverse />
      
        </section>

      </div>
      {/* animated section*/}

      <CinematicFinalSection />

    {/* The Footer sits right below the final section */}
          <CinematicFooter />

    </div>
  );
};

export default Home;