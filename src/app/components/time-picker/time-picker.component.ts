import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

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
export class TimePickerComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  selectedTime: string = '';
  onChange: any = () => { };
  onTouched: any = () => { };
  ngControl!: NgControl;

  constructor(private _injector: Injector) { }

  ngOnInit() {
    this.ngControl = this._injector.get(NgControl);
  }
  
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
