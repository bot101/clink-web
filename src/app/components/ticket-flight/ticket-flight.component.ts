import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';

import { AdService, CompleteTicketFlightData } from '../../services/ad/ad.service';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-ticket-flight',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent,
    RadioGroupComponent,
    OnboardingHeaderComponent,

  ],
  templateUrl: './ticket-flight.component.html',
  styleUrl: './ticket-flight.component.scss'
})
export class TicketFlightComponent implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  @Input() isEditMode:boolean = false;

  adForm!: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 3;

  constructor(
    private fb: FormBuilder,
    private adService: AdService
  ) {
    this.adForm = this.fb.group({
      flightDestination: ['', Validators.required],
      airlineName: ['', Validators.required],
      flightNumber: ['', Validators.required],
      flightType: ['round_trip', Validators.required]
    });
  }

  ngOnInit() {
    
    this.adService.formData$.subscribe((formData: Partial<CompleteTicketFlightData>) => {
      this.adForm.patchValue({
        flightDestination: formData?.flightDestination || '',
        airlineName: formData?.airlineName || '',
        flightNumber: formData?.flightNumber || '',
        flightType: formData?.flightType || ''
      });
    });
  }

  onBack() {
    this.previousStep.emit();
  }

  onContinue(): void {
    if (this.adForm.valid) {
      this.adService.updateFormData(this.adForm.value);
      this.nextStep.emit();
    } else {
      Object.keys(this.adForm.controls).forEach(key => {
        const control = this.adForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
