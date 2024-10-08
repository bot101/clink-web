import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFieldComponent } from "../../components/input-field/input-field.component";
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { FormsModule } from '@angular/forms';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-new-ad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputFieldComponent,
    ButtonComponent,
    RadioGroupComponent,
    OnboardingHeaderComponent,
    LogoComponent
],
  templateUrl: './new-ad.component.html',
  styleUrl: './new-ad.component.scss'
})
export class NewAdComponent {
  flightDestination: string = '';
  airlineName: string = '';
  flightNumber: string = '';
  flightType: 'round-trip' | 'one-way' = 'round-trip';
  currentStep: number = 1;
  totalSteps: number = 3;

  constructor(private router: Router) {}

  onBack(): void {
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onContinue(): void {
    if (this.isFormValid()) {
      // Save form data and navigate to the next step
      // You might want to use a service to store the data between steps
      this.router.navigate(['/new-ad/step2']);
    }
  }

  isFormValid(): boolean {
    return this.flightDestination.trim() !== '' &&
           this.airlineName.trim() !== '' &&
           this.flightNumber.trim() !== '';
  }

}
