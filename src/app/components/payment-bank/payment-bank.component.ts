import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-payment-bank',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    InputFieldComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent
],
  templateUrl: './payment-bank.component.html',
  styleUrl: './payment-bank.component.scss'
})
export class PaymentBankComponent implements OnChanges {
  @Input() formDisabled: boolean = true;
  bankForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.bankForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      bank: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,9}$')]],
      branchNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}$')]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formDisabled = changes['formDisabled'].currentValue;
    if(this.formDisabled) {
      this.bankForm.disable();
    } else {
      this.bankForm.enable();
      this.enableValidation();
    }
    console.log(this.bankForm.valid || this.formDisabled);
  }

  disableValidation() {
    this.bankForm.get('fullName')?.clearValidators();
    this.bankForm.get('bank')?.clearValidators();
    this.bankForm.get('accountNumber')?.clearValidators();
    this.bankForm.get('branchNumber')?.clearValidators();
    this.bankForm.updateValueAndValidity();
  }

  enableValidation() {
    this.bankForm.get('fullName')?.setValidators(Validators.required);
    this.bankForm.get('bank')?.setValidators(Validators.required);
    this.bankForm.get('accountNumber')?.setValidators([Validators.required, Validators.pattern('^[0-9]{1,9}$')]);
    this.bankForm.get('branchNumber')?.setValidators([Validators.required, Validators.pattern('^[0-9]{1,3}$')]);
    this.bankForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.bankForm.valid) {
      console.log('Form Submitted', this.bankForm.value);
    }
  }
}
