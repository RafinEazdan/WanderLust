import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const cancelBooking = async () => {
    try {
      await axios.delete(`/bookings/${id}`);
      alert("Booking canceled successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

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
        <h2 className="items-center mt-0 mb-3 p-3 rounded-2xl text-xl bg-primary text-white">
          Total Price: ${booking.price}
        </h2>
      </div>
      <PlaceGallery place={booking.place} />
      <button
        to={"/"}
        onClick={cancelBooking}
        className="mt-4 bg-primary text-white px-4 py-2 rounded-2xl hover:bg-red-600"
      >
        Cancel Booking
      </button>
    </div>
  );
};

export default BookingPage;
