import { ChangeDetectorRef, Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { Router } from '@angular/router';

import { PaymentBankComponent } from "../payment-bank/payment-bank.component";
import { NgIf } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { FairDealPolicyComponent } from "../fair-deal-policy/fair-deal-policy.component";
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    NgIf,
    OnboardingHeaderComponent,

    PaymentBankComponent,
    ButtonComponent,
    FairDealPolicyComponent,
],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  @Output() onBack = new EventEmitter<void>();
  @Output() onContinue = new EventEmitter<void>();
  currentStep: number = 1;
  totalSteps: number = 2;
  selectedPaymentMethod: 'bit' | 'bank' | null = null;
  baseClasses = '!font-bold bg-transparent !text-[#072d4c]';
  bitSelected = false;
  bankSelected = false;
  bitClasses: string = this.baseClasses;
  bankClasses: string = this.baseClasses;

  constructor(private router: Router, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.selectPaymentMethod('bit');
  }

  nextStep() {
    this.onContinue.emit();
    return;
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    this.onBack.emit();
    return;
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate([".."]);
    }
  }

  selectPaymentMethod(method: 'bit' | 'bank') {
    this.selectedPaymentMethod = method;
    this.setButtonClasses();
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
