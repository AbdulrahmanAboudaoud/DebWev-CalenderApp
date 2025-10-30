import React, { useState } from "react";
import { Card, Form, Badge, Button } from "react-bootstrap";
import "./VoteEvents.css";

type EventOption = {
  id: number;
  title: string;
  datetime: string;
  votes: number;
};
// fake data to make it look as if it works
const events: EventOption[] = [
  {
    id: 1,
    title: "Go Carting",
    datetime: "Oct 26, 2024, 10:00 AM - 11:30 AM",
    votes: 12,
  },
  {
    id: 2,
    title: "Group Yoga",
    datetime: "Oct 27, 2024, 2:00 PM - 3:00 PM",
    votes: 8,
  },
  {
    id: 3,
    title: "Management Boxing Match",
    datetime: "Nov 01, 2024, 9:00 AM - 12:00 PM",
    votes: 15,
  },
  {
    id: 4,
    title: "Biergarten",
    datetime: "Nov 05, 2024, 1:00 PM - 5:00 PM",
    votes: 10,
  },
  {
    id: 5,
    title: "Higher Salary Protest",
    datetime: "Nov 05, 2024, 5:00 PM - 12:00 AM",
    votes: 883,
  },
  {
    id: 6,
    title: "Company Picnic",
    datetime: "Nov 12, 2024, 12:00 PM - 4:00 PM",
    votes: 25,
  },
  {
    id: 7,
    title: "Tech Talk: Future of AI",
    datetime: "Nov 15, 2024, 3:00 PM - 4:30 PM",
    votes: 30,
  }
];

const VoteEvents: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleSelect = (id: number) => setSelectedEventId(id);
  const handleVote = () => {
    if (selectedEventId !== null) alert(`You voted for event ID: ${selectedEventId}`);
  };

  return (
    <div className="vote-events">
      <h2>Vote for Next Event</h2>
      <div className="vote-events-container">
        <div className="event-list">
          {events.map((event) => (
            <Card
              key={event.id}
              className={`event-card ${selectedEventId === event.id ? "selected" : ""}`}
              onClick={() => handleSelect(event.id)}
            >
              <Card.Body className="event-card-body">
                <div className="event-left">
                  <Form.Check
                    type="radio"
                    name="event"
                    id={`event-${event.id}`}
                    label={event.title}
                    onChange={() => handleSelect(event.id)}
                    checked={selectedEventId === event.id}
                    className="event-radio"
                  />
                  <div className="event-datetime">{event.datetime}</div>
                </div>
                <Badge className="event-votes">{event.votes} votes</Badge>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="vote-button-container">
          <Button variant="primary" onClick={handleVote} className="vote-button">
            Cast Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoteEvents;
