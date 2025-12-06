import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventModal from "../EventModal/EventModal";
import { EventApi } from "../../services/EventApi";
import "./Calendar.css";

const Calendar: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const data = await EventApi.getAllEvents();
            
            const calendarEvents = data.map(event => ({
                id: event.eventId.toString(),
                title: event.title,
                start: event.startTime,
                end: event.endTime,
                extendedProps: {
                    description: event.description,
                    location: event.location,
                    createdBy: event.createdBy
                }
            }));
            
            setEvents(calendarEvents);
        } catch (error) {
            console.error('Failed to load events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEventClick = (clickInfo: any) => {
        setSelectedEvent(clickInfo.event);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="calendar-container">
                <div className="text-center p-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

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