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
import { motion, } from "framer-motion";
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

  { src: "https://i.pinimg.com/736x/fb/de/e8/fbdee8643593887892ff26d19fb1b90d.jpg", text: "This is image 6 description" },

];

const Home = () => {
  const navigate = useNavigate();

const products: Product[] = [
  { id: "shoes", img: "https://i.pinimg.com/1200x/49/ba/fd/49bafd30a74d89f332974a82a569ea64.jpg", name: "Cloud Shoes", price: "$25.00", category: "shoes" },

  { id: "T-shirt", img: "https://i.pinimg.com/1200x/5d/72/d0/5d72d03bf3775cb1d35ae6fe517e2ae0.jpg", name: "Cloud T-Shirt", price: "$30.00", category: "T-shirt" },

  { id: "jewelry", img: 'https://i.pinimg.com/736x/58/b2/d4/58b2d4afaae9ee6953344f5c3dccb318.jpg', name: "Cloud couples outfit", price: "$40.00", category: "couples outfit" },

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
        <source src={cloudvid} type="video/mp4" />
      </video>

      {/* HERO SECTION */}
        <section className="h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 lg:px-24">

        <div className="text- md:text-left max-w-xl md:mr-32 lg:mr-48 rounded-3xl h-[90px] md:h-[150px] px-6 md:px-10 py-4 md:py-8 mb-10 md:mb-0">

          <h1 className="text-5xl md:text-7xl ole-regular mb-4 text-gray-800">
            Cloud Luxury Style
          </h1>
          <p className="text-lg text-gray-700">
            Discover the latest fashion trends just for you
          </p>
        </div>


        {/* changing Image */}
        <div className="hidden min-[1400px]:flex justify-center items-center shrink-0">
          <motion.img
            key={currentImage}
            src={changeImages[currentImage]}
            alt="Hero Image"
            className="w-[350px] object-cover z-10 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* {bg image} */}

      <div className="bg-linear-to-b from-gray-200 to-gray-900 bg-cover bg-center" 
          // style={{ 
          //   backgroundImage: `url(${rocks})` 
          //   }}
      >

        {/* 🔥 Dual Motion Marquee Section */}
        <section className="relative h-[70vh] w-full flex flex-col justify-center space-y-8 py-8 text-center">

          {/* First Marquee */}
          <motion.div 
          className="flex gap-4 min-w-max" 
          animate={{ x: ["0%", "-30%"] }} 
          transition={{ 
            repeat: Infinity, 
            duration: 25, 
            ease: "linear" 
            }}>
            
            {[...Array(3)].flatMap(() => 
            fashionImages.map((src, index) => (
              
              <img 
              key={`row1-${index}`} 
              src={src} 
              className="w-50 h-50 object-cover rounded-xl shadow-lg" />
            )))}

          </motion.div>

          {/* Second Marquee */}
          <motion.div 
          className="flex gap-4 min-w-max" 
          animate={{ x: ["-30%", "0%"] }} 
          transition={{ 
            repeat: Infinity, 
            duration: 25, 
            ease: "linear" 
            }}>

            {[...Array(2)].flatMap(() => 
            fashionImagesTwo.map((src, index) => (

              <img 
              key={`row2-${index}`} 
              src={src} 
              className="w-60 h-40 object-cover rounded-xl shadow-lg" />
            )))}
          </motion.div>

        </section>

            {/* 🔥 Alternating Image/Text Scroll Animation Section */}

          <section className="relative py-20 px-6 md:px-16 space-y-24">

            {images.map((item, index) => (
              <motion.div
                key={index}
                className={`
                  flex flex-col md:flex-row items-center gap-10 lg:gap-20
                  ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
                `}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >

                {/* IMAGE */}
                <img
                  src={item.src}
                  alt={`image-${index}`}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 object-cover rounded-full shadow-xl"
                />

                {/* TEXT */}
                <div
                  className="
                    md:w-1/2 text-left text-gray-200 
                    p-4 md:p-6 
                    rounded-xl 
                    relative
                    transition-all duration-300 ease-in-out
                    md:max-w-[500px] md:mx-auto sm:mx-auto
                  "
                >
                  {/* BLUE BLUR CIRCLE */}
                  <div className="absolute -z-10 w-60 h-60 bg-blue-500/40 blur-3xl rounded-full -top-10 -left-10"></div>


                  <p className="text-lg leading-relaxed trade-winds-regular">
                    {item.text}
                  </p>
                </div>

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
                    learn-more
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