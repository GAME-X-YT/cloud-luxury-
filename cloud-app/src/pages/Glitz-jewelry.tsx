import GliteNavbar from "../component/gliteNavbar";        
import { products } from "../DataItem/product";


// Jewelry Collection Page
export const Collections = () => {
  return (
    <div className="flex">
      <GliteNavbar />

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

              <div className="flex flex-col text-center">
                <p className="text-gray-800 font-medium mb-9">{item.name}</p>
              <p className="text-gray-600 mb-3">{item.price}</p>

                <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-700 transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
