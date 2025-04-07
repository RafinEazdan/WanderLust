import React, { useState } from "react";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";

const SearchPlaces = () => {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return; // Avoid empty searches

    try {
      // Build the query URL with optional price parameters
      let searchUrl = `http://localhost:4000/search?query=${query}`;
      
      if (minPrice) {
        searchUrl += `&minPrice=${minPrice}`;
      }
      
      if (maxPrice) {
        searchUrl += `&maxPrice=${maxPrice}`;
      }
      
      const response = await fetch(searchUrl);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error searching places:", error);
    }
  };

  return (
    <div className="rounded-2xl p-5">
      <h1 className="font-bold">Search Places by Address</h1>
      <div className="flex flex-col gap-4">
        <div className="flex w-full gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter address to search"
            className="border rounded-2xl p-2 flex-grow"
          />
          <button onClick={handleSearch} className="border rounded-2xl bg-primary text-white p-2">
            Search
          </button>
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="border rounded-2xl bg-gray-200 p-2"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-xl">
            <div className="font-medium">Price Range:</div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                className="border rounded-lg p-2 w-24"
              />
              <span>to</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                className="border rounded-lg p-2 w-24"
              />
            </div>
            <button 
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h2 className="font-medium text-lg mb-2">Search Results</h2>
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((place) => (
              <li key={place._id}>
                <div className="py-1">
                  <Link
                    to={"/place/" + place._id}
                    className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl hover:bg-gray-200 transition"
                  >
                    <div className="flex w-32 h-32 bg-gray-300 grow-0 shrink-0">
                      <PlaceImg place={place}/>
                    </div>
                    <div className="grow-0 shrink">
                      <h2 className="text-xl">{place.title}</h2>
                      <p className="text-sm mt-2">{place.description}</p>
                      {place.price && (
                        <p className="text-primary font-bold mt-2">${place.price} / night</p>
                      )}
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPlaces;