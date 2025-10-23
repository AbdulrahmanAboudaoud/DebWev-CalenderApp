import React, { useState } from "react";
import { Card, Form, Badge, Button } from "react-bootstrap";
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
    title: "Higher Salary Protest (After Biergarten)",
    datetime: "Nov 05, 2024, 5:00 PM - 12:00 AM",
    location: "In front of the company building",
  }
];

const UpcomingEvents: React.FC = () => {
    return (
        <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            {events.map((event) => (
                <Card key={event.id} className="mb-3">
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Subtitle className="mb-2">{event.datetime}</Card.Subtitle>
                        <Card.Text>{event.location}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default UpcomingEvents;