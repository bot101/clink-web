import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

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
  ],
  host: {
    class: 'block'
  }
})
export class RadioGroupComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: { value: any; label: string }[] = [];
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() radioGroupClass: string = 'grid grid-flow-col mt-1 gap-2';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

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

  onRadioChange(value: string) {
    this.value = value;
    this.valueChange.emit(value);
    this.onChange(value);
    this.onTouched();
  }
}
