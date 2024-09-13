import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private apiUrl = 'https://jsonplaceholder.typicode.com'; 
  private http = inject(HttpClient);
  
  
  submitTicketEvent(completeData: CompleteTicketEventData): Observable<TicketEventResponse> {
    const formData = new FormData();
    formData.append('eventName', completeData.eventName);
    formData.append('eventDate', completeData.eventDate);
    formData.append('eventTime', completeData.eventTime);
    formData.append('eventLocation', completeData.eventLocation);
    formData.append('ticketQuantity', completeData.ticketQuantity.toString());
    formData.append('costPrice', completeData.costPrice);
    formData.append('salePrice', completeData.salePrice);
    formData.append('ticketDetails', completeData.ticketDetails); 
    formData.append('eventLink', completeData.eventLink);
    completeData.uploadedFiles.forEach((file) => {
      formData.append('uploadedFiles', file, file.name);
    });

    return this.http.post<TicketEventResponse>(`${this.apiUrl}/posts`, formData); 
  }
}
