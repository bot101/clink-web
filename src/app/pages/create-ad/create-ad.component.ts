import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { TicketEventComponent } from '../../components/ticket-event/ticket-event.component';
import { TicketEventDetailComponent } from '../../components/ticket-event-detail/ticket-event-detail.component';
import { Router } from '@angular/router';
import { NewAdComponent } from "../../components/new-ad/new-ad.component";
import { NewAd2Component } from "../../components/new-ad2/new-ad2.component";
import { NewAd3Component } from "../../components/new-ad3/new-ad3.component";

@Component({
  selector: 'app-create-ad',
  standalone: true,
  imports: [
    CommonModule,
    OnboardingHeaderComponent,
    LogoComponent,
    TicketEventComponent,
    TicketEventDetailComponent,
    NewAdComponent,
    NewAd2Component,
    NewAd3Component
],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss'
})
export class CreateAdComponent {
  adType: 'ticket' | 'flight' = 'ticket';
  stepTitles: Record<string, string> = {
    ticket: 'מכירת כרטיס לאירוע',
    flight: 'מכירת כרטיס טיסה'
  };
  stepTitle: string = this.stepTitles[this.adType];
  currentStep: number = 1;
  totalSteps: number = 2;

  constructor(private router: Router) {
    this.adType = this.router.url.split('/')[2] as 'ticket' | 'flight';
    this.stepTitle = this.stepTitles[this.adType];
    if (this.adType === 'flight') {
      this.totalSteps = 3;
    }
    console.log(this.adType);
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
      this.router.navigate(['..']);
    }
  }
}
