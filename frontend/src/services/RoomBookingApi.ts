const API_URL = "http://localhost:5000/api";
import { RoomBooking, CreateRoomBookingDto } from "../types/RoomBooking";

export const RoomBookingApi = {
    // Get all room bookings
    async getAllRoomBookings(): Promise<RoomBooking[]> {
        const response = await fetch(`${API_URL}/roombooking`);
        if (!response.ok) {
            throw new Error("Failed to fetch room bookings");
        }
        return await response.json();
    },

    // Get Room Booking by ID
    async getRoomBookingById(id: number): Promise<RoomBooking> {
        const response = await fetch(`${API_URL}/roombooking/${id}`);
        if (!response.ok) {
            throw new Error("Room booking not found");
        }
        return await response.json();
    },

    // Create new Room Booking
    createRoomBooking: async (bookingDto: CreateRoomBookingDto): Promise<RoomBooking> => {
        const response = await fetch(`${API_URL}/roombooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingDto),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to create room booking: ${error}`);
        }
        return response.json();
    },

    // Update existing Room Booking
    updateRoomBooking: async (id: number, bookingDto: RoomBooking): Promise<RoomBooking> => {
        const response = await fetch(`${API_URL}/roombooking/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingDto),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to update room booking: ${error}`);
        }
        return response.json();
    },

    // Delete Room Booking
    deleteRoomBooking: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/roombooking/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to delete room booking: ${error}`);
        }
    },
};