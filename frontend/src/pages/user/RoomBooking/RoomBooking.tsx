import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./RoomBooking.css";
import BookRoom from "../../../components/RoomBooking/BookRoom/BookRoom";
import MyBookings from "../../../components/RoomBooking/MyBookings/MyBookings";
import Rooms from "../../../components/RoomBooking/RoomDisplay/RoomDisplay";

function RoomBooking() {
  return (
    <div className="room-booking-container">
      <div className="room-booking-content">
        <div className="left-side">
          <BookRoom />
          <MyBookings />
        </div>
        <div className="right-side">
          <Rooms />
        </div>
      </div>
    </div>
  );
}

export default RoomBooking;
