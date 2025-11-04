import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './EventModal.css';

interface EventModalProps {
    show: boolean;
    onHide: () => void;
    event: {
        title: string;
        start: Date;
        end: Date;
    } | null;
}

const EventModal: React.FC<EventModalProps> = ({ show, onHide, event }) => {
    if (!event) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{event.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Start:</strong> {event.start.toLocaleString()}</p>
                <p><strong>End:</strong> {event.end.toLocaleString()}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventModal;