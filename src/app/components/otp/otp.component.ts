import { Component, EventEmitter, Output } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    LogoComponent,
    CommonModule,
    FormsModule,
    ButtonComponent,
    OnboardingHeaderComponent
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {

  @Output() onBack = new EventEmitter<void>();
  @Output() onContinue = new EventEmitter<void>();

  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';

  onInput(event: any, nextInput: number): void {
    const input = event.target;
    if (input.value.length === 0 && nextInput > 1) {
      const prevElement = document.querySelector(`input[name='otp${nextInput - 1}']`) as HTMLInputElement;
      if (prevElement) {
        prevElement.focus();
        prevElement.select();
      }
    }
    if (input.value.length === 1 && nextInput <= 5) {
      const nextElement = document.querySelector(`input[name='otp${nextInput + 1}']`) as HTMLElement;
      if (nextElement) {
        nextElement.focus();
      }
    }
  }
  isOtpComplete(): boolean {
    return !!this.otp1 && !!this.otp2 && !!this.otp3 && !!this.otp4 && !!this.otp5;
  }

  onContinueClicked(): void {
    if (this.isOtpComplete()) {
      console.log('OTP entered:', this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5);
      this.onContinue.emit();
      return;
    } else {
      console.log('OTP is not complete');
    }
    console.log('OTP entered:', this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5);
  }

  onBackClicked(): void {
    this.onBack.emit();
    return;
  }

  onResend() {
    console.log('Resend');
  }
}
