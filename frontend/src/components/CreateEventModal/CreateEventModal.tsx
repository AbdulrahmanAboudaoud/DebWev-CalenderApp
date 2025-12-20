import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { EventApi } from '../../services/EventApi';
import './CreateEventModal.css';

interface CreateEventModalProps {
    show: boolean;
    onHide: () => void;
    selectedDate: Date | null;
    onEventCreated: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ show, onHide, selectedDate, onEventCreated }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize start time when modal opens with selected date
    React.useEffect(() => {
        if (selectedDate && show) {
            const dateStr = selectedDate.toISOString().slice(0, 16);
            setStartTime(dateStr);
            
            // Set end time to 1 hour after start time
            const endDate = new Date(selectedDate);
            endDate.setHours(endDate.getHours() + 1);
            setEndTime(endDate.toISOString().slice(0, 16));
        }
    }, [selectedDate, show]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // TODO: Replace with actual user ID 
            const createdBy = 1;

            await EventApi.createEvent({
                title,
                location,
                description,
                startTime,
                endTime,
                createdBy
            });

            setTitle('');
            setLocation('');
            setDescription('');
            setStartTime('');
            setEndTime('');
            
            onEventCreated();
            onHide();
        } catch (err: any) {
            setError(err.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setTitle('');
        setLocation('');
        setDescription('');
        setStartTime('');
        setEndTime('');
        setError(null);
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter event description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Time *</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Time *</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={handleClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Event'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateEventModal;
