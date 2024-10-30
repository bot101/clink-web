import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  formData: any;
  // constructor() { }

  updateFormData(formData: any) {
    this.formData = formData;
  }

  getFormData() {
    return this.formData;
  }
  
}
