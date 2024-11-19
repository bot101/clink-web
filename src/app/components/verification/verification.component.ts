import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";

import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [OnboardingHeaderComponent,  ButtonComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent implements OnInit {
  @Output() onContinue = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
  currentStep: number = 1;
  totalSteps: number = 2;
  formData: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.formData = this.userService.getFormData();
  }

  nextStep() {
    this.userService.updateFormData({ ...this.formData, isVerified: true });
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
