import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { Router } from '@angular/router';
import { ButtonComponent } from "../../components/button/button.component";
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fair-deal-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent, OnboardingHeaderComponent, ButtonComponent, CheckboxComponent],
  templateUrl: './fair-deal-policy.component.html',
  styleUrl: './fair-deal-policy.component.scss'
})
export class FairDealPolicyComponent {
  @ViewChild('positionAnchor') positionAnchor!: ElementRef;
  currentStep: number = 1;
  totalSteps: number = 2;
  canContinue: boolean = false;
  isChecked: boolean = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const rect = this.positionAnchor.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= 0 && rect.bottom <= windowHeight - 100) {
      console.log('Position anchor is in view and 100px above the viewport bottom');
      this.canContinue = true;
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate([".."]);
    }
  }
}
