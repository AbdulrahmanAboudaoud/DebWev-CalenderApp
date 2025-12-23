export interface RoomBooking {
    roomId: number;
    userId: number;
    bookingDate: string; // Date string from API
    startTime: string; // Time string like "10:00:00"
    endTime: string; // Time string like "11:00:00"
    purpose?: string;
}

export interface CreateRoomBookingDto {
    roomId: number;
    userId: number;
    bookingDate: string; // ISO date string
    startTime: string; // Time string like "10:00:00"
    endTime: string; // Time string like "11:00:00"
    purpose: string;
}