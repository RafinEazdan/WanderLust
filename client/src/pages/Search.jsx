import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await axios.post("/search", {
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

      <Link className="bg-primary text-white rounded-xl p-4" to="/search">
        Search by Location
      </Link>
    </div>
  );
};

export default Search;
