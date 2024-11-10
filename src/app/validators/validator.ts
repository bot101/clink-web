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