import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';
import { LogoComponent } from '../logo/logo.component';
import { MainHeaderComponent } from "../main-header/main-header.component";
import { ButtonComponent } from '../button/button.component';
import { HeaderComponent } from "../header/header.component";
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    // FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OnboardingHeaderComponent,
    LogoComponent,
    ButtonComponent,
    MainHeaderComponent,
    HeaderComponent,
    CheckboxComponent,
],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  @Output() onBack = new EventEmitter<void>();
  @Output() onContinue = new EventEmitter<void>();
  authForm: FormGroup;
  isFromCreateTicketAd: boolean = false; // Set this based on your navigation logic

  constructor(private fb: FormBuilder, private router: Router) {
    this.authForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  onBackClicked(): void {
    this.onBack.emit();
    return;
    if (!this.isFromCreateTicketAd) {
      this.router.navigate(['/previous-screen']); // Adjust the route as necessary
    }
  }

  isFormValid(): boolean {
    return this.authForm.valid;
  }

  onContinueClicked(): void {
    if (this.isFormValid()) {
      this.onContinue.emit();
      return;
      // Proceed with the authentication logic
      this.router.navigate(['/next-screen']); // Adjust the route as necessary
    }
  }
}
