import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./RoomDisplay.css";
import { RoomApi } from "../../../services/RoomApi";
import { Room } from "../../../types/Room";

  function Rooms() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
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
    })
    
    return (
      <div className="rooms-container">
        <div className="rooms-header">
          <h1>Available Rooms</h1>
          <p>Browse and select from our premium spaces</p>
        </div>

        <div className="rooms-list">
          {rooms.map((room) => (
            <div key={room.roomId} className="room-card">
              <h2 className="room-name">{room.roomName}</h2>
              <p className="room-capacity">Capacity: {room.capacity} people</p>
              <p className="room-location">Location: {room.location}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default Rooms;
