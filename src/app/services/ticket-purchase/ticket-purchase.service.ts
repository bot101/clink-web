import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketPurchaseService {
  private ticketPurchaseData: any = {};
  // private passengerDetailsData: any = {};

  constructor(private apiService: ApiService) {

  }

  setTicketPurchaseData(data: any) {
    this.ticketPurchaseData = data;
  }

  updateTicketPurchaseData(data: any) {
    this.ticketPurchaseData = { ...this.ticketPurchaseData, ...data };
  }

  getTicketPurchaseData() {
    return this.ticketPurchaseData;
  }

  createTransaction() {
    const transaction = this.apiService.post('transactions', this.ticketPurchaseData);
    return firstValueFrom(transaction);
  }
}
