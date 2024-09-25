import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatePickerComponent,
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {

  @Input() today = new Date().toISOString().split('T')[0];
  @Input() label: string = '';
  @Input() selectedDate: string = '';
  @Output() selectedDateChange = new EventEmitter<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    if (value !== undefined) {
      this.selectedDate = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  updateValue(value: string): void {
    this.selectedDate = value;
    this.onChange(value);
    this.onTouched();
    this.selectedDateChange.emit(value);
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
    this.selectedDate = `${day}/${month}/${year}`;
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
}
