import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { catchError, delay, map, Observable, of, Subject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { BehaviorSubject } from 'rxjs';

export interface User {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  isVerified: boolean;
  paymentBank: string;
  paymentNumber: string;
  paymentBranch: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userInfo = new Subject<User>();
  private formDataSubject = new BehaviorSubject<any>({});
  formData$ = this.formDataSubject.asObservable();
  constructor(private apiService: ApiService) {
  }

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
  
  checkEmailAvailability(email: string): Observable<boolean> {
    return this.apiService.verifyEmail(email).pipe(
      map(response => response.available),
      catchError((err) => of(false))  
    );
  }

  sendOTP(phone: string): Observable<any> {
    return this.apiService.sendOTP(phone);
  }

  verifyOTP(phone: string,otp: string): Observable<{access_token:string}> {
    return this.apiService.verifyOTP(phone,otp);
  }

  getUserInfo() {
    return this.apiService.getUserInfo()
  }
  signUp() {
    return this.apiService.signUp(this.getFormData());
  }
  
  setSession(access_token:string):void {
      var t = new Date();
      t.setSeconds(t.getSeconds() + 20);
      const expiresAt = t;

      localStorage.setItem('id_token', access_token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }     
  getAuthToken() {
    return localStorage.getItem("id_token");
  }     
  

  signOut() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
      return this.getAuthToken() ? true : false;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }
  
}
