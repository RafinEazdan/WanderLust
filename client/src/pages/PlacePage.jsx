import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-50 -mx-8 px-8 pt-8">
      <h1 className="text-2xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl mb-1">Description</h2>
            {place.description}
          </div>
          <b>Check-In: </b>
          {place.checkIn} <br />
          <b>Check-Out: </b>
          {place.checkOut} <br />
          <b>Max Number of Guests: </b>
          {place.maxGuests}
        </div>
        <div>
          <div className="text-2xl text-center">
            Price: ${place.price}/per night
          </div>
          <BookingWidget place={place} />
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 border-t">
        {/* Perks Section */}
        <div className="my-4">
            <h2 className="font-semibold text-2xl mb-2">Perks</h2>
            <div className="flex flex-wrap gap-2">
              {place.perks && place.perks.length > 0 ? (
                place.perks.map((perk, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {perk}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No perks available.</p>
              )}
            </div>
          </div>
        <div>
          <h2 className="font-semibold text-2xl mb-1">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-md text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};


export default PlacePage;
