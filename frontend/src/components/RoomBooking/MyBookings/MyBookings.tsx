import React, { useState, useEffect } from "react";
import "./MyBookings.css";
import { RoomBookingApi } from "../../../services/RoomBookingApi";
import { RoomApi } from "../../../services/RoomApi";

interface MyBookingsProps {
    refreshTrigger?: number; // to trigger refresh when parent notifies
}

// Define the type for our bookings display
interface BookingDisplay {
    id: string; // composite key
    roomName: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose?: string;
    roomBookingId: number;
}



function MyBookings({ refreshTrigger = 0 }: MyBookingsProps) {
    const [bookings, setBookings] = useState<BookingDisplay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadBookings = async () => {
        try {
            setLoading(true);
            setError(null);

            const roomBookings = await RoomBookingApi.getMyBookings();
            const rooms = await RoomApi.getAllRooms();

            const roomMap = new Map(rooms.map(room => [room.roomId, room.roomName]));

            const displayBookings: BookingDisplay[] = roomBookings.map(booking => ({
                id: `${booking.roomId}-${booking.userId}-${booking.bookingDate}`,
                roomName: roomMap.get(booking.roomId) || 'Unknown Room',
                date: new Date(booking.bookingDate).toLocaleDateString(),
                startTime: booking.startTime.slice(0, 5), // HH:MM
                endTime: booking.endTime.slice(0, 5),
                purpose: booking.purpose,
                roomBookingId: booking.roomBookingId,
            }));

            setBookings(displayBookings);
        } catch (err) {
            console.error('Error loading bookings:', err);
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    // Helps formatting the time
    const formatTime = (timeString: string): string => {
        if (timeString.includes(':')) {
            return timeString.slice(0, 5);
        }
        return timeString;
    };

    useEffect(() => {
        loadBookings();
    }, [refreshTrigger]);

    if (loading) {
        return <div className="booking-container">Loading bookings...</div>;
    }

    if (error) {
        return <div className="booking-container">Error: {error}</div>;
    }

    if (bookings.length === 0) {
        return (
            <div className="booking-container">
                <div className="booking-header">
                    <h1>My Bookings</h1>
                    <p>You have no current room bookings.</p>
                </div>
            </div>
        );
    }

    // This will handle the delete room booking
    const handleDelete = async (bookingId: number) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                await RoomBookingApi.deleteRoomBooking(bookingId);
                await loadBookings();
                alert('Booking deleted successfully!');
            } catch (error) {
                console.error('Error deleting booking:', error);
                alert('Failed to delete booking');
            }
        }
        await loadBookings();
    };

    return (
        <div className="booking-container">
            <div className="booking-header">
                <h1>My Bookings</h1>
                <p>View and manage your current room bookings.</p>
            </div>

            <div className="bookings-list">
                {bookings.map((booking) => (
                    <div key={booking.id} className="booking-item">
                        <div className="booking-content">
                            <h3 className="booking-name">{booking.roomName}</h3>
                            <p className="booking-details">
                                {booking.date} • {booking.startTime} - {booking.endTime}
                            </p>
                            {booking.purpose && (
                                <p className="booking-purpose">Purpose: {booking.purpose}</p>
                            )}

                            {/* Buttons! */}
                            <div className="booking-actions">
                                <button
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(booking.roomBookingId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBookings;