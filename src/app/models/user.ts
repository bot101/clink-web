export interface User {
    _id: string;
    fullName: string;
    shortId?: string;
    phone: string;
    email: string;
    isVerified: boolean;
    isTrustedSeller?:boolean;
    ticketsSold?:number;
    paymentType:'bit' | 'bank';
    paymentBank?: string;
    paymentNumber?: string;
    paymentBranch?: string;
}