export interface Event {
  eventId: number;
  title: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
  createdBy: number;
}

export interface CreateEventDto {
  title: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
  createdBy: number;
}

export interface UpdateEventDto {
  title: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
}
