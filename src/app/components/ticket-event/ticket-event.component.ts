import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { HeaderComponent } from "../header/header.component";
import { InputFieldComponent } from '../input-field/input-field.component';
import { TimePickerComponent } from "../time-picker/time-picker.component";
import { ButtonComponent } from '../button/button.component';
import { AdService, CompleteTicketEventData } from '../../services/ad/ad.service';

@Component({
  selector: 'app-ticket-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnboardingHeaderComponent,
    DatePickerComponent,
    ButtonComponent,
    HeaderComponent,
    InputFieldComponent,
    TimePickerComponent
],
  templateUrl: './ticket-event.component.html',
  styleUrls: ['./ticket-event.component.scss']
})
export class TicketEventComponent implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  ticketForm: FormGroup;
  today = new Date().toISOString().split('T')[0];
  tomorrow!: string;
  uploadedFiles: File[] = [];

  constructor(
    private router: Router,
    private adService: AdService,
    private fb: FormBuilder
  ) {
    this.ticketForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: ['', [Validators.required, this.dateGreaterThanToday()]],
      eventTime: ['', Validators.required],
      eventLocation: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.setTodayDate();
    this.loadSavedFormData();
  }

  setTodayDate() {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrow = tomorrow.toISOString().split('T')[0];
  }

  dateGreaterThanToday(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Don't validate if the field is empty
      }
      const inputDate = new Date(control.value);
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (inputDate <= tomorrow) {
        return { 'dateNotGreaterThanToday': true };
      }
      return null;
    };
  }

  loadSavedFormData() {
    const savedData:Partial<CompleteTicketEventData> = this.adService.getFormData();
    
    console.log(savedData);
    if (savedData) {
      this.ticketForm.patchValue({
        eventName: savedData.eventName || '',
        eventDate: savedData.eventDate || '',
        eventTime: savedData.eventTime || '',
        eventLocation: savedData.eventLocation || ''
      });
      this.uploadedFiles = savedData.uploadedFiles || [];
    }
  }

  onDateSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const date = new Date(input.value);
    const formattedDate = this.formatDate(date);
    this.ticketForm.patchValue({ eventDate: formattedDate });
  }

  onTimeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    const hours = value.slice(0, 2);
    const minutes = value.slice(2, 4);
    const formattedTime = [hours, minutes].filter(Boolean).join(':');
    this.ticketForm.patchValue({ eventTime: formattedTime });
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files).filter(file => file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024);
      this.uploadedFiles = [...this.uploadedFiles, ...newFiles].slice(0, 5);
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  isFormValid(): boolean {
    return this.ticketForm.valid; // && this.uploadedFiles.length > 0;
  }

  onContinue() {
    if (this.isFormValid()) {
      const formData = {
        ...this.ticketForm.value,
        uploadedFiles: [], // this.uploadedFiles
      };
      this.adService.updateFormData(formData);
      this.nextStep.emit();
    }
  }

  onBack() {
    this.previousStep.emit();
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}