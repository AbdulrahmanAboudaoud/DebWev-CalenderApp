import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./RoomBooking.css";
import BookRoom from "../../../components/RoomBooking/BookRoom/BookRoom";
import MyBookings from "../../../components/RoomBooking/MyBookings/MyBookings";

function RoomBooking() {
  return (
    <div>
        <BookRoom/>
        <MyBookings/>
    </div>
  );
}

export default RoomBooking;