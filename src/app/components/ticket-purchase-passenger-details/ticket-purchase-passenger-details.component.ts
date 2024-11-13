import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";

import { ButtonComponent } from "../button/button.component";
import { InputFieldComponent } from '../input-field/input-field.component';
import { RadioGroupComponent } from "../radio-group/radio-group.component";
import { DatePickerComponent } from "../date-picker/date-picker.component";
import { TicketPurchaseService } from '../../services/ticket-purchase/ticket-purchase.service';

@Component({
  selector: 'app-ticket-purchase-passenger-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnboardingHeaderComponent,

    ButtonComponent,
    InputFieldComponent,
    RadioGroupComponent,
    DatePickerComponent
  ],
  templateUrl: './ticket-purchase-passenger-details.component.html',
  styleUrl: './ticket-purchase-passenger-details.component.scss'
})
export class TicketPurchasePassengerDetailsComponent implements OnInit, OnChanges {
  @Output() continue = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Input() currentTicketIndex: number = 0;

  today = new Date().toISOString().split('T')[0];
  
  passengerDetailsForm!: FormGroup;
  genderOptions: { value: string, label: string }[] = [
    { value: 'male', label: 'זכר' },
    { value: 'female', label: 'נקבה' },
    { value: 'other', label: 'אחר' }
  ];

  constructor(private fb: FormBuilder, private ticketPurchaseService: TicketPurchaseService) {}

  ngOnInit(): void {
    this.passengerDetailsForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      gender: ['', Validators.required],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      dateOfBirth: ['', Validators.required],
      passportNumber: ['', Validators.pattern(/^\d+$/)],
      passportExpirationDate: ['']
    });

    this.loadPassengerDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.passengerDetailsForm) return;
    if (changes['currentTicketIndex'] && changes['currentTicketIndex'].currentValue >= 0) {
        this.loadPassengerDetails();
    }
  }

  loadPassengerDetails() {
    const savedData = this.ticketPurchaseService.getTicketPurchaseData();
    if (savedData && savedData.passengers[this.currentTicketIndex]) {
      this.passengerDetailsForm.patchValue(savedData.passengers[this.currentTicketIndex]);
    } else {
      this.passengerDetailsForm.reset();
    }
  }

  onContinue() {
    if (this.passengerDetailsForm.valid) {
      this.ticketPurchaseService.addPassenger(this.passengerDetailsForm.value, this.currentTicketIndex);
      this.passengerDetailsForm.reset();
      this.continue.emit();
    }
  }

  onBack() {
    if (this.currentTicketIndex > 0) {
      this.currentTicketIndex--;
      this.loadPassengerDetails();
    } else {
      this.back.emit();
    }
  }
}
