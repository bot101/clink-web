import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { firstValueFrom, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface TicketDetails {
    flight: string;
    amount: number;
    email: string;
    phoneNumber: string;
    fullName: string;
    passengers: PassengerDetails[];
}

export interface PassengerDetails {
    idNumber: string;
    passportExpirationDate: string | null;
    passportNumber: string | null;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketPurchaseService {
  private ticketPurchaseData: TicketDetails = {
    flight: '',
    amount: 0,
    email: '',
    phoneNumber: '',
    fullName: '',
    passengers: []
  };
  ticketDetails:  any;
  // private passengerDetailsData: any = {};

  constructor(private apiService: ApiService) {}

  getTicketDetails(ticketId: string) {
    return this.apiService.get(`ads/${ticketId}`).pipe(
      tap((ticket) => {
        this.ticketDetails = ticket;
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  setTicketPurchaseData(data: TicketDetails) {
    this.ticketPurchaseData = data;
  }
  addPassenger(passenger: PassengerDetails, index: number) {
    if (this.ticketPurchaseData.passengers) {
      this.ticketPurchaseData.passengers[index] = passenger;
      console.log('updated ticket purchase data', this.ticketPurchaseData);
    } else {
      this.ticketPurchaseData.passengers = [passenger];
      console.log('updated ticket purchase data', this.ticketPurchaseData);
    }
  }

  updateTicketPurchaseData(data: Partial<TicketDetails>) {
    this.ticketPurchaseData = { ...this.ticketPurchaseData, ...data };
    console.log('updated ticket purchase data', this.ticketPurchaseData);
  }

  getTicketPurchaseData() {
    if (!this.ticketPurchaseData?.passengers) {
      this.ticketPurchaseData.passengers = [];
    }
    return this.ticketPurchaseData;
  }

  createTransaction() {
    const payload = {
      ad: this.ticketDetails._id,
      email: this.ticketPurchaseData.email,
      phone: this.ticketPurchaseData.phoneNumber ?? '',
      fullName: this.ticketPurchaseData.fullName ?? '',
      passengerDetails: this.ticketPurchaseData.passengers?.map((passenger: PassengerDetails) => ({
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        gender: passenger.gender,
        ssn: passenger.idNumber,
        passportNumber: passenger.passportNumber,
        passportExpiery: passenger.passportExpirationDate ? this.formatDate(passenger.passportExpirationDate) : null,
        dateOfBirth: this.formatDate(passenger.dateOfBirth)
      }))
    };
    console.log('payload', payload);
    const transaction = this.apiService.post('transactions', payload);
    return firstValueFrom(transaction);
  }

  formatDate(date: string) {
    const [day, month, year] = date.split('/');
    return new Date(`${year}-${month}-${day}`);
  };
}
