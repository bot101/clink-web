import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

 export interface TicketEventResponse {
  success: boolean;
  message: string;
  id?: string;
}

interface CompleteTicketEventData {
  uploadedFiles: File[];
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  ticketQuantity: number;
  costPrice: string;
  salePrice: string;
  ticketDetails: string;
  eventLink: string;
}

interface CompleteTicketFlightData {
  flightDestination: string;
  airlineName: string;
  flightNumber: string;
  flightType: string;
  isOneWayFlight: boolean;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  returnDepartureDate: string;
  returnDepartureTime: string;
  returnDate: string;
  returnTime: string;
  ticketQuantity: number;
  costPrice: string;
  salePrice: string;
  generalDetails: string;
  // isChecked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);


  submitTicketEvent(completeData: CompleteTicketEventData): Observable<TicketEventResponse> {
    const event = {
      title: completeData.eventName,
      date: completeData.eventDate,
      // time: completeData.eventTime, //No field for time in the API
      location: completeData.eventLocation,
      url: completeData.eventLink,
      files: completeData.uploadedFiles.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
      }))
    };
    console.log(this.apiUrl);
    return this.http.post<TicketEventResponse>(`${this.apiUrl}/ads`, {
      type: 'event',
      event,
      buyPrice: Number(completeData.costPrice),
      sellPrice: Number(completeData.salePrice),
      details: completeData.ticketDetails,
      amount: completeData.ticketQuantity,
      isSold: false,
      status: 'pending',
      user_id: '67096c6b8d507be7794ed78c',
      serialNumber: 'EV27583942',
    });
  }

  submitFlight(completeData: CompleteTicketFlightData): Observable<TicketEventResponse> {
    debugger;
    const outboundDepartureDate = new Date(completeData.departureDate);
    const inboundDepartureDate = new Date(completeData.returnDepartureDate);
    outboundDepartureDate.setTime(Number(completeData.departureTime));
    inboundDepartureDate.setTime(Number(completeData.returnDepartureTime));
    const flight = {
      title: completeData.flightDestination,
      date: completeData.departureDate,
      type: completeData.flightType,
      airline: completeData.airlineName,
      number: completeData.flightNumber,
      destination: completeData.flightDestination,
      outboundDepartureDate: completeData.departureDate,
      outboundDepartureTime: completeData.departureTime,
      outboundArrivalDate: completeData.arrivalDate,
      outboundArrivalTime: completeData.arrivalTime,
      inboundDepartureDate: completeData.returnDepartureDate,
      inboundArrivalDate: completeData.returnDate,
    };
    
    return this.http.post<TicketEventResponse>(`${this.apiUrl}/ads`, {
      type: 'flight',
      flight,
      buyPrice: Number(completeData.costPrice),
      sellPrice: Number(completeData.salePrice),
      details: completeData.generalDetails,
      amount: completeData.ticketQuantity,
      isSold: false,
      status: 'pending',
      user_id: '67096c6b8d507be7794ed78c',
      serialNumber: 'FL27583942',
    });
  }

}
