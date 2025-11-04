import React from "react";
import { Card } from "react-bootstrap";
import "./UpcomingEvents.css";

type UpcomingEvent = {
  id: number;
  title: string;
  datetime: string;
  location: string;
};
// fake data to make it look as if it works
const events: UpcomingEvent[] = [
  {
    id: 1,
    title: "Go Carting",
    datetime: "Oct 26, 2024, 10:00 AM - 11:30 AM",
    location: "Speedway Arena",
  },
  {
    id: 2,
    title: "Group Yoga",
    datetime: "Oct 27, 2024, 2:00 PM - 3:00 PM",
    location: "Zuiderpark",
  },
  {
    id: 3,
    title: "Management Boxing Match",
    datetime: "Nov 01, 2024, 9:00 AM - 12:00 PM",
    location: "5th floor conference room",
  },
  {
    id: 4,
    title: "Biergarten",
    datetime: "Nov 05, 2024, 1:00 PM - 5:00 PM",
    location: "Ver weg 12B",
  },
  {
    id: 5,
    title: "Higher Salary Protest",
    datetime: "Nov 05, 2024, 5:00 PM - 12:00 AM",
    location: "In front of the company building",
  },
  {
    id: 6,
    title: "Company Picnic",
    datetime: "Nov 12, 2024, 12:00 PM - 4:00 PM",
    location: "Central Park",
  },
  {
    id: 7,
    title: "Tech Talk: Future of AI",
    datetime: "Nov 15, 2024, 3:00 PM - 4:30 PM",
    location: "Auditorium",
  }
];

const UpcomingEvents: React.FC = () => {
    return (
        <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            <div className="upcoming-events-container">
                <div className="event-list">
                    {events.map((event) => (
                        <Card key={event.id} className="event-card">
                            <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                <Card.Subtitle className="mb-2">{event.datetime}</Card.Subtitle>
                                <Card.Text>{event.location}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;