import { User } from "./user";

export interface Ad {
    _id?:string;
    user: User;
    shortId?: string;
    type: "flight"|"event";
    event?: {
      title: string;
      date: Date;
      location: string;
      url: string;
      files: string[];
    };
    flight?: {
      destination: string;
      airline: string;
      number: string;
      type: "one_way"|"round_trip";
      outboundDepartureDate: Date;
      outboundArrivalDate: Date;
      inboundDepartureDate: Date;
      inboundArrivalDate: Date;
    };
    amount: number;
    buyPrice: number;
    sellPrice: number;
    details?: string;
    isSold?: boolean;
    status?: "pending" | "completed" | "canceled";
    createdAt?: Date;
    updatedAt?: Date;

}
  