import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";

const Calendar: React.FC = () => {
    const events = [
        { title: "Go Carting", date: "2025-10-26" },
        { title: "Group Yoga", date: "2025-10-27" },
        { title: "Management Boxing Match", date: "2025-1-01" },
        { title: "Biergarten", date: "2025-11-05" },
        { title: "Higher Salary Protest", date: "2025-11-05" },
    ];

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"/>    
        </div>
    );
};

export default Calendar;