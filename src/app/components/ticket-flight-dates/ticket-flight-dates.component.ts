import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdService, CompleteTicketFlightData } from '../../services/ad/ad.service';
import { DatePickerComponent } from '../date-picker/date-picker.component';

import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { ButtonComponent } from '../button/button.component';
import { dateValidator } from '../../validators/validator';

@Component({
  selector: 'app-ticket-flight-dates',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerComponent,
    TimePickerComponent,
    RadioGroupComponent,
    OnboardingHeaderComponent,
    ButtonComponent
],
  templateUrl: './ticket-flight-dates.component.html',
  styleUrl: './ticket-flight-dates.component.scss'
})
export class TicketFlightDatesComponent implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  @Input() isEditMode:boolean = false;

  isOneWayFlight: boolean = false;
  departureDateValue: string = '';
  departureTimeValue: string = '';
  arrivalDateValue: string = '';
  arrivalTimeValue: string = '';
  returnDepartureDateValue: string = '';
  returnDepartureTimeValue: string = '';
  returnDateValue: string = '';
  returnTimeValue: string = '';
  flightForm!: FormGroup;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private adService: AdService
  ) {
    this.flightForm = this.fb.group({
      departureDate: ['', [Validators.required, dateValidator()]],
      departureTime: ['', Validators.required],
      arrivalDate: ['', [Validators.required, dateValidator()]],
      arrivalTime: ['', Validators.required],
      returnDepartureDate: [''],
      returnDepartureTime: [''],
      returnDate: [''],
      returnTime: ['']
    }, { validator: this.dateComparisonValidator });
  }

  loadSavedFormData() {
    const savedData:Partial<CompleteTicketFlightData> = this.adService.getFormData();
    
    console.log(savedData);
    this.isOneWayFlight = savedData.flightType === 'one_way';
    if (savedData) {
      this.flightForm.patchValue({
        departureDate: savedData.departureDate || '',
        departureTime: savedData.departureTime || '',
        arrivalDate: savedData.arrivalDate || '',
        arrivalTime: savedData.arrivalTime || '',
        returnDepartureDate: savedData.returnDepartureDate || '',
        returnDepartureTime: savedData.returnDepartureTime || '',
        returnDate: savedData.returnDate || '',
        returnTime: savedData.returnTime || '',
      });
    }
  }
  ngOnInit() {

    this.loadSavedFormData();
    this.setReturnFieldValidators(!this.isOneWayFlight);

    this.flightForm.valueChanges.subscribe(() => {
      if (this.flightForm.get('departureDate')?.value) {
        const departureDate = this.flightForm.get('departureDate')?.value;
        const [day, month, year] = departureDate.split('/');
        const correctedDate = new Date(`${year}-${month}-${day}`);
        this.departureDateValue = correctedDate.toISOString().split('T')[0];
      }

      if (this.flightForm.get('arrivalDate')?.value) {
        const arrivalDate = this.flightForm.get('arrivalDate')?.value;
        const [day, month, year] = arrivalDate.split('/');
        const correctedDate = new Date(`${year}-${month}-${day}`);
        this.arrivalDateValue = correctedDate.toISOString().split('T')[0];
      }

      if (this.flightForm.get('returnDepartureDate')?.value) {
        const returnDepartureDate = this.flightForm.get('returnDepartureDate')?.value;
        const [day, month, year] = returnDepartureDate.split('/');
        const correctedDate = new Date(`${year}-${month}-${day}`);
        this.returnDepartureDateValue = correctedDate.toISOString().split('T')[0];
      }

      if (this.flightForm.get('returnDate')?.value) {
        const returnDate = this.flightForm.get('returnDate')?.value;
        const [day, month, year] = returnDate.split('/');
        const correctedDate = new Date(`${year}-${month}-${day}`);
        this.returnDateValue = correctedDate.toISOString().split('T')[0];
      }
    });
  }



  formatDate(date: string) {
    const [day, month, year] = date.split('/');
    return `${month}/${day}/${year}`;
  };

  readonly dateComparisonValidator = (group: FormGroup): { [key: string]: any } | null => {
    const departureDate = group.get('departureDate')?.value;
    const departureTime = group.get('departureTime')?.value;
    const arrivalDate = group.get('arrivalDate')?.value;
    const arrivalTime = group.get('arrivalTime')?.value;
    const returnDepartureDate = group.get('returnDepartureDate')?.value;
    const returnDepartureTime = group.get('returnDepartureTime')?.value;
    const returnDate = group.get('returnDate')?.value;
    const returnTime = group.get('returnTime')?.value;

    const formatDateTime = (date: string, time: string) => {
      const [day, month, year] = date.split('/');
      return new Date(`${year}-${month}-${day}T${time}`);
    };

    let errors: { [key: string]: any } = {};

    const now = new Date();
    const minDepartureDate = new Date(now.getTime() + 36 * 60 * 60 * 1000); // 36 hours from now

    if (departureDate && departureTime && formatDateTime(departureDate, departureTime) < minDepartureDate) {
      errors['departureTooSoon'] = true;
    }

    if (departureDate && departureTime && arrivalDate && arrivalTime) {
      const departureDateTime = formatDateTime(departureDate, departureTime);
      const arrivalDateTime = formatDateTime(arrivalDate, arrivalTime);

      if (departureDateTime >= arrivalDateTime) {
        errors['arrivalBeforeDeparture'] = true;
      }
    }

    if (!this.isOneWayFlight) {
      if (arrivalDate && arrivalTime && returnDepartureDate && returnDepartureTime) {
        const arrivalDateTime = formatDateTime(arrivalDate, arrivalTime);
        const returnDepartureDateTime = formatDateTime(returnDepartureDate, returnDepartureTime);

        if (returnDepartureDateTime <= arrivalDateTime) {
          errors['returnDepartureBeforeArrival'] = true;
        }
      }

      if (returnDepartureDate && returnDepartureTime && returnDate && returnTime) {
        const returnDepartureDateTime = formatDateTime(returnDepartureDate, returnDepartureTime);
        const returnDateTime = formatDateTime(returnDate, returnTime);

        if (returnDateTime <= returnDepartureDateTime) {
          errors['returnBeforeReturnDeparture'] = true;
        }
      }
    }

    return Object.keys(errors).length ? errors : null;
  };

  setReturnFieldValidators(required: boolean) {
    const validators = required ? [Validators.required, dateValidator()] : [];
    this.flightForm.get('returnDepartureDate')?.setValidators(validators);
    this.flightForm.get('returnDepartureTime')?.setValidators(required ? [Validators.required] : []);
    this.flightForm.get('returnDate')?.setValidators(validators);
    this.flightForm.get('returnTime')?.setValidators(required ? [Validators.required] : []);
    this.flightForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.flightForm.valid) {
      this.adService.updateFormData(this.flightForm.value);
      this.nextStep.emit();
    } else {
      Object.keys(this.flightForm.controls).forEach(key => {
        const control = this.flightForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onBack() {
    this.previousStep.emit();
  }

  // Getter for easy access to form fields
  get f() { return this.flightForm.controls; }
}
