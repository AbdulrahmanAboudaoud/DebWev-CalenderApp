const API_URL = 'http://localhost:5000/api';
import { Event, CreateEventDto, UpdateEventDto } from '../types/Event';

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

  // Get events by title
  getEventsByTitle: async (title: string): Promise<Event[]> => {
    const response = await fetch(`${API_URL}/events/title/${encodeURIComponent(title)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events by title');
    }
    return response.json();
  },

  // Get events by creator
  getEventsByCreator: async (creatorId: number): Promise<Event[]> => {
    const response = await fetch(`${API_URL}/events/creator/${creatorId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events by creator');
    }
    return response.json();
  },

  // Get upcoming events
  getUpcomingEvents: async (): Promise<Event[]> => {
    const response = await fetch(`${API_URL}/events/upcoming`);
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming events');
    }
    return response.json();
  },

  // Create new event
  createEvent: async (eventDto: CreateEventDto): Promise<Event> => {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDto),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create event: ${error}`);
    }
    return response.json();
  },

  // Update event
  updateEvent: async (id: number, eventDto: UpdateEventDto): Promise<Event> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDto),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update event: ${error}`);
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
