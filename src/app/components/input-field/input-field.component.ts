import { CommonModule } from '@angular/common';
import { ControlContainer, ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Component, Injector, Input, OnInit, forwardRef } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() isError: boolean | undefined = undefined;

  value: string = '';
  onChange: any = () => { };
  onTouched: any = () => { };
  ngControl!: NgControl;

  constructor(private _injector: Injector) { }

  ngOnInit() {
    this.ngControl = this._injector.get(NgControl);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

}
