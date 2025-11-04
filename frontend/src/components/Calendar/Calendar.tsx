import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventModal from "../EventModal/EventModal";
import "./Calendar.css";

const Calendar: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEventClick = (clickInfo: any) => {
        setSelectedEvent(clickInfo.event);
        setShowModal(true);
    };

    const events = [
        {
            title: "Go Carting",
            start: '2025-10-26T10:00:00',
            end: '2025-10-26T12:00:00'
        },
        {
            title: "Group Yoga",
            start: '2025-10-27T14:00:00',
            end: '2025-10-27T15:30:00'
        },
        {
            title: "Management Boxing Match",
            start: '2025-11-01T09:00:00',
            end: '2025-11-01T10:30:00'
        },
        {
            title: "Biergarten",
            start: '2025-11-05T13:00:00',
            end: '2025-11-05T17:00:00'
        },
        {
            title: "Higher Salary Protest",
            start: '2025-11-05T11:00:00',
            end: '2025-11-05T12:00:00'
        }
    ];

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                }}
                views={{
                    timeGridWeek: {
                        titleFormat: { month: 'short', day: 'numeric' }
                    }
                }}
                events={events}
                height={window.innerWidth <= 768 ? "auto" : "auto"}
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                allDaySlot={false}
                buttonText={{
                    today: 'Today',
                    month: 'Month',
                    week: 'Week'
                }}
                eventClick={handleEventClick}
            />    
            <EventModal
                show={showModal}
                onHide={() => setShowModal(false)}
                event={selectedEvent}
            />
        </div>
    );
};

export default Calendar;