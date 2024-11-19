import { AbstractControl, ValidatorFn, FormGroup, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export function salePriceValidator(controlName1: string, controlName2: string): ValidatorFn {
  return (formGroup: AbstractControl): {[key: string]: boolean} | null => {
    const control1 = formGroup.get(controlName1);
    const control2 = formGroup.get(controlName2);

    if (!control1 || !control2) {
      return null; 
    }

    if (control1.value > control2.value) {
      return { 'numberComparison': true }; 
    }

    return null; 
  };
}

export function matchEmailsValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.get('email')?.value;
  const confirmEmail = control.get('confirmEmail')?.value;

  return email === confirmEmail ? null : { emailsDoNotMatch: true };
}

export function dateValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^\d{2}\/\d{2}\/\d{4}$/.test(control.value);
    return valid ? null : { invalidDate: { value: control.value } };
  };
}