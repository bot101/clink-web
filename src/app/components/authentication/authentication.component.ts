import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';
import { LogoComponent } from '../logo/logo.component';
import { MainHeaderComponent } from "../main-header/main-header.component";
import { ButtonComponent } from '../button/button.component';
import { HeaderComponent } from "../header/header.component";
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    // FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
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
export class AuthenticationComponent implements OnInit {
  @Output() onBack = new EventEmitter<void>();
  @Output() onContinue = new EventEmitter<void>();
  authForm: FormGroup;
  isFromCreateTicketAd: boolean = false; // Set this based on your navigation logic

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.authForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^0(5[0-9]|7[2-9])[0-9]{7}$')]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    const formData = this.authService.getFormData();
    this.authForm.patchValue(formData);
  }

  onBackClicked(): void {
    this.onBack.emit();
    if (!this.isFromCreateTicketAd) {
      this.router.navigate(['/previous-screen']); // Adjust the route as necessary
    }
  }

  isFormValid(): boolean {
    return this.authForm.valid;
  }

  onContinueClicked(): void {
    if (this.isFormValid()) {
      this.authService.updateFormData(this.authForm.value);
      this.authService.sendOTP(this.authForm.get('phone')?.value)
      .subscribe({
          next: (res)=>{
            this.onContinue.emit();
          },
          error: (err) => {
            console.log(err);
            
          },
      })
      return;
      // Proceed with the authentication logic
      this.router.navigate(['/next-screen']); // Adjust the route as necessary
    }
  }
}
