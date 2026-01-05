import React, { useState } from "react";
import "./RoomBooking.css";
import BookRoom from "../../../components/RoomBooking/BookRoom/BookRoom";
import MyBookings from "../../../components/RoomBooking/MyBookings/MyBookings";
import Rooms from "../../../components/RoomBooking/RoomDisplay/RoomDisplay";

function RoomBooking() {
  const [refreshBookings, setRefreshBookings] = useState(0);
  const [refreshRooms, setRefreshRooms] = useState(0);

  // Function to trigger refreshes
  const handleBookingCreated = () => {
    console.log('Booking created, refreshing lists...');
    setRefreshBookings(prev => prev + 1); // Trigger MyBookings refresh
    setRefreshRooms(prev => prev + 1); // Trigger Rooms refresh
  };

  return (
    <div className="room-booking-container">
      <div className="room-booking-content">
        <div className="left-side">
          {/* Pass the callback to BookRoom */}
          <BookRoom onBookingCreated={handleBookingCreated} />
          
          {/* Pass refresh trigger to MyBookings */}
          <MyBookings refreshTrigger={refreshBookings} />
        </div>
        <div className="right-side">
          <Rooms refreshTrigger={refreshRooms} />
        </div>
      </div>
    </div>
  );
}

export default RoomBooking;