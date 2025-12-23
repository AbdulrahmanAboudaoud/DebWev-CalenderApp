const API_URL = "http://localhost:5000/api";
import { Room } from "../types/Room";

export const RoomApi = {
  // Get all rooms
  async getAllRooms(): Promise<Room[]> {
    const response = await fetch(`${API_URL}/room`);
    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    return await response.json();
  },

  // Get Room by ID
  async getRoomById(id: number): Promise<Room> {
    const response = await fetch(`${API_URL}/room/${id}`);
    if (!response.ok) {
      throw new Error("Room not found");
    }
    return await response.json();
  },

  // Create new Room
  createRoom: async (roomDto: Room): Promise<Room> => {
    if (localStorage["user"]["role"] !== "Admin") {
      throw new Error("Unauthorized: Only Admins can create rooms");
    }
    const response = await fetch(`${API_URL}/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomDto),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create room: ${error}`);
    }
    return response.json();
  },

  // Update existing room
  updateRoom: async (id: number, roomDto: Room): Promise<Room> => {
      if (localStorage["user"]["role"] !== "Admin") {
        throw new Error("Unauthorized: Only Admins can update rooms");
    }
    const response = await fetch(`${API_URL}/room/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomDto),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update room: ${error}`);
    }
    return response.json();
  },

  // Delete room
  deleteRoom: async (id: number): Promise<void> => {
      if (localStorage["user"]["role"] !== "Admin") {
        throw new Error("Unauthorized: Only Admins can delete rooms");
    }
    const response = await fetch(`${API_URL}/room/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete room");
    }
  },
};
