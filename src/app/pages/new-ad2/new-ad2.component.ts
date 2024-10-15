import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { TimePickerComponent } from '../../components/time-picker/time-picker.component';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { LogoComponent } from "../../components/logo/logo.component";
import { Router } from '@angular/router';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-new-ad2',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerComponent,
    TimePickerComponent,
    RadioGroupComponent,
    OnboardingHeaderComponent,
    LogoComponent
],
  templateUrl: './new-ad2.component.html',
  styleUrl: './new-ad2.component.scss'
})
export class NewAd2Component implements OnInit {
  isOneWayFlight: boolean = true;
  departureDateValue: string = '';
  departureTimeValue: string = '';
  arrivalDateValue: string = '';
  arrivalTimeValue: string = '';
  returnDateValue: string = '';
  returnTimeValue: string = '';
  flightForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adService: AdService
  ) {}

  ngOnInit() {
    this.flightForm = this.fb.group({
      isOneWayFlight: [true],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      returnDepartureDate: [''],
      returnDepartureTime: [''],
      returnDate: [''],
      returnTime: ['']
    });

    // Load saved data if available
    const savedData = this.adService.getFormData();
    if (savedData.newAd2) {
      this.flightForm.patchValue(savedData.newAd2);
    }

    // Set validators based on flight type
    const flightType = savedData.newAd?.flightType;
    if (flightType === 'round-trip') {
      this.flightForm?.get('returnDepartureDate')?.setValidators(Validators.required);
      this.flightForm?.get('returnDepartureTime')?.setValidators(Validators.required);
      this.flightForm?.get('returnDate')?.setValidators(Validators.required);
      this.flightForm?.get('returnTime')?.setValidators(Validators.required);
    }
    this.flightForm.updateValueAndValidity();

    this.flightForm.valueChanges.subscribe(() => {
      console.log(this.flightForm.value);

    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      this.adService.updateFormData({ newAd2: this.flightForm.value });
      this.router.navigate(['/new-ad-3']);
    } else {
      Object.keys(this.flightForm.controls).forEach(key => {
        const control = this.flightForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  cancel() {
    this.router.navigate(['/new-ad']);
  }
}
