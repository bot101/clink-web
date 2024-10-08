import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../components/logo/logo.component';
import { TicketEventService } from '../../services/ticket-event.service';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-ticket-event',
  standalone: true,
  imports: [CommonModule, FormsModule, OnboardingHeaderComponent, DatePickerComponent, LogoComponent, HeaderComponent],
  templateUrl: './ticket-event.component.html',
  styleUrls: ['./ticket-event.component.scss']
})
export class TicketEventComponent implements OnInit {
  eventName: string = '';
  eventDate: string = '';
  eventTime: string = '';
  eventLocation: string = '';
  uploadedFiles: File[] = [];
  today!: string;

  private formData: any = {};

  constructor(
    private router: Router,
    private ticketEventService: TicketEventService
  ) {}

  ngOnInit() {
    this.setTodayDate();
    this.loadSavedFormData();
  }

  setTodayDate() {
    const today = new Date();
    this.today = today.toISOString().split('T')[0];
  }

  loadSavedFormData() {
    const savedData = this.ticketEventService.getFormData();
    if (savedData) {
      this.eventName = savedData.eventName || '';
      this.eventDate = savedData.eventDate || '';
      this.eventTime = savedData.eventTime || '';
      this.eventLocation = savedData.eventLocation || '';
      this.uploadedFiles = savedData.uploadedFiles || [];
    }
  }

  openDatePicker(): void {
    const datePicker = document.getElementById('hiddenDatePicker') as HTMLInputElement;
    debugger;
    if (datePicker) {
      datePicker.showPicker();
    }
  }

  onDateSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const date = new Date(input.value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    this.eventDate = `${day}/${month}/${year}`;
  }

  onDateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    const day = value.slice(0, 2);
    const month = value.slice(2, 4);
    const year = value.slice(4, 8);
    input.value = [day, month, year].filter(Boolean).join('/');
    if (day && month && year.length === 4) {
      const selectedDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
      
      if (selectedDate < today) {
        // If selected date is before today, set it to today
        const formattedToday = this.formatDate(today);
        input.value = formattedToday;
      }
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onTimeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    const hours = value.slice(0, 2);
    const minutes = value.slice(2, 4);
    input.value = [hours, minutes].filter(Boolean).join(':');
  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files).filter(file => file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024);
      this.uploadedFiles = [...this.uploadedFiles, ...newFiles].slice(0, 5);
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  isFormValid(): boolean {
    return this.eventName.trim() !== '' &&
           this.eventDate.length === 10 &&
           this.eventTime.length === 5 &&
           this.eventLocation.trim() !== '' &&
           this.uploadedFiles.length > 0;
  }

  onContinue(): void {
    debugger;
    if (this.isFormValid()) {
      const formData = {
        eventName: this.eventName,
        eventDate: this.eventDate,
        eventTime: this.eventTime,
        eventLocation: this.eventLocation,
        uploadedFiles: this.uploadedFiles
      };
      this.ticketEventService.setFormData(formData);
      this.router.navigate(['/ticket-event-details']);
    }
  }

  onBack(): void {
    // Implement the logic to go back to the previous screen
    console.log('Going back to the previous screen');
  }
}