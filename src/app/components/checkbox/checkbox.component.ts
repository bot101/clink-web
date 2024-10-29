import { CommonModule } from '@angular/common';
import { Component, forwardRef, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() customClass: string = '';
  @Input() checkmarkColor: string = '#ffffff';
  @Input() borderColor: string = '#072D4C';
  @Input() backgroundColor: string = '#FFC5C5';

  isChecked: boolean = false;
  isDisabled: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  ngControl!: NgControl;

  constructor(private _injector: Injector) { }

  ngOnInit() {
    this.ngControl = this._injector.get(NgControl);
  }

  writeValue(checked: boolean): void {
    this.isChecked = checked;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.isChecked = target.checked;
    this.onChange(this.isChecked);
    this.onTouched();
  }
}
