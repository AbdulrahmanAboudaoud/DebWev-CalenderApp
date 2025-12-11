import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { EventApi } from '../../services/EventApi';
import './EventModal.css';

interface EventModalProps {
    show: boolean;
    onHide: () => void;
    onEventDeleted?: () => void;
    event: {
        id: string;
        title: string;
        start: Date;
        end: Date;
        extendedProps: {
            description?: string;
            location: string;
            createdBy: number;
        };
    } | null;
}

const EventModal: React.FC<EventModalProps> = ({ show, onHide, onEventDeleted, event }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!event || !window.confirm('Are you sure you want to delete this event?')) return;

        setLoading(true);
        setError(null);

        try {
            await EventApi.deleteEvent(parseInt(event.id));
            if (onEventDeleted) onEventDeleted();
            onHide();
        } catch (err: any) {
            setError(err.message || 'Failed to delete event');
        } finally {
            setLoading(false);
        }
    };

    if (!event) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{event.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="event-detail">
                    <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{event.extendedProps.location}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-icon">📝</span>
                        <span className="detail-text">{event.extendedProps.description}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-icon">🕐</span>
                        <span className="detail-text">
                            {event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - {event.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
                <Button variant="secondary" onClick={onHide} disabled={loading}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventModal;