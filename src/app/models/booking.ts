import { Timestamp } from "firebase/firestore";

export interface IBooking {
    key?: string | null;
    firstName?: string;
    lastName?: string;
    email?: string;
    telephone?: string;
    status: BookingStatus;
    startDate: Timestamp;
    endDate: Timestamp;
    reference?: string;
}


export enum BookingStatus {
    Free,
    Reserved,
    Booked
}