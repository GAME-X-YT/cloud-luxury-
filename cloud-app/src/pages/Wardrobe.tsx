
// import CollectNavbar from "../component/collectNav";

// const Collections = () => {
//   return (
//     <div className="flex">

//       {/* Vertical Navbar */}
//       <CollectNavbar />

//       {/* Main content */}
//       <div className="flex-1 p-10">
//         <h2 className="text-3xl font-bold mb-6">Cloud Luxury Collection (C.L.C)</h2>

//         <p className="text-gray-700 mb-6">
//           Browse our premium categories and discover your style.
//         </p>

//         {/* Example Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           <div className="p-4 bg-white shadow rounded">Product 1</div>
//           <div className="p-4 bg-white shadow rounded">Product 2</div>
//           <div className="p-4 bg-white shadow rounded">Product 3</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collections;



import CollectNavbar from "../component/wardrobeNav";        
import { Link } from "lucide-react";




// products.js — 60 products with real online images

export const products = [
  { id: 1, name: "Cashay Tapastry Jacket (CTJ)", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: 2, name: "Urban Black Hoodie", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 3, name: "Golden Cloud Jacket", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 4, name: "Vintage Denim Jacket", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 5, name: "Luxury Trench Coat", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 6, name: "Premium Beige Hoodie", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 7, name: "Royal Blue Oversize Jacket", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 8, name: "Cloudline Puffer Jacket", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 9, name: "Shadow Black Jacket", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 10, name: "Signature Luxury Coat", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },

  { id: 11, name: "Ice White Hoodie", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 12, name: "Brown Leather Coat", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 13, name: "Classic Denim Grey", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 14, name: "Night Rider Jacket", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 15, name: "Premium Softshell Hoodie", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 16, name: "Black Tactical Jacket", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 17, name: "Royal Cloud Hoodie", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 18, name: "Ash Grey Jacket", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 19, name: "Vintage Blue Hoodie", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 20, name: "Streetline Jacket", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },

  { id: 21, name: "Royal White Jacket", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 22, name: "Dark Coffee Coat", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 23, name: "Grey Storm Hoodie", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 24, name: "Mocha Luxury Jacket", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 25, name: "Cloud Pink Coat", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 26, name: "Taupe Classic Hoodie", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 27, name: "Premium Shadow Jacket", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 28, name: "Ice Clean Coat", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 29, name: "Classic Navy Hoodie", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 30, name: "Brown Matte Jacket", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },

  { id: 31, name: "Soft Black Cloud Hoodie", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 32, name: "Luxury Blue Jacket", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 33, name: "Creamy White Hoodie", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 34, name: "Vintage Brown Coat", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 35, name: "Luxury Mountain Jacket", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 36, name: "Cloudline Fashion Hoodie", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 37, name: "Jet Black Bomber", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 38, name: "Olive Seasonal Coat", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 39, name: "White Luxe Hoodie", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 40, name: "Greyline Air Jacket", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },

  { id: 41, name: "Stone White Coat", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 42, name: "Midnight Blue Hoodie", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 43, name: "Classic Leather Black", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 44, name: "Royal Beige Jacket", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 45, name: "Cream Cloud Coat", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 46, name: "Brown Fury Hoodie", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 47, name: "Soft Grey Coat", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 48, name: "Night Brown Jacket", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 49, name: "Luxury Jet Hoodie", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 50, name: "Classic Street Coat", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },

  { id: 51, name: "Deep Snow Hoodie", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 52, name: "Premium Black Coat", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 53, name: "Sandline Hoodie", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 54, name: "Royal Navy Jacket", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 55, name: "Cloud Grey Jacket", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 56, name: "Vintage Ash Coat", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
  { id: 57, name: "Dark Shadow Hoodie", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { id: 58, name: "Taupe Luxury Jacket", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 59, name: "Premium Cloudline Coat", image: "https://images.unsplash.com/photo-1531845116688-1f9f31b5f62e" },
  { id: 60, name: "Signature Storm Jacket", image: "https://images.unsplash.com/photo-1520975918319-89d43e3c76e0" },
];



const Collections = () => {
  return (
    <div className="flex">
      <CollectNavbar />

      <div className="flex-1 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mt-auto">
          {products.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white shadow rounded-xl flex items-center gap-4"
            >
              <img
                src={item.image}  
                alt={item.name}
                className="rounded-2xl h-32 w-32 object-cover"
              />

              <div className="flex flex-col">
                <p className="text-gray-800 font-medium mb-9">{item.name}</p>

                <Link
                  to={`/order/${item.id}`}
                  className="w-19 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Order now
                </Link>
                {/* <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-700 transition">
                  Order Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
