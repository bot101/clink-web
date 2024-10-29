import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private formDataSubject = new BehaviorSubject<any>({});
  formData$ = this.formDataSubject.asObservable();
  
  constructor(private apiService: ApiService  ) { }

  updateFormData(data: any) {
    const currentData = this.formDataSubject.value;
    this.formDataSubject.next({ ...currentData, ...data });
  }

  getFormData() {
    return this.formDataSubject.value;
  }
  
  clearFormData() {
    this.formDataSubject.next({});
  }


  signIn(data: any) {
    return this.apiService.signIn(data);
  }

  signUp() {
    return this.apiService.signUp(this.getFormData());
  }

  signOut() {
    return this.apiService.signOut();
  }

  verifyOtp(data: any) {
    return this.apiService.verifyOtp(data);
  }

  verifyEmail(data: any) {
    return this.apiService.verifyEmail(data);
  }


}
