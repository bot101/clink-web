import { Component, Input } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { Router } from '@angular/router';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-header',
  standalone: true,
  imports: [LogoComponent, ProgressBarComponent, CommonModule],
  templateUrl: './onboarding-header.component.html',
  styleUrl: './onboarding-header.component.scss'
})
export class OnboardingHeaderComponent {
  @Input() title: string = '';
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 3;
  @Input() iconType: 'event' | 'ticket' = 'event';
  @Input() showLogo: boolean = true;
  @Input() hideStep: boolean = false;
  
  constructor(private router: Router) {}
  onBack() {
    this.router.navigate(['/']);
  }
}
