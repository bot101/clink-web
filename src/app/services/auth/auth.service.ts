import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable, Subject } from 'rxjs';
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
  constructor(private http: HttpClient,private apiService: ApiService) {
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
  
    
  signIn(email:string, password:string ):Observable<{access_token:string}> {
      return this.http.post<{access_token:string}>(`${environment.apiUrl}/auth/login`, {email, password})
  }

  getUserInfo() {
    this.http.get<User>(`${environment.apiUrl}/auth/info`).subscribe((user)=>this.userInfo.next(user))
  }
  
  setSession(authResult:any):void {
      var t = new Date();
      t.setSeconds(t.getSeconds() + 20);
      const expiresAt = t;

      localStorage.setItem('id_token', authResult.access_token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }     
  getAuthToken() {
    return localStorage.getItem("id_token");
  }     
  // getUserData() {
  //   return JSON.parse(localStorage.getItem("user_data"));
  // }

  signOut() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
      return this.getAuthToken() ? true : false; //moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }
  signUp() {
    return this.apiService.signUp(this.getFormData());
  }
  verifyOtp(data: any) {
    return this.apiService.verifyOtp(data);
  }

  verifyEmail(data: any) {
    return this.apiService.verifyEmail(data);
  }
  // getExpiration() {
  //     const expiration = localStorage.getItem("expires_at");
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  // }    
}
