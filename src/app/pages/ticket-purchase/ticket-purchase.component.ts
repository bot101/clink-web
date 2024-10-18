import { Component, OnInit } from '@angular/core';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { InputFieldComponent } from "../../components/input-field/input-field.component";
import { ButtonComponent } from "../../components/button/button.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-purchase',
  standalone: true,
  imports: [ReactiveFormsModule, OnboardingHeaderComponent, LogoComponent, InputFieldComponent, ButtonComponent],
  templateUrl: './ticket-purchase.component.html',
  styleUrl: './ticket-purchase.component.scss'
})
export class TicketPurchaseComponent implements OnInit {

  ticketPurchaseForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ticketPurchaseForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
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
    }
  }
}
