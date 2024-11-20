import { User } from "./user";

export interface Ad {
    _id:string;
    user: User;
    shortId?: string;
    type: "flight"|"event";
    event?: Event | Partial<Event>;
    flight?: Flight | Partial<Flight>;
    amount: number;
    buyPrice: number;
    sellPrice: number;
    details?: string;
    isSold?: boolean;
    isConfirmChanged?: boolean;
    status?: "pending" | "completed" | "canceled";
    createdAt?: Date;
    updatedAt?: Date;

}
  
export interface Flight {
  destination: string;
  airline: string;
  number: string;
  type: "one_way"|"round_trip";
  isConfirmChanged?:boolean;
  outboundDepartureDate: string;
  outboundArrivalDate: string;
  inboundDepartureDate?: string;
  inboundArrivalDate?: string;
}
export interface Event  {
  title: string;
  date: string;
  location: string;
  url?: string;
  files?: string[];
}