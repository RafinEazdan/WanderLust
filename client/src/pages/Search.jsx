import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get("/search", {
      params: {
        query,
        location,
        guests,
      },
    });
    setResults(response.data);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search by title or description"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {/* <input
        type="number"
        placeholder="Guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      /> */}
      <Link  className="bg-primary text-white rounded-2xl my-1 p-3" to='/search'>Search</Link>

      <div>
        {results.map((place) => (
          <div key={place._id}>
            <h3>{place.title}</h3>
            <p>{place.address}</p>
            <p>Max Guests: {place.maxGuests}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
