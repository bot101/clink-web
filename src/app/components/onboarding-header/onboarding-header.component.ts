import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { Router } from '@angular/router';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { EmailIconComponent } from "../icons/email-icon/email-icon.component";

@Component({
  selector: 'app-onboarding-header',
  standalone: true,
  imports: [LogoComponent, ProgressBarComponent, CommonModule, EmailIconComponent],
  templateUrl: './onboarding-header.component.html',
  styleUrl: './onboarding-header.component.scss'
})
export class OnboardingHeaderComponent {
  @Input() title: string = '';
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 3;
  @Input() iconType: 'email' | 'flight' | 'ticket' | null = null;
  @Input() iconName: string | null = null;
  @Input() showLogo: boolean = true;
  @Input() hideStep: boolean = false;
  @Output() back = new EventEmitter<void>();
  
  constructor(private router: Router) {}

  onBack() {
    this.back.emit();
  }
}
