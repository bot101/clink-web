import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
      date: this.formatDate(completeData.eventDate),
      location: completeData.eventLocation,
      url: completeData.eventLink,
      files: completeData.uploadedFiles.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
      }))
    };
    return this.http.post<TicketEventResponse>(`${this.apiUrl}/ads`, {
      type: 'event',
      event,
      buyPrice: Number(completeData.costPrice),
      sellPrice: Number(completeData.salePrice),
      details: completeData.ticketDetails,
      amount: completeData.ticketQuantity,
      isSold: false,
      status: 'pending',
      user: '67096c6b8d507be7794ed78c',
      serialNumber: 'EV27583942',
    });
  }

  submitFlight(completeData: CompleteTicketFlightData): Observable<TicketEventResponse> {
    const outboundDepartureDate = new Date(this.formatDate(completeData.departureDate));
    const outboundArrivalDate = new Date(this.formatDate(completeData.arrivalDate));
    const [departureHours, departureMinutes] = completeData.departureTime.split(':').map(Number);
    const [arrivalHours, arrivalMinutes] = completeData.arrivalTime.split(':').map(Number);
    const [returnDepartureHours, returnDepartureMinutes] = completeData.returnDepartureTime.split(':').map(Number);
    const [returnHours, returnMinutes] = completeData.returnTime.split(':').map(Number);

    outboundDepartureDate.setHours(departureHours, departureMinutes, 0, 0);
    outboundArrivalDate.setHours(arrivalHours, arrivalMinutes, 0, 0);
    

    const inboundDepartureDate = new Date(this.formatDate(completeData.returnDepartureDate));
    const inboundArrivalDate = new Date(this.formatDate(completeData.returnDate));
    inboundDepartureDate.setHours(returnDepartureHours, returnDepartureMinutes, 0, 0);
    inboundArrivalDate.setHours(returnHours, returnMinutes, 0, 0);

    const flight = {
      type: completeData.flightType,
      airline: completeData.airlineName,
      number: completeData.flightNumber,
      destination: completeData.flightDestination,
      outboundDepartureDate: outboundDepartureDate.toISOString(),
      outboundArrivalDate: outboundArrivalDate.toISOString(),
      inboundDepartureDate: null,
      inboundArrivalDate: null,
    };

    if(completeData.flightType === 'round_trip') {
      flight['inboundDepartureDate'] = inboundDepartureDate.toISOString() as any;
      flight['inboundArrivalDate'] = inboundArrivalDate.toISOString() as any;
    }
    
    return this.http.post<TicketEventResponse>(`${this.apiUrl}/ads`, {
      type: 'flight',
      flight,
      buyPrice: Number(completeData.costPrice),
      sellPrice: Number(completeData.salePrice),
      details: completeData.generalDetails,
      amount: completeData.ticketQuantity,
      isSold: false,
      status: 'pending',
      user: '67096c6b8d507be7794ed78c',
      serialNumber: 'FL27583942',
    });
  }

  private formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }
}
