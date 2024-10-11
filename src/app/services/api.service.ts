import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface TicketEventResponse {
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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl; 
  private http = inject(HttpClient);
  
  
  submitTicketEvent(completeData: CompleteTicketEventData): Observable<TicketEventResponse> {
    // const formData = new FormData();
    // formData.append('eventName', completeData.eventName);
    // formData.append('eventDate', completeData.eventDate);
    // formData.append('eventTime', completeData.eventTime);
    // formData.append('eventLocation', completeData.eventLocation);
    // formData.append('ticketQuantity', completeData.ticketQuantity.toString());
    // formData.append('costPrice', completeData.costPrice);
    // formData.append('salePrice', completeData.salePrice);
    // formData.append('ticketDetails', completeData.ticketDetails); 
    // formData.append('eventLink', completeData.eventLink);
    // completeData?.uploadedFiles?.forEach((file) => {
    //   formData.append('uploadedFiles', file, file.name);
    // });
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
}
