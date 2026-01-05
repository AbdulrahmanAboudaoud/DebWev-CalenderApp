import { API_URL, getAuthHeaders } from "./apiConfig";
import { Room } from "../types/Room";

const getUserRole = (): string | null => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    const user = JSON.parse(raw);
    return user?.role ?? null;
  } catch {
    return null;
  }
};

const requireAdmin = () => {
  const role = getUserRole();
  if (role !== "Admin") {
    throw new Error("Unauthorized: Only Admins can perform this action");
  }
};

export const RoomApi = {
  // Get all rooms
  async getAllRooms(): Promise<Room[]> {
    const response = await fetch(`${API_URL}/room`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Get Room by ID
  async getRoomById(id: number): Promise<Room> {
    const response = await fetch(`${API_URL}/room/${id}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Create new Room (Admin)
  createRoom: async (roomDto: Room): Promise<Room> => {
    requireAdmin();

    const response = await fetch(`${API_URL}/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(roomDto),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Update existing room (Admin)
  updateRoom: async (id: number, roomDto: Room): Promise<Room> => {
    requireAdmin();

    const response = await fetch(`${API_URL}/room/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(roomDto),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Delete room (Admin)
  deleteRoom: async (id: number): Promise<void> => {
    requireAdmin();

    const response = await fetch(`${API_URL}/room/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) throw new Error(await response.text());
  },
};
