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
import { ApiService } from '../../services/api/api.service';
import { NoAdComponent } from "../no-ad/no-ad.component";
import { TicketPurchaseService } from '../../services/ticket-purchase/ticket-purchase.service';
import { TicketDetailsComponent } from "../ticket-details/ticket-details.component";
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [
    CommonModule,
    OnboardingHeaderComponent,
    LogoComponent,
    TicketDetailsComponent,
    TicketPurchaseComponent,
    TicketPurchasePassengerDetailsComponent,
    PaymentSummaryComponent,
    FairDealPolicyComponent,
    TicketPurchaseSuccessComponent,
    NoAdComponent,
    TicketDetailsComponent
],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.scss'
})
export class BuyTicketComponent {
  ticketId: string;
  ticketDetails: Ad;
  currentStep: number | null = 1;
  totalSteps: number = 6;
  filledTicketCount: number = 0;
  iconName: 'clipboard-pen' | 'id' = 'clipboard-pen';

  stepTitles: Record<string, string> = {
    2: 'לפני שתמשיכו בתהליך הרכישה',
    3: 'פרטים לשינוי שם הכרטיס',
    4: 'תנאי עסקה הוגנת'
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketPurchaseService: TicketPurchaseService
  ) {
    this.ticketId = this.route.snapshot.params['ticketId'];
  }

  ngOnInit() {
    this.getTicketDetails();
  }

  getTicketDetails() {
    this.ticketPurchaseService.getTicketDetails(this.ticketId).subscribe((ticketDetails) => {
      this.ticketDetails = ticketDetails;
    });
  }

  stepChange(step: number) {
    this.iconName = step === 1 ? 'clipboard-pen' : 'id';
  }

  nextStep() {
    console.log('Before next step', {
      currentStep: this.currentStep, 
      filledTicketCount: this.filledTicketCount,
      ticketDetails: this.ticketDetails
    });
    if (this.currentStep && this.currentStep < this.totalSteps) {
      if (this.currentStep === 2 && this.ticketDetails.type === 'flight') {
        if(this.filledTicketCount < 0) {
          this.filledTicketCount = 0;
        }
        if (this.filledTicketCount < this.ticketDetails.amount - 1) {
          this.filledTicketCount++;
          console.log('After next step (filling tickets)', {
            currentStep: this.currentStep, 
            filledTicketCount: this.filledTicketCount,
            ticketDetails: this.ticketDetails
          });
          return;
        }
      }
      this.currentStep++;
      this.stepChange(this.currentStep);
    }
    console.log('After next step', {
      currentStep: this.currentStep, 
      filledTicketCount: this.filledTicketCount,
      ticketDetails: this.ticketDetails
    });
  }
  // Short IDs
  // gM9O2xhB - flight:amount:3
  // gM5QOdhV - flight:amount:10
  previousStep() {
    console.log('Before previous step', {
      currentStep: this.currentStep, 
      filledTicketCount: this.filledTicketCount,
      ticketDetails: this.ticketDetails
    });
    if (this.currentStep && this.currentStep > 1) {
      if (this.currentStep === 2 && this.ticketDetails.type === 'flight') {
        if (this.filledTicketCount > 0) {
          this.filledTicketCount--;
          console.log('After previous step (filling tickets)', {
            currentStep: this.currentStep, 
            filledTicketCount: this.filledTicketCount,
            ticketDetails: this.ticketDetails
          });
          return;
        }
      }
      this.currentStep--;
      this.stepChange(this.currentStep);
    } else {
      this.router.navigate(['..']);
    }
    console.log('After previous step', {
      currentStep: this.currentStep, 
      filledTicketCount: this.filledTicketCount,
      ticketDetails: this.ticketDetails
    });
  }
}
