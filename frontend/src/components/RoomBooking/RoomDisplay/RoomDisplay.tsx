import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./RoomDisplay.css";

// Define the type for our bookings
interface Room {
  id: number;
  name: string;
  capacity: number;
  features: string[];
}

const roomData: Room[] = [
  {
    id: 1,
    name: "Conference Room A",
    capacity: 4,
    features: ["Coffee Machine", "Presentation Monitor"],
  },
  {
    id: 2,
    name: "Meeting Room B",
    capacity: 20,
    features: ["Dual Projectors", "Sound System", "Flexible Seating"],
  },
  {
    id: 3,
    name: "Cuddle Space C",
    capacity: 2,
    features: ["Soundproof", "Comfort Seating"],
  },
];

function Rooms() {
  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h1>Available Rooms</h1>
        <p>Browse and select from our premium spaces</p>
      </div>

      <div className="rooms-list">
        {roomData.map((room) => (
          <div key={room.id} className="room-card">
            <h2 className="room-name">{room.name}</h2>
            <p className="room-capacity">Capacity: {room.capacity} people</p>
            <div className="room-features">
              {room.features.map((feature, index) => (
                <span key={index} className="feature-tag">{feature}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
