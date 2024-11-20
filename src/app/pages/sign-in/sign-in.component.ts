import { Component, OnInit } from '@angular/core';
import { OtpComponent } from "../../components/otp/otp.component";
import { EmailConfirmationComponent } from "../../components/email-confirmation/email-confirmation.component";
import { VerificationComponent } from "../../components/verification/verification.component";
import { PaymentComponent } from "../../components/payment/payment.component";
import { FairDealPolicyComponent } from "../../components/fair-deal-policy/fair-deal-policy.component";
import { AuthenticationComponent } from "../../components/authentication/authentication.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { AdService } from '../../services/ad/ad.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    OnboardingHeaderComponent,
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
export class SignInComponent implements OnInit {
  currentStep = 0;
  totalSteps: number = 5;
  stepTitles: Record<string, { title: string, icon: 'email' | 'check-handshake' | 'id' | 'money-hand' | '' }> = {
    1: {
      title: 'אימות מספר טלפון',
      icon: ''
    },
    2: {
      title: 'אימייל ליצירת קשר ועדכונים',
      icon: 'email'
    },
    3: {
      title: 'תנאי עסקה הוגנת',
      icon: 'id'
    },
    4: {
      title: 'פרטים לקבלת תשלום',
      icon: 'money-hand'
    },
    5: {
      title: 'תנאי עסקה הוגנת',
      icon: 'check-handshake'
    },
  };
  constructor(private router: Router, private authService: AuthService,  private userService: UserService, private adService:AdService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/profile"]);
    }
  }
  onBack() {
    this.currentStep--;
  }

  onSubmit() {
    // this.userService.signUp().subscribe((res) => {
    //   this.userService.clearFormData();
    //   this.authService.setSession(res.access_token);
    //   if(this.adService.hasFormData()) {
    //     this.adService.submitEventAd().subscribe({
    //       next: ()=>{
    //         this.router.navigate(["/profile/tickets"]);
    //       },
    //       error: ()=> {

    //       }
    //     })
    //   } else {
    //     this.router.navigate(["/"]);
    //   }
    // });
  }

  onContinue() {
    this.currentStep++;
  }

}
