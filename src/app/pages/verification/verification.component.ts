import { Component } from '@angular/core';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { Router } from '@angular/router';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [OnboardingHeaderComponent, LogoComponent, ButtonComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {
  currentStep: number = 1;
  totalSteps: number = 2;

  constructor(private router: Router) {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate([".."]);
    }
  }
}
