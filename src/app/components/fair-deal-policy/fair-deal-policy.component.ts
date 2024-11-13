import { Component, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fair-deal-policy',
  standalone: true,
  imports: [CommonModule, FormsModule,  OnboardingHeaderComponent, ButtonComponent, CheckboxComponent],
  templateUrl: './fair-deal-policy.component.html',
  styleUrl: './fair-deal-policy.component.scss'
})
export class FairDealPolicyComponent {
  @ViewChild('positionAnchor') positionAnchor!: ElementRef;
  @Output() onBack: EventEmitter<any> = new EventEmitter();
  @Output() onContinue: EventEmitter<any> = new EventEmitter();
  currentStep: number = 1;
  totalSteps: number = 1;
  canContinue: boolean = false;
  isChecked: boolean = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const rect = this.positionAnchor.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= 0 && rect.bottom <= windowHeight - 100) {
      this.canContinue = true;
    }
  }

  nextStep() {
    this.onContinue.emit();
    return;
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  onPreviousStep() {
    this.onBack.emit();
    return;
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      // this.router.navigate([".."]);
      this.onBack.emit();
    }
  }
}
