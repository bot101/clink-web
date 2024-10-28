import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ButtonComponent } from "../button/button.component";
import { PaymentService } from '../../services/payment/payment.service';

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
export class PaymentBankComponent implements OnInit, OnChanges {
  @Input() formDisabled: boolean = true;
  @Output() onSubmitted: EventEmitter<any> = new EventEmitter();
  @Output() previousStep: EventEmitter<any> = new EventEmitter();
  bankForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService) {
    this.bankForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      bank: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,9}$')]],
      branchNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}$')]]
    });
  }

  ngOnInit(): void {
    this.bankForm.patchValue(this.paymentService.getFormData());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formDisabled = changes['formDisabled'].currentValue;
    if(this.formDisabled) {
      this.bankForm.disable();
    } else {
      this.bankForm.enable();
      this.enableValidation();
    }
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
    if (this.bankForm.valid || this.formDisabled) {
      this.paymentService.updateFormData(this.bankForm.value);
      this.onSubmitted.emit();
    }
  }
}
