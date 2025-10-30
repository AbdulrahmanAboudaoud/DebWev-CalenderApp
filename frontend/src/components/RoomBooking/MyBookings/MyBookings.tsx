import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MyBookings.css";

const bookings = [
    { id: 1, name: "Conference Room A", date: "Nov 15, 2023", startTime: "10:00", endTime: "11:00" },
    { id: 2, name: "Meeting Room B", date: "Nov 16, 2023", startTime: "14:00", endTime: "15:30" },
    { id: 3, name: "Cuddle Space C", date: "Nov 17, 2023", startTime: "09:30", endTime: "10:00"}
];

function MyBookings() {
  return (
    <div className="my-booking-container">
      <h2>My Bookings</h2>
      <p>View and manage your current room bookings.</p>

      <ul className="booking-list">
      {bookings.map((booking) => (
        <li key={booking.id}>
          <h3>{booking.name}</h3>
          <p>{booking.date} • {booking.startTime} Until {booking.endTime} </p>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default MyBookings;