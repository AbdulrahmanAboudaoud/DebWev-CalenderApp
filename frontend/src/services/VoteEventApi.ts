import { API_URL, getAuthHeaders } from "./apiConfig";

export interface VoteEvent {
  voteEventId: number;
  title: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
  createdBy: number;
  votes: number;
}

export const VoteEventApi = {
  // Get all vote events
  getAllVoteEvents: async (): Promise<VoteEvent[]> => {
    const response = await fetch(`${API_URL}/voteevents`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Get single vote event by ID
  getVoteEventById: async (id: number): Promise<VoteEvent> => {
    const response = await fetch(`${API_URL}/voteevents/${id}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Vote for an event
  voteForEvent: async (id: number): Promise<VoteEvent> => {
    const response = await fetch(`${API_URL}/voteevents/${id}/vote`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};
