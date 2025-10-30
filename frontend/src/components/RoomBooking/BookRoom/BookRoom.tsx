import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BookRoom.css";
import DatePicker from "react-datepicker";

function BookRoom() {
  return (
    <div className="book-room-container">
      <h2>Book a Room</h2>
      <p>Fill in the details to book your desired room.</p>

      <div className="form-section">
        <h3>Room Name</h3>
            <select>
              <option value="conferenceRoom">Conference Room</option>
              <option value="meetingRoom">Meeting Room</option>
            </select>
      </div>

      <div className="form-section">
        <h3>Booking Date</h3>
        <input aria-label="Date" type="date" />
      </div>

      <div>
        <div>
          <div>
            <h3>Start Time</h3>
            <input aria-label="Start Time" type="time" />
          </div>
          <div>
            <h3>End Time</h3>
            <input aria-label="Start Time" type="time" />
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