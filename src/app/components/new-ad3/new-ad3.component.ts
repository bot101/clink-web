import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';
import { LogoComponent } from "../logo/logo.component";
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { AdService } from '../../services/ad/ad.service';

@Component({
  selector: 'app-new-ad3',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OnboardingHeaderComponent,
    NgxCurrencyDirective,
    ButtonComponent,
    InputFieldComponent,
    RadioGroupComponent,
    LogoComponent,
    CheckboxComponent
],
  templateUrl: './new-ad3.component.html',
  styleUrl: './new-ad3.component.scss'
})
export class NewAd3Component implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  ticketForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adService: AdService
  ) {}

  ngOnInit() {
    this.ticketForm = this.fb.group({
      ticketQuantity: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      costPrice: [null, [Validators.required, Validators.min(0.01), this.salePriceValidator.bind(this)]],
      salePrice: [null, [Validators.required, Validators.min(0.01)]],
      generalDetails: [''],
      isChecked: [false, Validators.requiredTrue]
    });

    const savedData = this.adService.getFormData();
    if (savedData.newAd3) {
      this.ticketForm.patchValue(savedData.newAd3);
    }
  }

  salePriceValidator(control: AbstractControl) {
    const costPrice = this.ticketForm?.get('costPrice')?.value;
    return control.value <= costPrice ? null : { salePriceTooHigh: true };
  }

  onFinish(): void {
    if (this.ticketForm.valid) {
      this.adService.updateFormData({ newAd3: this.ticketForm.value });
      const completeFormData = this.adService.getFormData();
      const flattenObject = (obj: any, parent: any = null, res: any = {}) => {
        for (let key in obj) {
          let propName = key;
          if (typeof obj[key] == 'object') {
            flattenObject(obj[key], propName, res);
          } else {
            res[propName] = obj[key];
          }
        }
        return res;
      };

      const flatFormData = flattenObject(completeFormData);
      this.adService.submitFlightForm(flatFormData).subscribe(
        (response: any) => {
          this.clearForm();
          this.router.navigate(['/new-ad/success']);
          this.nextStep.emit();
        },
        (error: any) => {
          alert('Error submitting ticket event');
        }
      );
    } else {
      Object.keys(this.ticketForm.controls).forEach(key => {
        const control = this.ticketForm.get(key);
        control?.markAsTouched();
      });
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
