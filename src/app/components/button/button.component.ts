// import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

// @Component({
//   selector: 'app-button',
//   standalone: true,
//   imports: [],
//   templateUrl: './button.component.html',
//   styleUrl: './button.component.scss'
// })
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIf, NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ButtonComponent,
      multi: true
    }
  ]
})
export class ButtonComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() label: string = '';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() buttonClasses: string = '';
  classes = 'disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm font-medium text-white w-full px-4 py-3 border rounded-[20px] bg-[#072d4c] disabled:bg-gray-300 disabled:text-gray-700';
  setClasses: string = '';

  private _value: any = null;
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  
  ngOnInit() {
    this.setClasses = `${this.classes} ${this.buttonClasses}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['buttonClasses']) {
      this.setClasses = `${this.classes} ${changes['buttonClasses'].currentValue}`;
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick(event: Event): void {
    // console.log('Button clicked');
  }
}
