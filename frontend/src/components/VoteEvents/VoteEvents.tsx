import React, { useState, useEffect } from "react";
import { Card, Form, Badge, Button, Spinner, Alert } from "react-bootstrap";
import "./VoteEvents.css";
import VoteModal from "../VoteModal/VoteModal";
import { VoteEventApi, VoteEvent } from "../../services/VoteEventApi";

type EventOption = {
  id: number;
  title: string;
  datetime: string;
  votes: number;
  location?: string;
  description?: string;
};

const VoteEvents: React.FC = () => {
  const [events, setEvents] = useState<EventOption[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventOption | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVoteEvents();
  }, []);

  const loadVoteEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await VoteEventApi.getAllVoteEvents();
      
      // Transform API data to component format
      const formattedEvents = data.map((event: VoteEvent) => ({
        id: event.voteEventId,
        title: event.title.trim(),
        datetime: event.startTime,
        votes: event.votes,
        location: event.location,
        description: event.description
      }));
      
      setEvents(formattedEvents);
    } catch (err) {
      setError('Failed to load vote events. Please try again.');
      console.error('Error loading vote events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (event: EventOption) => setSelectedEvent(event);
  
  const handleVote = async () => {
    if (!selectedEvent) return;
    
    try {
      await VoteEventApi.voteForEvent(selectedEvent.id);
      setShowModal(true);
      await loadVoteEvents();
    } catch (err) {
      console.error('Error voting:', err);
      alert('Failed to cast vote. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="vote-events">
        <h2>Vote for Next Event</h2>
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
      <div className="vote-events">
        <h2>Vote for Next Event</h2>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="vote-events">
        <h2>Vote for Next Event</h2>
        <Alert variant="info">No events available for voting at the moment.</Alert>
      </div>
    );
  }

  return (
    <div className="vote-events">
      <h2>Vote for Next Event</h2>
      <div className="vote-events-container">
        <div className="event-list">
          {events.map((event) => (
            <Card
              key={event.id}
              className={`event-card ${selectedEvent?.id === event.id ? "selected" : ""}`}
              onClick={() => handleSelect(event)}
            >
              <Card.Body className="event-card-body">
                <div className="event-left">
                  <Form.Check
                    type="radio"
                    name="event"
                    id={`event-${event.id}`}
                    label={event.title}
                    onChange={() => handleSelect(event)}
                    checked={selectedEvent?.id === event.id}
                    className="event-radio"
                  />
                  <div className="event-datetime">{event.datetime}</div>
                </div>
                <Badge className="event-votes">{event.votes} votes</Badge>
              </Card.Body>
            </Card>
            
          ))}
        </div>
        <VoteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                event={selectedEvent}
              />
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
