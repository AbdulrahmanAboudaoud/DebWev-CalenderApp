export interface RoomBooking {
    roomId: number;
    userId: number;
    bookingDate: Date;
    startTime: Date;
    endTime: Date;
    purpose: string;
}