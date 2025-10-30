import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MyBookings.css";

function MyBookings() {
  return (
    <div className="my-booking-container">
      <h2>My Bookings</h2>
      <p>View and manage your current room bookings.</p>

      <ul className="booking-list">
          <li>
              <h3>Conference Room A</h3>
              <p>Nov 15, 2023 • 10:00 - 11:00</p>
          </li>
          <li>
              <h3>Meeting Room B</h3>
              <p>Nov 16, 2023 • 14:00 - 15:30</p>
          </li>
          <li>
              <h3>Huddle Space C</h3>
              <p>Nov 17, 2023 • 09:30 - 10:00</p>
          </li>
      </ul>
    </div>
  );
}

export default MyBookings;