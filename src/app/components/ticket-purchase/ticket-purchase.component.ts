import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { LogoComponent } from "../logo/logo.component";
import { InputFieldComponent } from "../input-field/input-field.component";
import { ButtonComponent } from "../button/button.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-purchase',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OnboardingHeaderComponent, LogoComponent, InputFieldComponent, ButtonComponent],
  templateUrl: './ticket-purchase.component.html',
  styleUrl: './ticket-purchase.component.scss'
})
export class TicketPurchaseComponent implements OnInit {
  @Output() continue = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  ticketPurchaseForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ticketPurchaseForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    }, { validator: this.emailMatchValidator });
  }

  emailMatchValidator(group: FormGroup) {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { emailMismatch: true };
  }

  onContinue() {
    if (this.ticketPurchaseForm.valid) {
      console.log(this.ticketPurchaseForm.value);
      this.continue.emit();
    }
  }
}
