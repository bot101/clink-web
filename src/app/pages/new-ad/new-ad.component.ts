import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputFieldComponent } from "../../components/input-field/input-field.component";
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { LogoComponent } from "../../components/logo/logo.component";
import { AdService } from '../../services/ad.service';

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
  adForm!: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 3;

  constructor(
    private router: Router,
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

  onBack(): void {
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onContinue(): void {
    if (this.adForm.valid) {
      this.adService.updateFormData({ newAd: this.adForm.value });
      this.router.navigate(['/new-ad-2']);
    } else {
      Object.keys(this.adForm.controls).forEach(key => {
        const control = this.adForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
