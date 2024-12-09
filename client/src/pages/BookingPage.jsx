import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="flex my-2">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-3 mb- mt-3 rounded-2xl">
        <h2 className="text-xl">Your Booking Information: </h2>
        <BookingDates booking={booking} />  
      </div>
      <div>
      <h2 className="items-center mt-0 mb-3 p-3 rounded-2xl text-xl bg-primary text-white">Total Price: ${booking.price}</h2>

      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;
