import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceImg from "../PlaceImg";

const SearchPage = () => {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  // Filter places based on search query
  const filteredPlaces = places.filter((place) =>
    place.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search Input and Button */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search places"
          value={searchQuery}
          onChange={(ev) => setSearchQuery(ev.target.value)}
          className="border p-2 rounded-l-lg w-full"
        />
        <button
          onClick={() => {}}
          className="bg-primary text-white p-2 rounded-r-lg"
        >
          Search
        </button>
      </div>

      {/* Display Filtered Places */}
      <div className="mt-4">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <div key={place._id} className="py-1">
              <Link
                to={"/account/places/" + place._id}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
              >
                <div className="flex w-32 h-32 bg-gray-300 grow-0 shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No places found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;