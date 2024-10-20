import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { TicketEventComponent } from '../ticket-event/ticket-event.component';
import { TicketEventDetailComponent } from '../ticket-event-detail/ticket-event-detail.component';
import { Router } from '@angular/router';
import { NewAdComponent } from "../new-ad/new-ad.component";
import { NewAd2Component } from "../new-ad2/new-ad2.component";
import { NewAd3Component } from "../new-ad3/new-ad3.component";

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
  stepTitles: string[] = ['מכירת כרטיס לאירוע', 'מכירת כרטיס לאירוע'];
  stepIcons: ('email' | 'flight' | 'ticket' | null)[] = ['ticket', 'ticket'];
  stepTitle: string = this.stepTitles[0];
  stepIcon: 'email' | 'flight' | 'ticket' | null = this.stepIcons[0];

  currentStep: number = 1;
  totalSteps: number = 2;

  constructor(private router: Router) {
    this.adType = this.router.url.split('/')[2] as 'ticket' | 'flight';
    console.log(this.adType);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.stepTitle = this.stepTitles[this.currentStep - 1];
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepTitle = this.stepTitles[this.currentStep - 1];
    } else {
      this.router.navigate(['/']);
    }
  }
}
