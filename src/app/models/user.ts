export interface User {
    _id: string;
    fullName: string;
    shortId?: string;
    phone: string;
    email: string;
    isVerified: boolean;
    paymentBank?: string;
    paymentNumber?: string;
    paymentBranch?: string;
}