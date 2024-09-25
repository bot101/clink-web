import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-new-ad3',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    OnboardingHeaderComponent,
    NgxCurrencyDirective,
    ButtonComponent,
    InputFieldComponent,
    RadioGroupComponent
  ],
  templateUrl: './new-ad3.component.html',
  styleUrl: './new-ad3.component.scss'
})
export class NewAd3Component {
  ticketQuantity: number = 1;
  costPrice: number | null = null;
  salePrice: number | null = null;
  generalDetails: string = '';
  isChecked: boolean = false;
  isLoggedIn: boolean = false; // Assume this is set based on your authentication logic

  constructor(private router: Router) {}

  onFinish(): void {
    if (this.isFormValid()) {
      this.router.navigate([this.isLoggedIn ? '/screen-9-6' : '/screen-9-7']);
    }
  }

  isFormValid(): boolean {
    return this.ticketQuantity > 0 && this.costPrice !== null && this.salePrice !== null;
  }
}
