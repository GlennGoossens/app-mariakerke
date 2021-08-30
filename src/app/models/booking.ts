export interface IBooking {
    key?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    periodKey: string;
    status: BookingStatus;
}

export interface IPeriod {
    key?: string | null;
    startDate: Date;
    isBooked: boolean;
}

export enum BookingStatus {
    Free,
    Reserved,
    Booked
}