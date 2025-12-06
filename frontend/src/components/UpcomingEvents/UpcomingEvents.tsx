import React, { useEffect, useState } from "react";
import { Card, Alert, Spinner } from "react-bootstrap";
import { EventApi } from "../../services/EventApi";
import { Event } from '../../types/Event';
import "./UpcomingEvents.css";

const UpcomingEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const upcomingEvents = await EventApi.getUpcomingEvents();
            setEvents(upcomingEvents);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="upcoming-events">
                <h2>Upcoming Events</h2>
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="upcoming-events">
                <h2>Upcoming Events</h2>
                <Alert variant="danger">
                    {error}
                    <button 
                        className="btn btn-sm btn-outline-danger ms-3" 
                        onClick={loadEvents}
                    >
                        Retry
                    </button>
                </Alert>
            </div>
        );
    }

    return (
        <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            <div className="upcoming-events-container">
                {events.length === 0 ? (
                    <Alert variant="info">No upcoming events at the moment.</Alert>
                ) : (
                    <div className="event-list">
                        {events.map((event) => (
                            <Card key={event.eventId} className="event-card">
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Subtitle className="mb-2">
                                        {(event.startTime, event.endTime)}
                                    </Card.Subtitle>
                                    <Card.Text>{event.location}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingEvents;