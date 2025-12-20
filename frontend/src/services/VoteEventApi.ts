const API_URL = 'http://localhost:5000/api';

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
    const response = await fetch(`${API_URL}/voteevents`);
    if (!response.ok) {
      throw new Error('Failed to fetch vote events');
    }
    return response.json();
  },

  // Get single vote event by ID
  getVoteEventById: async (id: number): Promise<VoteEvent> => {
    const response = await fetch(`${API_URL}/voteevents/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch vote event');
    }
    return response.json();
  },

  // Vote for an event
  voteForEvent: async (id: number): Promise<VoteEvent> => {
    const response = await fetch(`${API_URL}/voteevents/${id}/vote`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to vote for event');
    }
    return response.json();
  },
};
