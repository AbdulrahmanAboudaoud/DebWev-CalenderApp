import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BookRoom.css";

function BookRoom() {
  return (
    <div className="book-room-container">
      <h2>Book a Room</h2>
      <p>Fill in the details to book your desired room.</p>

      <div className="form-section">
        <h3>Room Name</h3>
        <div className="room-option">
          Conference Room A
        </div>
      </div>

      <div className="form-section">
        <h3>Booking Date</h3>
        <div className="date-display">
          September 23rd, 2025
        </div>
      </div>

      <div className="form-section">
        <div className="time-row">
          <div className="time-group">
            <h3>Start Time</h3>
            <div className="time-display">09:00</div>
          </div>
          <div className="time-group">
            <h3>End Time</h3>
            <div className="time-display">10:00</div>
          </div>
        </div>
      </div>

      <button className="book-button">
        Book Room
      </button>
    </div>
  );
}

export default BookRoom;