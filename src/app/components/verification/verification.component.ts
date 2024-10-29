import { Component, EventEmitter, Output } from '@angular/core';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { LogoComponent } from "../logo/logo.component";
import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [OnboardingHeaderComponent, LogoComponent, ButtonComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {
  @Output() onContinue = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
  currentStep: number = 1;
  totalSteps: number = 2;

  constructor(private router: Router) {}

  nextStep() {
    this.onContinue.emit();
    return;
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    this.onBack.emit();
    return;
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate([".."]);
    }
  }
}
