import { API_URL, getAuthHeaders } from "./apiConfig";
import { RoomBooking, CreateRoomBookingDto } from "../types/RoomBooking";

export const RoomBookingApi = {
    // Get all room bookings
    async getAllRoomBookings(): Promise<RoomBooking[]> {
        const response = await fetch(`${API_URL}/roombooking`, {
            headers: {
                ...getAuthHeaders(),
            },
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // Get Room Booking by ID
    async getRoomBookingById(id: number): Promise<RoomBooking> {
        const response = await fetch(`${API_URL}/roombooking/${id}`, {
            headers: {
                ...getAuthHeaders(),
            },
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // Create new Room Booking
    createRoomBooking: async (
        bookingDto: CreateRoomBookingDto
    ): Promise<RoomBooking> => {
        const response = await fetch(`${API_URL}/roombooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify(bookingDto),
        });

        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // Update existing Room Booking
    updateRoomBooking: async (
        id: number,
        bookingDto: RoomBooking
    ): Promise<RoomBooking> => {
        const response = await fetch(`${API_URL}/roombooking/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify(bookingDto),
        });

        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // Delete Room Booking
    deleteRoomBooking: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/roombooking/${id}`, {
            method: "DELETE",
            headers: {
                ...getAuthHeaders(),
            },
        });

        if (!response.ok) throw new Error(await response.text());
    },
};
