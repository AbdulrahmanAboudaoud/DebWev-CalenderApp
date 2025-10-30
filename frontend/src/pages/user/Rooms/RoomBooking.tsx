import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./RoomBooking.css";
import BookRoom from "../../../components/RoomBooking/BookRoom/BookRoom";

function RoomBooking() {
  return (
    <div>
        <BookRoom/>
    </div>
  );
}

export default RoomBooking;