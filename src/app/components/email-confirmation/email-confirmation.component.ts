import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from "../input-field/input-field.component";
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, debounceTime, delay, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';
import { matchEmailsValidator } from '../../validators/validator';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,

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
  @Input() isEditMode:boolean = false;
  email: string = '';
  confirmEmail: string = '';
  matchingEmails: boolean = false;
  formData: any;
  emailForm: FormGroup;
  constructor(private fb: FormBuilder,private userService: UserService) { 
    this.emailForm = this.fb.group({
        email: [
          '',
          [Validators.required, Validators.email]
        ],
        confirmEmail: ['', [Validators.required, Validators.email]]
        },
        { validators: [matchEmailsValidator] }
    );
  }

  ngOnInit(): void {
    this.userService.formData$.subscribe((formData) => {
      this.emailForm.patchValue(formData);
    });
  }

  async onContinueClicked() {
    this.userService.checkEmailAvailability(this.emailForm.get('email')?.value).subscribe({
      next:(isAvailable)=>{
        if (!isAvailable) {
            this.emailForm.setErrors({ emailTaken: true });
        } else {
            this.emailForm.setErrors(null);
            this.userService.updateFormData({ email: this.emailForm.get('email')?.value });
            this.onContinue.emit();
        }
      }
    })
  }

  previousStep() {
    this.onBack.emit();
  }


}
