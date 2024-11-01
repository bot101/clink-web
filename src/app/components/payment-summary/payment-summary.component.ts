import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { LogoComponent } from "../logo/logo.component";
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [OnboardingHeaderComponent, LogoComponent, ButtonComponent, CommonModule],
  templateUrl: './payment-summary.component.html',
  styleUrl: './payment-summary.component.scss'
})
export class PaymentSummaryComponent {
  @Input() totalSteps: number = 0;
  @Input() currentStep: number = 0;
  @Input() title: string = '';
  @Input() iconName: string = '';

  @Output() onContinue = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();

  continue() {
    this.onContinue.emit();
  }

  back() {
    this.onBack.emit();
  }

}
