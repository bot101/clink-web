import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';
import { LogoComponent } from "../../components/logo/logo.component";
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { AdService } from '../../services/ad.service';

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
  ticketForm!: FormGroup;
  isLoggedIn: boolean = false; // Assume this is set based on your authentication logic

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adService: AdService
  ) {}

  ngOnInit() {
    this.ticketForm = this.fb.group({
      ticketQuantity: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      costPrice: [null, [Validators.required, Validators.min(0)]],
      salePrice: [null, [Validators.required, Validators.min(0)]],
      generalDetails: [''],
      isChecked: [false, Validators.requiredTrue]
    });

    // Load saved data if available
    const savedData = this.adService.getFormData();
    if (savedData.newAd3) {
      this.ticketForm.patchValue(savedData.newAd3);
    }
  }

  onFinish(): void {
    if (this.ticketForm.valid) {
      this.adService.updateFormData({ newAd3: this.ticketForm.value });
      // Combine all form data
      const completeFormData = this.adService.getFormData();
      console.log('Complete form data:', completeFormData);
      // Here you would typically send this data to your backend
      
      this.router.navigate([this.isLoggedIn ? '/screen-9-6' : '/screen-9-7']);
    } else {
      Object.keys(this.ticketForm.controls).forEach(key => {
        const control = this.ticketForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
