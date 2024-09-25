import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupComponent,
      multi: true
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: { value: any; label: string }[] = [];
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
