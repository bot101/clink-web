import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimePickerComponent,
      multi: true
    }
  ]
})
export class TimePickerComponent implements ControlValueAccessor {
  @Input() label: string = '';
  selectedTime: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onTimeChange(event: any) {
    this.selectedTime = event;
    this.onChange(this.selectedTime);
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this.selectedTime = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
