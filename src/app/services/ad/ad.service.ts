import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService, TicketEventResponse } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private apiService: ApiService) {}  

  private formDataSubject = new BehaviorSubject<any>({});
  formData$ = this.formDataSubject.asObservable();

  updateFormData(data: any) {
    const currentData = this.formDataSubject.value;
    this.formDataSubject.next({ ...currentData, ...data });
  }

  getFormData() {
    return this.formDataSubject.value;
  }

  submitFlightForm(data: any) {
    return this.apiService.submitFlight(data);
  }

  clearFormData() {
    this.formDataSubject.next({});
  }
}