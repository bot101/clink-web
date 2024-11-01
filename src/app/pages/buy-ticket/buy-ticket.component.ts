import { Component } from '@angular/core';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { ActivatedRoute, Router } from '@angular/router';
import { TicketPurchaseComponent } from "../../components/ticket-purchase/ticket-purchase.component";
import { TicketPurchasePassengerDetailsComponent } from "../../components/ticket-purchase-passenger-details/ticket-purchase-passenger-details.component";
import { CommonModule } from '@angular/common';
import { PaymentSummaryComponent } from "../../components/payment-summary/payment-summary.component";
import { FairDealPolicyComponent } from "../../components/fair-deal-policy/fair-deal-policy.component";
import { TicketPurchaseSuccessComponent } from '../../components/ticket-purchase-success/ticket-purchase-success.component';

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [
    CommonModule,
    OnboardingHeaderComponent,
    LogoComponent,
    TicketPurchaseComponent,
    TicketPurchasePassengerDetailsComponent,
    PaymentSummaryComponent,
    FairDealPolicyComponent,
    TicketPurchaseSuccessComponent
],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.scss'
})
export class BuyTicketComponent {
  ticketId: string;
  currentStep: number = 1;
  totalSteps: number = 6;
  iconName: 'clipboard-pen' | 'id' = 'clipboard-pen';

  stepTitles: Record<string, string> = {
    1: 'לפני שתמשיכו בתהליך הרכישה',
    2: 'פרטים לשינוי שם הכרטיס',
    3: 'תנאי עסקה הוגנת'
  };


  constructor(private route: ActivatedRoute, private router: Router) {
    this.ticketId = this.route.snapshot.params['ticketId'];
  }

  ngOnInit() {
    console.log(this.ticketId);
  }

  stepChange(step: number) {
    this.iconName = step === 1 ? 'clipboard-pen' : 'id';
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.stepChange(this.currentStep);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepChange(this.currentStep);
    } else {
      this.router.navigate(['..']);
    }
  }
}
