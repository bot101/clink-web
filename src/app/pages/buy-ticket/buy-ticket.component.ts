import { Component } from '@angular/core';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";

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
  totalSteps: number = 5;
  filledTicketCount: number = 0;

  stepTitles: Record<string, {title:string,icon:'clipboard-pen' | 'check-handshake' | 'ticket' | ''}> = {
    2: {
      title:'לפני שתמשיכו בתהליך הרכישה',
      icon:'clipboard-pen'
    },
    3: {
      title:'תנאי עסקה הוגנת',
      icon:'check-handshake'
    },
    4: {
      title:'',
      icon:'ticket'
    }
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
    this.ticketPurchaseService.getTicketDetails(this.ticketId).subscribe({
      next: (ticketDetails) => {
        this.ticketDetails = ticketDetails;
      },
      error: (err)=> {
        this.currentStep = null;
      }
    });
  }
  
  nextStep() {
    if(this.currentStep === 5) {
      this.stepTitles[5].title = this.ticketDetails.event?.title || '';
    }
    if(this.currentStep && this.currentStep < this.totalSteps) {
      this.currentStep++
    }
  }
  previousStep() {
    if(this.currentStep === 5) {
      this.stepTitles[5].title = this.ticketDetails.event?.title || '';
    }
    if(this.currentStep && this.currentStep > 1) {
      this.currentStep--
    }
  }
}
