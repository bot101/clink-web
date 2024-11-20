import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { Router } from '@angular/router';

import { CommonModule, NgIf } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { FairDealPolicyComponent } from "../fair-deal-policy/fair-deal-policy.component";
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    OnboardingHeaderComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    ButtonComponent,
    FairDealPolicyComponent,
],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  @Output() onBack = new EventEmitter<void>();
  @Output() onContinue = new EventEmitter<void>();
  @Input() isEditMode:boolean = false;
  formDisabled: boolean = true;
  bankForm!: FormGroup;
  selectedPaymentMethod: 'bit' | 'bank' | null = null;
  baseClasses = 'bg-transparent !text-lg !text-[#072d4c]';
  bitSelected = false;
  bankSelected = false;
  bitClasses: string = this.baseClasses;
  bankClasses: string = this.baseClasses;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.bankForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      paymentBank: ['', Validators.required],
      paymentNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,9}$')]],
      paymentBranch: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}$')]]
    });
  }

  ngOnInit(): void {
    this.selectPaymentMethod('bit');
    this.userService.formData$.subscribe({
      next: (formData)=>{
        this.selectPaymentMethod(formData.paymentType || 'bit');
        this.bankForm.patchValue(formData);
      }
    })
  }

  nextStep() {
    if (this.bankForm.valid || this.formDisabled) {
      this.userService.updateFormData({ ...this.bankForm.value, paymentType: this.selectedPaymentMethod });
      this.onContinue.emit();
    }
  }

  previousStep() {
    this.onBack.emit();
  }

  selectPaymentMethod(method: 'bit' | 'bank') {
    this.selectedPaymentMethod = method;
    this.setButtonClasses();
  }

  setButtonClasses() { 
    if (this.selectedPaymentMethod === 'bit') {
      this.bitClasses = `${this.baseClasses} !border-[#072d4c]`;
      this.bankClasses = this.baseClasses;
      this.bankForm.disable();
    } else if (this.selectedPaymentMethod === 'bank') {
      this.bankClasses = `${this.baseClasses} !border-[#072d4c]`;
      this.bitClasses = this.baseClasses;
      this.bankForm.enable();
      this.enableValidation();
    }
  }

  disableValidation() {
    this.bankForm.get('fullName')?.clearValidators();
    this.bankForm.get('paymentBank')?.clearValidators();
    this.bankForm.get('paymentNumber')?.clearValidators();
    this.bankForm.get('paymentBranch')?.clearValidators();
    this.bankForm.updateValueAndValidity();
  }

  enableValidation() {
    this.bankForm.get('fullName')?.setValidators(Validators.required);
    this.bankForm.get('paymentBank')?.setValidators(Validators.required);
    this.bankForm.get('paymentNumber')?.setValidators([Validators.required, Validators.pattern('^[0-9]{1,9}$')]);
    this.bankForm.get('paymentBranch')?.setValidators([Validators.required, Validators.pattern('^[0-9]{1,3}$')]);
    this.bankForm.updateValueAndValidity();
  }

  
}
