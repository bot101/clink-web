import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();
  private formDataSubject = new BehaviorSubject<Partial<User>>({});
  formData$ = this.formDataSubject.asObservable();

  constructor(private apiService: ApiService) {

  }
  updateFormData(data: Partial<User>) {
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
      catchError(() => of(false))  
    );
  }

  signUp() {
    return this.apiService.signUp(this.getFormData());
  }

  loadUserData():void {
    this.apiService.getUserInfo().subscribe(user => {
      this.userSubject.next(user);
    });
  }
  public getUser(): User | null {
    return this.userSubject.value;
  }
  editUserProfileInfo(userId:string,payload:Partial<User>) {
    return this.apiService.editUser(userId,{
      email:payload.email
    });
  }
  editUserPaymentInfo(userId:string,payload:Partial<User>) {
    return this.apiService.editUser(userId,{
      fullName:payload.fullName,
      paymentType:payload.paymentType,
      paymentBank:payload.paymentBank,
      paymentNumber:payload.paymentNumber,
      paymentBranch:payload.paymentBranch,
    });
  }
  deleteUser() {
    return this.apiService.deleteUser();
  }
}

