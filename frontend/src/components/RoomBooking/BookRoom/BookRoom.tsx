import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BookRoom.css";
import { Room } from "../../../types/Room";
import { RoomApi } from "../../../services/RoomApi";
import { RoomBookingApi } from "../../../services/RoomBookingApi";
import { RoomBooking, CreateRoomBookingDto } from "../../../types/RoomBooking";

// DISCLAIMER FOR THE TEACHER => I spent so much time here trying to figure out how this works, I kinda understand it now but yeah I used AI I'm sorry!!

function BookRoom() {
  // Variables for rooms
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Variables for the forms
  const [selectedRoom, setSelectedRoom] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  
  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  loadRooms(); // this gets the roooms

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom || !bookingDate || !startTime || !endTime) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const bookingData: CreateRoomBookingDto = {
        roomId: parseInt(selectedRoom),
        userId: 1,
        bookingDate: new Date(bookingDate).toISOString().split('T')[0], // YYYY-MM-DD format
        startTime: startTime + ":00", // HH:MM:SS
        endTime: endTime + ":00",
        purpose: purpose || ""
      };

      await RoomBookingApi.createRoomBooking(bookingData);
      
      setSubmitSuccess(true);
      
      // Reset form
      setSelectedRoom("");
      setBookingDate("");
      setStartTime("");
      setEndTime("");
      setPurpose("");
      
    } catch (error) {
      console.error("Error creating booking:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="book-room-container">
      <div className="book-room-header">
        <h2>Book a Room</h2>
        <p>Fill in the details to book your desired room.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section-pickers">
          <h3 className="form-section-header">Room Name</h3>
          <select 
            className="room-select"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            required
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
            required
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
              required
            />
          </div>

          <div className="time-input-group">
            <h3>End Time</h3>
            <input 
              aria-label="End Time" 
              type="time" 
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-section-purpose">
          <h3>Purpose (Optional)</h3>
          <textarea
            className="purpose-input"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Enter the purpose of your booking..."
            rows={3}
          />
        </div>

        {submitError && <div className="error-message">{submitError}</div>}
        {submitSuccess && <div className="success-message">Room booked successfully!</div>}

        <button 
          type="submit" 
          className="book-button" 
          disabled={submitting}
        >
          {submitting ? "Booking..." : "Book Room"}
        </button>
      </form>
    </div>
  );
}

export default BookRoom;