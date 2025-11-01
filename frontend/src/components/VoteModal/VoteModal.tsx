import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './VoteModal.css';

interface VoteModalProps {
    show: boolean;
    onHide: () => void;
    event: {
        title: string;
        datetime: string;
    } | null;
}

const EventModal: React.FC<VoteModalProps> = ({ show, onHide, event }) => {
    if (!event) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Voted for: {event.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Date:</strong> {event.datetime.toLocaleString()}</p>
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