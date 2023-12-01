import { useState } from "react";
import { FiSearch } from "react-icons/fi";

// TODO: search suggestion logic
const SearchBar = ({ getSuggestions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      const suggestionsFromServer = await getSuggestions(query);
      setSuggestions(suggestionsFromServer);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="px-4 mt-2">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={searchTerm}
          onChange={handleChange}
          onBlur={() => setShowSuggestions(false)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        />
        <FiSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
        {showSuggestions && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => {
                  setSearchTerm(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
