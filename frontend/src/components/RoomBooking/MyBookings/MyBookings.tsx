import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MyBookings.css";

// Define the type for our bookings
interface Booking {
    id: number;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
}

const bookingsData: Booking[] = [
    { id: 1, name: "Conference Room A", date: "Nov 15, 2023", startTime: "10:00", endTime: "11:00" },
    { id: 2, name: "Meeting Room B", date: "Nov 16, 2023", startTime: "14:00", endTime: "15:30" },
    { id: 3, name: "Cuddle Space C", date: "Nov 17, 2023", startTime: "09:30", endTime: "10:00" }
];

function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>(bookingsData);

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
                            <h3 className="booking-name">{booking.name}</h3>
                            <p className="booking-details">
                                {booking.date} • {booking.startTime} - {booking.endTime}
                            </p>

                            {/* Buttons! */}
                            <div className="booking-actions">
                                <button
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
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