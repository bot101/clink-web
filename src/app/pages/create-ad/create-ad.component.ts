import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";

import { TicketEventComponent } from '../../components/ticket-event/ticket-event.component';
import { TicketEventDetailComponent } from '../../components/ticket-event-detail/ticket-event-detail.component';
import { Router } from '@angular/router';
import { AdService } from '../../services/ad/ad.service';
import { AdSelectionComponent } from "../../components/ad-selection/ad-selection.component";
import { CreateAdSuccessComponent } from "../../components/create-ad-success/create-ad-success.component";
import { AuthService } from '../../services/auth/auth.service';
import { PreAuthenticationComponent } from '../../components/pre-authentication/pre-authentication.component';
import { TicketFlightComponent } from '../../components/ticket-flight/ticket-flight.component';
import { TicketFlightDatesComponent } from '../../components/ticket-flight-dates/ticket-flight-dates.component';
import { TicketFlightDetailComponent } from '../../components/ticket-flight-detail/ticket-flight-detail.component';
import { TicketDetailsComponent } from "../ticket-details/ticket-details.component";

@Component({
  selector: 'app-create-ad',
  standalone: true,
  imports: [
    CommonModule,
    OnboardingHeaderComponent,
    PreAuthenticationComponent,
    TicketEventComponent,
    TicketEventDetailComponent,
    TicketFlightComponent,
    TicketFlightDatesComponent,
    TicketFlightDetailComponent,
    AdSelectionComponent,
    CreateAdSuccessComponent,
    TicketDetailsComponent
],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss'
})
export class CreateAdComponent implements OnInit {

  adType: 'ticket' | 'flight' | 'adSelection' = 'flight';
  isLoggedIn: boolean = false;
  stepTitles: Record<string, Record<number, string>> = {
    adSelection: {
      0: 'מכירת כרטיס',
    },
    ticket: {
      1: 'מכירת כרטיס לאירוע',
      2: 'מכירת כרטיס לאירוע'
    },
    flight: {
      1: 'מכירת כרטיס טיסה',
      2: 'מכירת כרטיס טיסה',
      3: 'מכירת כרטיס טיסה'
    }
  };
  currentStep: number = 1;
  totalSteps: number = 3;
  shortId:string;

  constructor(private router: Router, private adService: AdService, private authService:AuthService) {
  }

  ngOnInit() {
  }


  onAdTypeSelected($event: string) {
    this.adType = $event as 'ticket' | 'flight';
    if (this.adType === 'flight') {
      this.totalSteps = 3;
    } else {
      this.totalSteps = 2;
    }
    this.nextStep();
  }

  previousStep() {
    if(this.currentStep === 1){
      this.router.navigate(['..']);
    } else {
      this.currentStep--;
    }
  }
  nextStep() {
    this.currentStep++;
  }
  submit(){ 
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn) {
      if(this.adType === 'flight'){
        this.adService.createFlightAd().subscribe({
          next: (res)=>{
            this.currentStep = 4;
            this.shortId = res.shortId || "";
          },
          error: ()=>{
  
          }
        });
      }
    } else {
      this.currentStep = 4;
      setTimeout(() => {
        this.router.navigate(["/sign"]);
      }, 5000);
    }
    
  }
}
