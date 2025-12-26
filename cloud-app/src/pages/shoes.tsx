import ShoeNavbar from "../component/shoeNavbar";

const Shoes = () => {

  const shoes = [
    { id: 1, name: "Cloud Runner", price: "$50", img: 'https://i.pinimg.com/1200x/d2/c3/3a/d2c33a58c6e7820e0d06317cfb4e7e8a.jpg' },
    { id: 2, name: "Cloud Casual", price: "$45", img: 'https://i.pinimg.com/736x/cc/83/95/cc83958efc039b760349483c1665e729.jpg' },
    { id: 3, name: "Cloud Sport", price: "$60", img: 'https://i.pinimg.com/1200x/bc/4d/7c/bc4d7ccc682a2430972ed7dfd3ac3354.jpg' },
    { id: 4, name: "Cloud Formal", price: "$70", img: 'https://i.pinimg.com/736x/cc/1c/74/cc1c7499482be586aac10cbd1ec34671.jpg' },
    { id: 5, name: "Cloud Sneaker", price: "$55", img: 'https://i.pinimg.com/736x/40/f7/a5/40f7a5d416af98486c0fd41ec54ad56b.jpg' },
    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/1f/e7/d8/1fe7d816ad1b3ed0eb8ffe5d53b8c503.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/736x/6a/f6/43/6af6434e6c8e771b1486fed81522613a.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/cb/59/e4/cb59e4a782f5aeb7a7ddbfc97e37710b.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/73/08/84/73088443244cfbd1be527d056356b67b.jpg" },

    { id: 6, name: "Basketball shoes", price: "$40", img: "https://i.pinimg.com/1200x/66/2f/8c/662f8c7a9f2fe77b181c9047438164fc.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/14/d3/82/14d382a484f032dd8935f5548d97ad9d.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: 'https://i.pinimg.com/474x/46/26/f3/4626f3bbe8e79c6e947dc5a6ae08ee49.jpg' },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/474x/8c/93/dd/8c93ddfa077c73fb919de29c8754b831.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/736x/1f/6d/66/1f6d66ebb2b7b6236e67cf5037890c5c.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/da/95/08/da950825604647cca84602e498249844.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/1e/e2/3b/1ee23b52084a609a6dfbf4f79ff63c75.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/736x/60/bc/51/60bc514519807bac5137c0bdfd5f8b03.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/736x/cf/76/19/cf761951011030565df445258a5a3c74.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/ca/da/a9/cadaa99dd038c06b797099e131d2b72d.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/736x/f3/ae/04/f3ae04694720b4b24fe470e53b736355.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/8c/eb/9c/8ceb9cd3afd817a3f882e1d2c02d591a.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/736x/81/fe/d7/81fed74487349154f523d5c5224d2cc6.jpg" },

    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/736x/8f/86/f0/8f86f03c1590da8c095122f46ee941fd.jpg" },
    
    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/ce/fe/5c/cefe5cbf741218b63c8d183776b3828f.jpg" },
    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/ce/fe/5c/cefe5cbf741218b63c8d183776b3828f.jpg" },
    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/ce/fe/5c/cefe5cbf741218b63c8d183776b3828f.jpg" },
    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/ce/fe/5c/cefe5cbf741218b63c8d183776b3828f.jpg" },
    { id: 6, name: "Cloud Slip-On", price: "$40", img: "https://i.pinimg.com/1200x/ce/fe/5c/cefe5cbf741218b63c8d183776b3828f.jpg" },
  ];

  return (
      <div className="min-h-screen bg-linear-to-b from-gray-400 via-purple-200 to-indigo-300">
        <ShoeNavbar />
      

      {/* Page Title */}
      <header className="text-center py-29">
        <h1 className="text-5xl rancho-regular text-purple-800 mb-2">Shoes Collection</h1>
        <p className="text-lg text-gray-700 trade-winds-regular ">Explore our exclusive range of stylish shoes for every occasion.</p>
      </header>

      {/* Shoes Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {shoes.map((shoe) => (
          <div 
            key={shoe.id} 
            className="bg-white/60 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={shoe.img}
              alt={shoe.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-5 text-center">
              <h2 className="text-xl font-semibold text-gray-800 cinzel-bold  ">{shoe.name}</h2>
              <p className="text-gray-600 mb-3">{shoe.price}</p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600  transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shoes;
