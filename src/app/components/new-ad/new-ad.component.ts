import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';
import { LogoComponent } from "../logo/logo.component";
import { AdService } from '../../services/ad.service';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-new-ad',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent,
    RadioGroupComponent,
    OnboardingHeaderComponent,
    LogoComponent
  ],
  templateUrl: './new-ad.component.html',
  styleUrl: './new-ad.component.scss'
})
export class NewAdComponent implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  adForm!: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 3;

  constructor(
    private fb: FormBuilder,
    private adService: AdService
  ) {}

  ngOnInit() {
    this.adForm = this.fb.group({
      flightDestination: ['', Validators.required],
      airlineName: ['', Validators.required],
      flightNumber: ['', Validators.required],
      flightType: ['round_trip', Validators.required]
    });

    // Load saved data if available
    const savedData = this.adService.getFormData();
    if (savedData.newAd) {
      this.adForm.patchValue(savedData.newAd);
    }
  }

  onCancel(): void {
    this.previousStep.emit();
  }

  onContinue(): void {
    if (this.adForm.valid) {
      this.adService.updateFormData({ newAd: this.adForm.value });
      this.nextStep.emit();
    } else {
      Object.keys(this.adForm.controls).forEach(key => {
        const control = this.adForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
