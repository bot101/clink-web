import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { MainHeaderComponent } from "../../components/main-header/main-header.component";
import { ButtonComponent } from '../../components/button/button.component';
import { HeaderComponent } from "../../components/header/header.component";
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';

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
  authForm: FormGroup;
  isFromCreateTicketAd: boolean = false; // Set this based on your navigation logic

  constructor(private fb: FormBuilder, private router: Router) {
    this.authForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  onBack(): void {
    if (!this.isFromCreateTicketAd) {
      this.router.navigate(['/previous-screen']); // Adjust the route as necessary
    }
  }

  isFormValid(): boolean {
    return this.authForm.valid;
  }

  onContinue(): void {
    if (this.isFormValid()) {
      // Proceed with the authentication logic
      this.router.navigate(['/next-screen']); // Adjust the route as necessary
    }
  }
}
