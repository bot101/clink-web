import { Component, EventEmitter, Output } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from "../input-field/input-field.component";
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [
    NgIf,
    LogoComponent,
    ProgressBarComponent,
    FormsModule,
    ButtonComponent,
    OnboardingHeaderComponent,
    InputFieldComponent
],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.scss'
})
export class EmailConfirmationComponent {
  @Output() onBack = new EventEmitter<void>();
  @Output() onContinue = new EventEmitter<void>();
  email: string = '';
  confirmEmail: string = '';
  matchingEmails: boolean = false;
  formData: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.formData = this.authService.getFormData();
    this.email = this.formData.email;
    this.confirmEmail = this.formData.confirmEmail;
    this.onInputEmail();
  }

  onInputEmail() {
    this.matchingEmails = this.isEmailMatching();
  }

  onContinueClicked() {
    this.authService.updateFormData({ email: this.email, confirmEmail: this.confirmEmail });
    this.onContinue.emit();
    return;
  }

  onBackClicked() {
    this.onBack.emit();
    return;
  }

  isEmailMatching() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.email === this.confirmEmail && emailRegex.test(this.email);
  }
}
