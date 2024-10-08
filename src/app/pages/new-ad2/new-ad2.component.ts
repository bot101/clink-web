import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { TimePickerComponent } from '../../components/time-picker/time-picker.component';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { LogoComponent } from "../../components/logo/logo.component";

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
export class NewAd2Component {
  isOneWayFlight: boolean = true;
  departureDateValue: string = '';
  departureTimeValue: string = '';
  arrivalDateValue: string = '';
  arrivalTimeValue: string = '';
  returnDateValue: string = '';
  returnTimeValue: string = '';
  flightForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

    this.flightForm.get('isOneWayFlight')?.valueChanges.subscribe(isOneWay => {
      if (isOneWay) {
        this.flightForm.get('returnDate')?.clearValidators();
        this.flightForm.get('returnTime')?.clearValidators();
      } else {
        this.flightForm.get('returnDate')?.setValidators(Validators.required);
        this.flightForm.get('returnTime')?.setValidators(Validators.required);
      }
      this.flightForm.get('returnDate')?.updateValueAndValidity();
      this.flightForm.get('returnTime')?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    // Initialize form values
    this.flightForm.patchValue({
      departureDate: this.departureDateValue,
      departureTime: this.departureTimeValue,
      arrivalDate: this.arrivalDateValue,
      arrivalTime: this.arrivalTimeValue,
      returnDate: this.returnDateValue,
      returnTime: this.returnTimeValue
    });
  }

  onSubmit() {
    console.log('Form submitted');
  }

  cancel() {
    console.log('Cancel clicked');
  }


}
