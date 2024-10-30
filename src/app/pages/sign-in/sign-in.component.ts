import { Component } from '@angular/core';
import { OtpComponent } from "../../components/otp/otp.component";
import { EmailConfirmationComponent } from "../../components/email-confirmation/email-confirmation.component";
import { VerificationComponent } from "../../components/verification/verification.component";
import { PaymentComponent } from "../../components/payment/payment.component";
import { FairDealPolicyComponent } from "../../components/fair-deal-policy/fair-deal-policy.component";
import { AuthenticationComponent } from "../../components/authentication/authentication.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    OtpComponent,
    EmailConfirmationComponent,
    VerificationComponent,
    PaymentComponent,
    FairDealPolicyComponent,
    AuthenticationComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  readonly screenFlow = ['phone', 'otp', 'email', 'verification', 'payment', 'fair-deal-policy'];
  currentScreenIndex = 0;
  currentScreen = this.screenFlow[this.currentScreenIndex];

  constructor(private router: Router, private authService: AuthService) {}  

  onBack() {
    this.currentScreenIndex--;
    this.currentScreen = this.screenFlow[this.currentScreenIndex];
  }

  onContinue() {
    this.currentScreenIndex++;
    if(this.currentScreenIndex >= this.screenFlow.length) {
      this.authService.signUp().subscribe((res) => {
        console.log(res);
        this.authService.clearFormData();
        this.router.navigate(["/"]);
      });
      return;
    }
    this.currentScreen = this.screenFlow[this.currentScreenIndex];
  }

}
