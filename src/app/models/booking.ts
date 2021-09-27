import { Timestamp } from "firebase/firestore";

export interface IBooking {
    key?: string | null;
    id?:string |null;
    firstName?: string;
    lastName?: string;
    email?: string;
    telephone?: string;
    status: BookingStatus;
    startDate: Timestamp | Date;
    endDate: Timestamp | Date;
    reference?: string;
}


export enum BookingStatus {
    Free,
    Reserved,
    Booked
}