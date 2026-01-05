import React, { useState, useEffect } from "react";
import "./RoomDisplay.css";
import { Room } from "../../../types/Room";
import { RoomApi } from "../../../services/RoomApi";

interface RoomsProps {
  refreshTrigger?: number;
}

function Rooms({ refreshTrigger = 0 }: RoomsProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await RoomApi.getAllRooms();
      setRooms(data);
    } catch (err) {
      setError("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  // Loads room and refreshes when triggered.
  useEffect(() => {
    loadRooms();
  }, [refreshTrigger]);

  if (loading) {
    return <div className="rooms-container">Loading rooms...</div>;
  }

  if (error) {
    return <div className="rooms-container">Error: {error}</div>;
  }

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h2>Available Rooms</h2>
        <p>Browse and select rooms for booking.</p>
        <button 
          onClick={loadRooms}
          className="refresh-button"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="rooms-list">
        {rooms.map((room) => (
          <div key={room.roomId} className="room-item">
            <div className="room-content">
              <h3 className="room-name">{room.roomName}</h3>
              <p className="room-details">
                Capacity: {room.capacity} • Location: {room.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;