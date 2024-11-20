import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Observable,of } from 'rxjs';
import { Ad, Flight } from '../../models/ad';

export interface TicketEventResponse {
  success: boolean;
  message: string;
  id?: string;
}

export interface CompleteTicketEventData {
  uploadedFiles: File[];
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  ticketQuantity: number;
  costPrice: number;
  salePrice: number;
  ticketDetails: string;
  eventLink: string;
}

export interface CompleteTicketFlightData {
  flightDestination: string;
  airlineName: string;
  flightNumber: string;
  flightType: "one_way"|"round_trip";
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
  costPrice: number;
  salePrice: number;
  generalDetails: string;
}
@Injectable({
  providedIn: 'root'
})
export class AdService {

  private formDataSubject = new BehaviorSubject<Partial<CompleteTicketEventData> | Partial<CompleteTicketFlightData>>({});
  formData$ = this.formDataSubject.asObservable();
  
  constructor(private apiService: ApiService) { }

  getUserAds() {
    return this.apiService.getUserAds()
  }
  hasFormData() {
    return Object.keys(this.getFormData()).length > 0;
  }

  updateFormData(data: Partial<CompleteTicketEventData | CompleteTicketFlightData>) {
    const currentData = this.formDataSubject.value;
    this.formDataSubject.next({ ...currentData, ...data });
  }

  getFormData():Partial<CompleteTicketEventData | CompleteTicketFlightData>  {
    return this.formDataSubject.value;
  }
  
  clearFormData() {
    this.formDataSubject.next({});
  }

  delete(ticketId:string) {
    return this.apiService.deleteAd(ticketId)
  }

  getAdById(shortId:string):Observable<Ad> {
    return this.apiService.getTicketDetails(shortId);
  }

  submitEventAd(){
    const eventForm:Partial<CompleteTicketEventData> = this.getFormData();
    const event = {
      title: eventForm.eventName,
      date: this.formatDate(eventForm.eventDate || ""),
      location: eventForm.eventLocation,
      url: eventForm.eventLink,
      files: eventForm.uploadedFiles?.map((file:any) => ({
        name: file.name,
        type: file.type,
        size: file.size
      }))
    };
      
    const ad = {
      type: 'event',
      event,
      buyPrice: Number(eventForm.costPrice),
      sellPrice: Number(eventForm.salePrice),
      details: eventForm.ticketDetails,
      amount: eventForm.ticketQuantity,
      isSold: false,
      status: 'pending'
    }
    //return this.apiService.createAd(ad)
    
  }
  createFlightAd():Observable<Ad> {
    const ad = this.generateFlightAd();
    return this.apiService.createAd(ad);
  }
  updateFlightAd(id:string):Observable<Ad> {

    const ad = this.generateFlightAd();
    return this.apiService.updateAd(id,ad);
  }
  generateFlightAd():Partial<Ad> {
    
    const flightForm:Partial<CompleteTicketFlightData> = this.getFormData();

    const outboundDepartureDate = new Date(this.formatDate(flightForm.departureDate || ""));
    const outboundArrivalDate = new Date(this.formatDate(flightForm.arrivalDate || ""));
    const [departureHours, departureMinutes] = flightForm.departureTime?.split(':').map(Number) || [0,0];
    const [arrivalHours, arrivalMinutes] = flightForm.arrivalTime?.split(':').map(Number) ||  [0,0];
    const [returnDepartureHours, returnDepartureMinutes] = flightForm.returnDepartureTime?.split(':').map(Number) ||  [0,0];
    const [returnHours, returnMinutes] = flightForm.returnTime?.split(':').map(Number) ||  [0,0];

    outboundDepartureDate.setHours(departureHours, departureMinutes, 0, 0);
    outboundArrivalDate.setHours(arrivalHours, arrivalMinutes, 0, 0);
    
    const inboundDepartureDate = new Date(this.formatDate(flightForm.returnDepartureDate || ""));
    const inboundArrivalDate = new Date(this.formatDate(flightForm.returnDate || ""));
    inboundDepartureDate.setHours(returnDepartureHours, returnDepartureMinutes, 0, 0);
    inboundArrivalDate.setHours(returnHours, returnMinutes, 0, 0);

    const flight:Partial<Flight> = {
      type: flightForm.flightType,
      airline: flightForm.airlineName,
      number: flightForm.flightNumber,
      destination: flightForm.flightDestination,
      outboundDepartureDate: outboundDepartureDate.toISOString(),
      outboundArrivalDate: outboundArrivalDate.toISOString(),
    };

    if(flightForm.flightType === 'round_trip') {
      flight['inboundDepartureDate'] = inboundDepartureDate.toISOString() as any;
      flight['inboundArrivalDate'] = inboundArrivalDate.toISOString() as any;
    }

    const ad:Partial<Ad> = {
      type: 'flight',
      flight,
      buyPrice: Number(flightForm.costPrice),
      sellPrice: Number(flightForm.salePrice),
      details: flightForm.generalDetails || "",
      amount: Number(flightForm.ticketQuantity),
      isConfirmChanged: false,
      isSold: false,
      status: 'pending'
    }

    return ad;
    
  }
  markDetailsUpdated(ticketId:string) {
    return this.apiService.markDetailsUpdated(ticketId)
  }

  private formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }
}
