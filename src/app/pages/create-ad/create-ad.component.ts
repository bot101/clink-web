import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { TicketEventComponent } from '../../components/ticket-event/ticket-event.component';
import { TicketEventDetailComponent } from '../../components/ticket-event-detail/ticket-event-detail.component';
import { Router } from '@angular/router';
import { NewAdComponent } from "../../components/new-ad/new-ad.component";
import { NewAd2Component } from "../../components/new-ad2/new-ad2.component";
import { NewAd3Component } from "../../components/new-ad3/new-ad3.component";
import { AdService } from '../../services/ad/ad.service';
import { AdSelectionComponent } from "../../components/ad-selection/ad-selection.component";
import { CreateAdSuccessComponent } from "../../components/create-ad-success/create-ad-success.component";

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
    NewAd3Component,
    AdSelectionComponent,
    CreateAdSuccessComponent
],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss'
})
export class CreateAdComponent implements OnInit, OnChanges {

  adType: 'ticket' | 'flight' | 'adSelection' = 'adSelection';
  isFinished: boolean = false;
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
  currentStep: number = 0;
  totalSteps: number = 2;
  stepTitle: string = this.stepTitles[this.adType][this.currentStep];

  constructor(private router: Router, private adService: AdService, private cdr: ChangeDetectorRef) {
    this.stepTitle = this.stepTitles[this.adType][this.currentStep];
  }

  ngOnInit() {
    this.onContextChanged();
  }

  ngOnChanges() {
    this.onContextChanged();
  }

  onContextChanged() {
    console.log('on context changed', this.adType, this.currentStep);
    this.stepTitle = this.stepTitles[this.adType][this.currentStep];
  }

  nextStep() {
    if(this.currentStep === this.totalSteps) {
      this.isFinished = true;
      return;
    }
    if (this.currentStep < this.totalSteps && this.adType !== 'adSelection') {
      this.currentStep++;
    } else if (this.adType === 'adSelection') {
      this.currentStep = 0;
    } else {
      this.onContextChanged();
    }
    console.log('next step', this.currentStep, this.totalSteps, this.adType);

    this.onContextChanged();
  }

  onAdTypeSelected($event: string) {
    // this.nextStep();
    this.adType = $event as 'ticket' | 'flight';
    if (this.adType === 'flight') {
      this.totalSteps = 3;
    } else {
      this.totalSteps = 2;
    }
    this.onContextChanged();
    this.nextStep();
  }

  previousStep() {
    if(this.currentStep === 0 && this.adType === 'adSelection') {
      this.router.navigate(['..']);
      return;
    }
    if (this.currentStep > 1) {
      this.currentStep--;
      if(this.adType !== 'adSelection' && this.currentStep === 1) {
        this.adType = 'adSelection';
        this.currentStep = 0;
      }
    } else {
      this.router.navigate(['..']);
    }
    this.onContextChanged();
  }
}
