import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowCircleRight, faShirt, faCloud } from "@fortawesome/free-solid-svg-icons";


const gliteNavbar = () => {
  return (
    <div className="h-auto w-60 bg-gray-900 text-white flex flex-col p-6">

        <div className="h-16 flex bg-gray-800 justify-center rounded-3xl mb-10 items-center italianno-bold">
            <h1 className="text-2xl font-bold flex items-center space-x-2 italianno-bold">
              {/* <FontAwesomeIcon icon={faCloud} /> */}
              Glitz Aura
            </h1>
         </div>
         
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>

        <Link to="/collections/hoodies" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <FontAwesomeIcon icon={faArrowCircleRight} />
          <span>Hoodies</span>
        </Link>

        <Link to="/collections/tshirts" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <FontAwesomeIcon icon={faShirt} />
          <span>T-Shirts</span>
        </Link>

        <Link to="/collections/jackets" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <FontAwesomeIcon icon={faCloud} />
          <span>Jackets</span>
        </Link>

        <Link to="/shoes" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <FontAwesomeIcon icon={faCloud} />
          <span>shoes</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <Link to="/" className="text-gray-300 hover:text-white underline">
          ← Back to Home
        </Link>
      </div>

    </div>
  );
};

export default gliteNavbar;
