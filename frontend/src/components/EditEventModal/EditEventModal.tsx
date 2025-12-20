import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { EventApi } from '../../services/EventApi';
import './EditEventModal.css';

interface EditEventModalProps {
	show: boolean;
	onHide: () => void;
	onEventUpdated: () => void;
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

const EditEventModal: React.FC<EditEventModalProps> = ({ show, onHide, onEventUpdated, event }) => {
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (event && show) {
			setTitle(event.title);
			setLocation(event.extendedProps.location);
			setDescription(event.extendedProps.description || '');
			setStartTime(new Date(event.start).toISOString().slice(0, 16));
			setEndTime(new Date(event.end).toISOString().slice(0, 16));
		}
	}, [event, show]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!event) return;

		setError(null);
		setLoading(true);

		try {
			await EventApi.updateEvent(parseInt(event.id), {
				title,
				location,
				description,
				startTime,
				endTime
			});

			onEventUpdated();
			onHide();
		} catch (err: any) {
			setError(err.message || 'Failed to update event');
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setError(null);
		onHide();
	};

	if (!event) return null;

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Edit Event</Modal.Title>
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
							{loading ? 'Updating...' : 'Update Event'}
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditEventModal;
