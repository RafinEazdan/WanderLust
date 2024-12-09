import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfDays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect("/account/bookings/" + bookingId);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="border rounded-2xl my-4">
          <div className="flex ">
            <div className=" py-4 px-4 ">
              <label>Check-In: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className=" py-4 px-4 border-l">
              <label>Check-Out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="py-4 px-4 border-t">
              <label>Number of guestes </label>
              <input
                type="number"
                value={numberOfGuests}
                onChange={(ev) => setNumberOfGuests(ev.target.value)}
              />
            </div>
            {numberOfDays > 0 && (
              <div className="py-4 px-4 border-t">
                <label>Your Full Name: </label>
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                <label>Phone Number: </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                />
              </div>
            )}
          </div>
          <div className="py-4 px-4 border-t">
            Total Price :{" "}
            {numberOfDays > 0 && (
              <>
                <span>
                  {numberOfDays} X ${place.price} = $
                  {numberOfDays * place.price}
                </span>
              </>
            )}
          </div>
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">
          Book This Place
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
