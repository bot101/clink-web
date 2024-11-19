import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ApiService } from '../api/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {
  }

  sendOTP(phone: string): Observable<any> {
    return this.apiService.sendOTP(phone);
  }

  verifyOTP(phone: string,otp: string): Observable<{access_token:string}> {
    return this.apiService.verifyOTP(phone,otp);
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
