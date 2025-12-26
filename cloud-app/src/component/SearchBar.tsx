
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
  
//  // Define the types for the component props
// interface SearchBarProps { //defines the types of props your component expects.
// showSearch: boolean; //boolean to control visibility of the search bar.
// setShowSearch: (value: boolean) => void; //function to update showSearch state in parent component.
// }

// interface SearchItem {
// name: string; //defines the structure of each search item.
// path: string; //URL to navigate to when selected.
// }

// const searchData: SearchItem[] = [
// { name: "Home", path: "/" },
// { name: "Shoes", path: "/shoes" },
// { name: "wardrobe", path: "/wardrobe" },
// { name: "Blog", path: "/blog" },
// { name: "Sign In", path: "/signin" },

// // products
// { name: "Cloud Hoodie", path: "/product/hoodie-001" },
// { name: "Luxury Necklace", path: "/product/necklac" },
// { name: "Luxury shoes", path: "/product/shoes" },
// { name: "Luxury T-Shirt", path: "/product/tshirt-004" },
// { name: "couple outfit", path: "/product/couple-outfit" },

// // collections
// { name: "Streetwear Collection", path: "/wardrobe/streetwear" },
// { name: "Summer Collection", path: "/wardrobe/summer" },
// { name: "Luxury Collection", path: "/wardrobe/luxury" }
// ];

// function SearchBar({ showSearch, setShowSearch }: SearchBarProps) {
// const [query, setQuery] = useState(""); //state to hold the current search query.text the user types in the input.
// const [filtered, setFiltered] = useState<SearchItem[]>([]); //stores search results that match the query.
// const [focused, setFocused] = useState(false);//true when input is focused, used to show/hide autocomplete suggestions

// const navigate = useNavigate();

// const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { //tells TypeScript this is an input change event.
//     const value = e.target.value.toLowerCase(); //get input text in lowercase for case-insensitive search.
//     setQuery(value);

//     if (value.trim() === "") {
//     setFiltered([]);
//     return;
//     } //if input is empty, clear results and exit.

//     const results = searchData.filter(item => 
//     item.name.toLowerCase().includes(value)
//     ); //filter searchData for items whose names include the query text.

//     setFiltered(results);//store filtered results in state.
// };

//     return (
//         // container div for search bar and results dropdown
//         <div className="relative flex items-start space-x-3">
//         <button
//             onClick={() => setShowSearch(!showSearch)}
//             className="text-gray-500 hover:text-gray-700 transition mt-1"
//         >
//             <Search size={22} />
//         </button> 

//         {/* input field for search query */}
//         <div className="relative">
//             <motion.input
//             type="text"
//             value={query}
//             onChange={handleSearch} //updates query and filtered results as user types
//             onFocus={() => setFocused(true)} //when input is focused, show suggestions
//             onBlur={() => setTimeout(() => setFocused(false), 150)} //delay hiding suggestions to allow clicks
//             placeholder="cloud search.."
//             initial={{ width: 0, opacity: 0 }} //initial state of input (hidden)
//             animate={{
//                 width: showSearch ? 230 : 0,
//                 opacity: showSearch ? 1 : 0,
//             }}
//             autoFocus={showSearch} //focus input when it becomes visible
//             className="px-3 py-1 rounded-full border border-gray-600 bg-white text-black"
//             />

//             {/* autocomplete suggestions dropdown */}
//             {focused && filtered.length > 0 && (
//             <motion.ul
//                 initial={{ opacity: 0, y: -10 }} //initial state of dropdown (hidden)
//                 animate={{ opacity: 1, y: 0 }}  //animate to visible state
//                 transition={{ duration: 0.2 }} //animation duration
//                 className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md z-50"
//             >
//                 {/* autocomplete suggestion items */}
//                 {filtered.map((item, index) => (
//                 <li
//                     key={index} //unique key for each suggestion item
//                     onMouseDown={() => { //use onMouseDown to ensure navigation happens before blur event
//                     navigate(item.path);
//                     setFocused(false);
//                     }} //navigate to item's path on click
//                     className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
//                 >
//                     {item.name} {/* display suggestion name */}
//                 </li>
//                 ))}
//             </motion.ul> //end of suggestions dropdown
//             )}
//         </div>
//         </div>
//     );
//     }

// export default SearchBar;


    import { useState, useEffect } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { Search, X } from "lucide-react";
    import { useNavigate } from "react-router-dom";

    interface SearchBarProps {
    showSearch: boolean;
    setShowSearch: (value: boolean) => void;
    }

    interface SearchItem {
    name: string;
    path: string;
    }

    const searchData: SearchItem[] = [
    { name: "Home", path: "/" },
    { name: "Shoes", path: "/shoes" },
    { name: "Wardrobe", path: "/wardrobe" },
    { name: "Blog", path: "/blog" },
    { name: "Sign In", path: "/signin" },
    { name: "Cloud Hoodie", path: "/product/hoodie-001" },
    { name: "Luxury Necklace", path: "/product/necklace" },
    { name: "Luxury shoes", path: "/product/shoes" },
    { name: "Luxury T-Shirt", path: "/product/tshirt-004" },
    { name: "Couple Outfit", path: "/product/couple-outfit" },
    { name: "Streetwear Collection", path: "/wardrobe/streetwear" },
    { name: "Summer Collection", path: "/wardrobe/summer" },
    { name: "Luxury Collection", path: "/wardrobe/luxury" }
    ];

    function SearchBar({ showSearch, setShowSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<SearchItem[]>([]);
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();

    // EFFECT: Clear search results when the search bar is toggled closed
    useEffect(() => {
        if (!showSearch) {
        setQuery("");
        setFiltered([]);
        }
    }, [showSearch]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
        setFiltered([]);
        return;
        }

        const results = searchData.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(results);
    };

    return (
        <div className="relative flex items-center">
        {/* Search Input Container */}
        <div className="relative flex items-center">
            <AnimatePresence>
            {showSearch && (
                <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative flex items-center overflow-visible"
                >
                <Search className="absolute left-3 text-gray-400" size={18} />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 200)}
                    placeholder="Search Cloud Luxury..."
                    autoFocus
                    className="w-full pl-10 pr-10 py-2 rounded-full border border-purple-200 bg-white/80 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner text-gray-800"
                />
                
                {/* Clear Button */}
                {query && (
                    <button 
                    onClick={() => { setQuery(""); setFiltered([]); }}
                    className="absolute right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                    <X size={14} className="text-gray-400" />
                    </button>
                )}
                </motion.div>
            )}
            </AnimatePresence>

            {/* Suggestions Dropdown */}
            {/* IMPORTANT: This is absolute so it pops out of the Navbar flow */}
            <AnimatePresence>
            {focused && filtered.length > 0 && (
                <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-3 w-full bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[999] overflow-hidden py-2"
                >
                <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Suggestions</p>
                {filtered.map((item, index) => (
                    <li
                    key={index}
                    onMouseDown={() => {
                        navigate(item.path);
                        setShowSearch(false); // Close the whole bar after selection
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-purple-50 flex items-center justify-between group transition-colors"
                    >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors">
                        {item.name}
                    </span>
                    <Search size={14} className="text-gray-300 group-hover:text-purple-400" />
                    </li>
                ))}
                </motion.ul>
            )}
            </AnimatePresence>
        </div>
        </div>
    );
    }

    export default SearchBar;