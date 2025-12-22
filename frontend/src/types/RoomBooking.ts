export interface RoomBooking {
    bookingId: number;
    userId: number;
    bookingDate: Date;
    roomId: number;
    startTime: Date;
    endTime: Date;
    purpose: string;
}