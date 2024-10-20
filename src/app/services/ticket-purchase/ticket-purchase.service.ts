import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketPurchaseService {
  private ticketPurchaseData: any = {};
  private passengerDetailsData: any = {};

  setTicketPurchaseData(data: any) {
    this.ticketPurchaseData = data;
  }

  getTicketPurchaseData() {
    return this.ticketPurchaseData;
  }

  setPassengerDetailsData(data: any) {
    this.passengerDetailsData = data;
  }

  getPassengerDetailsData() {
    return this.passengerDetailsData;
  }
}
