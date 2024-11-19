import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ad } from '../../models/ad';
import { User } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);


  createAd(payload: Partial<Ad>): Observable<Ad> {
    return this.http.post<Ad>(`${this.apiUrl}/ads`, payload);
  }
  updateAd(ticketId:string,payload:Partial<Ad>):Observable<Ad> {
    return this.http.patch<Ad>(`${this.apiUrl}/ads/${ticketId}`,payload);
  }
  deleteAd(ticketId:string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/ads/${ticketId}`);
  }
  getTicketDetails(shortId:string): Observable<any> {
    return this.http.get<User>(`${environment.apiUrl}/ads/${shortId}`)
  }
  markDetailsUpdated(ticketId:string):Observable<{ done: boolean }> {
    return this.http.post<{ done: boolean }>(`${this.apiUrl}/ads/${ticketId}`,{});
  }




  createTransaction(payload:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transactions`, payload);
  }




  getUserAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${environment.apiUrl}/ads`)
  }
  editUser(userId:string,payload:Partial<User>): Observable<Partial<User>> {
    return this.http.patch<User>(`${environment.apiUrl}/users`,payload)
  }
  signUp(payload: any) {
    return this.http.post<any>(`${this.apiUrl}/users`, payload);
  }
  deleteUser(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users`);
  }


  getUserInfo():Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/info`)
  }
  verifyOTP(phone: string,otp: string):Observable<{access_token:string}> {
    return this.http.get<{access_token:string}>(`${environment.apiUrl}/auth/otp?phone=${phone}&otp=${otp}`);
  }
  sendOTP(phone: string) {
    return this.http.post(`${environment.apiUrl}/auth/otp`,{phone})
  }
  verifyEmail(email: string):Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${environment.apiUrl}/auth/checkemail?email=${email}`)
  }


}
