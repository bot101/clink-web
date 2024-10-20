import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { LogoComponent } from "../logo/logo.component";
import { ButtonComponent } from "../button/button.component";
import { InputFieldComponent } from '../input-field/input-field.component';
import { RadioGroupComponent } from "../radio-group/radio-group.component";
import { DatePickerComponent } from "../date-picker/date-picker.component";

@Component({
  selector: 'app-ticket-purchase-passenger-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnboardingHeaderComponent,
    LogoComponent,
    ButtonComponent,
    InputFieldComponent,
    RadioGroupComponent,
    DatePickerComponent
  ],
  templateUrl: './ticket-purchase-passenger-details.component.html',
  styleUrl: './ticket-purchase-passenger-details.component.scss'
})
export class TicketPurchasePassengerDetailsComponent implements OnInit {
  @Output() continue = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  passengerDetailsForm!: FormGroup;
  genderOptions: { value: string, label: string }[] = [
    { value: 'male', label: 'זכר' },
    { value: 'female', label: 'נקבה' },
    { value: 'other', label: 'אחר' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.passengerDetailsForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      gender: ['', Validators.required],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      dateOfBirth: ['', Validators.required],
      passportNumber: ['', Validators.pattern(/^\d+$/)],
      passportExpirationDate: ['']
    });
  }

  onContinue() {
    if (this.passengerDetailsForm.valid) {
      console.log(this.passengerDetailsForm.value);
      this.continue.emit();
    }
  }

  onBack() {
    this.back.emit();
  }
}
