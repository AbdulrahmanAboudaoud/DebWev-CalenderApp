import { API_URL, getAuthHeaders } from "./apiConfig";
import { Event, CreateEventDto, UpdateEventDto } from "../types/Event";

export const EventApi = {
  // Get all events
  getAllEvents: async (): Promise<Event[]> => {
    const response = await fetch(`${API_URL}/events`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Get single event by ID
  getEventById: async (id: number): Promise<Event> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Get events by title
  getEventsByTitle: async (title: string): Promise<Event[]> => {
    const response = await fetch(
      `${API_URL}/events/title/${encodeURIComponent(title)}`,
      {
        headers: {
          ...getAuthHeaders(),
        },
      }
    );
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Get events by creator
  getEventsByCreator: async (creatorId: number): Promise<Event[]> => {
    const response = await fetch(`${API_URL}/events/creator/${creatorId}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Get upcoming events
  getUpcomingEvents: async (): Promise<Event[]> => {
    const response = await fetch(`${API_URL}/events/upcoming`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Create new event
  createEvent: async (eventDto: CreateEventDto): Promise<Event> => {
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(eventDto),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Update event
  updateEvent: async (id: number, eventDto: UpdateEventDto): Promise<Event> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(eventDto),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Delete event
  deleteEvent: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
  },
};
