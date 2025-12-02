const API_URL = 'http://localhost:5000/api';
import { Event } from '../types/Event';

export const EventApi = {
  // Get all events
  getAllEvents: async (): Promise<Event[]> => {
    const response = await fetch(`${API_URL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  },

  // Get single event by ID
  getEventById: async (id: number): Promise<Event> => {
    const response = await fetch(`${API_URL}/events/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    return response.json();
  },

  // Create new event
  createEvent: async (event: Omit<Event, 'eventId'>): Promise<Event> => {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    return response.json();
  },

  // Delete event
  deleteEvent: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
  },
};
