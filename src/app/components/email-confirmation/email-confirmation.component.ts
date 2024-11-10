import { Component, EventEmitter, Output } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from "../input-field/input-field.component";
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, debounceTime, delay, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
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
  emailForm: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService) { 
    this.emailForm = this.fb.group({
        email: [
          '',
          [Validators.required, Validators.email]
        ],
        confirmEmail: ['', [Validators.required, Validators.email]]
        },
        { validators: [this.matchEmailsValidator] }
    );
  }

  ngOnInit(): void {
    this.emailForm.patchValue(this.authService.getFormData());
  }

  async onContinueClicked() {
    this.authService.checkEmailAvailability(this.emailForm.get('email')?.value).subscribe({
      next:(isAvailable)=>{
        if (!isAvailable) {
            this.emailForm.setErrors({ emailTaken: true });
        } else {
            this.emailForm.setErrors(null);
            this.authService.updateFormData({ email: this.emailForm.get('email')?.value });
            this.onContinue.emit();
        }
      }
    })
  }

  onBackClicked() {
    this.onBack.emit();
    return;
  }

  matchEmailsValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.get('email')?.value;
    const confirmEmail = control.get('confirmEmail')?.value;

    return email === confirmEmail ? null : { emailsDoNotMatch: true };
  }
}
