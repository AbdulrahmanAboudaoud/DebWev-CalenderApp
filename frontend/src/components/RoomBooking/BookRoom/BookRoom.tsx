import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BookRoom.css";
import { Room } from "../../../types/Room";
import { RoomApi } from "../../../services/RoomApi";

function BookRoom() {
  // Variables for rooms
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Variables for booking rooms

  // Variables for the forms
  const [selectedRoom, setSelectedRoom] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Function to get rooms
  async function loadRooms() {
    try {
      const data = await RoomApi.getAllRooms();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }

  loadRooms();

  return (
    <div className="book-room-container">
      <div className="book-room-header">
        <h2>Book a Room</h2>
        <p>Fill in the details to book your desired room.</p>
      </div>

      <div className="form-section-pickers">
        <h3 className="form-section-header">Room Name</h3>
        <select 
          className="room-select"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room.roomId} value={room.roomId}>
              {room.roomName}
            </option>
          ))}
        </select>
        
        <h3 className="form-section-header">Booking Date</h3>
        <input 
          aria-label="Date" 
          type="date" 
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
        />
      </div>

      <div className="form-section-time">
        <div className="time-input-group">
          <h3>Start Time</h3>
          <input 
            aria-label="Start Time" 
            type="time" 
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="time-input-group">
          <h3>End Time</h3>
          <input 
            aria-label="End Time" 
            type="time" 
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <button className="book-button">Book Room</button>
    </div>
  );
}

export default BookRoom;