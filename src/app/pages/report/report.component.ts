import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from "../../components/input-field/input-field.component";
import { RadioGroupComponent } from "../../components/radio-group/radio-group.component";
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';
import { ReportSummaryComponent } from "../report-summary/report-summary.component";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    RadioGroupComponent,
    OnboardingHeaderComponent,
    ButtonComponent,
    ReportSummaryComponent
],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent {
  isSubmitted = false;
  reportForm: FormGroup;
  reportReasons = [
    { value: 'מחיר לא הוגן', label: 'מחיר לא הוגן' },
    { value: 'הונאה', label: 'הונאה' },
    { value: 'תוכן פוגעני', label: 'תוכן פוגעני' },
    { value: 'אחר', label: 'אחר' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.reportForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      contactPhone: ['', [Validators.pattern(/^[0-9]*$/)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      reportReason: ['', Validators.required],
      description: ['', [Validators.maxLength(300)]]
    });
    this.reportForm.valueChanges.subscribe((value) => {});
  }

  ngOnInit(): void { }

  onBack(): void {
    if(this.isSubmitted) {
      this.isSubmitted = false;
    } else {
      this.router.navigate(['../']);
    }
  }

  onSubmit(): void {
    if (this.reportForm.valid && this.reportForm.get('description')?.value) {
      this.isSubmitted = true;
    } else {
      Object.keys(this.reportForm.controls).forEach(key => {
        const control = this.reportForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
