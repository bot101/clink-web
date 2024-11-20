import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { AdService, CompleteTicketFlightData } from '../../services/ad/ad.service';
import { salePriceValidator } from '../../validators/validator';

@Component({
  selector: 'app-ticket-flight-detail',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    NgxCurrencyDirective, 
    OnboardingHeaderComponent, 
    RadioGroupComponent,
    ButtonComponent,
    InputFieldComponent,
    CheckboxComponent
],
  templateUrl: './ticket-flight-detail.component.html',
  styleUrl: './ticket-flight-detail.component.scss'
})
export class TicketFlightDetailComponent implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  @Input() isEditMode:boolean = false;

  ticketForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adService: AdService
  ) {
    this.ticketForm = this.fb.group({
      ticketQuantity: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      costPrice: [null, [Validators.required, Validators.min(0.01)]],
      salePrice: [null, [Validators.required, Validators.min(0.01)]],
      generalDetails: [''],
      isChecked: [false, Validators.requiredTrue]
    }, {
      validators: salePriceValidator('costPrice', 'salePrice')
    });
  }

  ngOnInit() {
    this.loadSavedFormData()
  }

  loadSavedFormData() {
    const savedData:Partial<CompleteTicketFlightData> = this.adService.getFormData();
    
    console.log(savedData);
    if (savedData) {
      this.ticketForm.patchValue({
        ticketQuantity: savedData.ticketQuantity || '',
        costPrice: savedData.costPrice || '',
        salePrice: savedData.salePrice || '',
        generalDetails: savedData.generalDetails || '',
        isChecked: false,
      });
    }
  }
  
  onFinish(): void {
    if (this.ticketForm.valid) {
      this.adService.updateFormData(this.ticketForm.value);
      this.nextStep.emit();
    }
  }

  private clearForm(): void {
    this.adService.clearFormData();
    this.ticketForm.reset({
      ticketQuantity: 1,
      costPrice: 0,
      salePrice: 0,
      generalDetails: '',
      isChecked: false
    });
  }

  onBack(): void {
    this.previousStep.emit();
  }
}
