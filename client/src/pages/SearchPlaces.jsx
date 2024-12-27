import React, { useState } from "react";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";

const SearchPlaces = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return; // Avoid empty searches

    try {
      const response = await fetch(`http://localhost:4000/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error searching places:", error);
    }
  };

  return (
    <div className="rounded-2xl p-5" >
      <h1 className="font-bold">Search Places by Address</h1>
      <div className="flex w-80 gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter address to search"
        className="border rounded-2xl"
      />
      <button onClick={handleSearch} className="border rounded-2xl bg-primary text-white" style={{ padding: "8px" }}>
        Search
      </button>
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <h2>Search Results</h2>
        {results.length > 0 ? (
          <ul className="m-2 p-2">
            {results.map((place) => (
              <li className="m-2 p-1" key={place._id}>
               <div className="py-1">
              <Link
              to={"/place/" + place._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow-0 shrink-0">
               <PlaceImg place={place}/>
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
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
