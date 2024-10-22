import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { Router } from '@angular/router';
import { LogoComponent } from "../../components/logo/logo.component";
import { PaymentBankComponent } from "../../components/payment-bank/payment-bank.component";
import { NgIf } from '@angular/common';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    NgIf,
    OnboardingHeaderComponent,
    LogoComponent,
    PaymentBankComponent,
    ButtonComponent
],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 2;
  selectedPaymentMethod: 'bit' | 'bank' | null = null;
  baseClasses = '!font-bold bg-transparent !text-[#072d4c]';
  bitSelected = false;
  bankSelected = false;
  bitClasses: string = this.baseClasses;
  bankClasses: string = this.baseClasses;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.selectPaymentMethod('bit');
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate([".."]);
    }
  }

  selectPaymentMethod(method: 'bit' | 'bank') {
    this.selectedPaymentMethod = method;
    this.setButtonClasses();
    console.log(this.selectedPaymentMethod)
  }

  setButtonClasses() { 
    if (this.selectedPaymentMethod === 'bit') {
      this.bitClasses = `${this.baseClasses} !border-[#072d4c]`;
      this.bankClasses = this.baseClasses;
    } else if (this.selectedPaymentMethod === 'bank') {
      this.bankClasses = `${this.baseClasses} !border-[#072d4c]`;
      this.bitClasses = this.baseClasses;
    }
  }
}
