import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { LogoComponent } from "../logo/logo.component";
import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [OnboardingHeaderComponent, LogoComponent, ButtonComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent implements OnInit {
  @Output() onContinue = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
  currentStep: number = 1;
  totalSteps: number = 2;
  formData: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.formData = this.authService.getFormData();
  }

  nextStep() {
    this.authService.updateFormData({ ...this.formData, isVerified: true });
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
