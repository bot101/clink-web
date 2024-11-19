import { Component, OnInit } from '@angular/core';
import { TicketEventComponent } from '../../components/ticket-event/ticket-event.component';
import { TicketEventDetailComponent } from '../../components/ticket-event-detail/ticket-event-detail.component';
import { CreateAdComponent } from '../create-ad/create-ad.component';
import { AdService } from '../../services/ad/ad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { Ad } from '../../models/ad';
import { TicketFlightComponent } from '../../components/ticket-flight/ticket-flight.component';
import { TicketFlightDatesComponent } from '../../components/ticket-flight-dates/ticket-flight-dates.component';
import { TicketFlightDetailComponent } from '../../components/ticket-flight-detail/ticket-flight-detail.component';

@Component({
  selector: 'app-ticket-edit',
  standalone: true,
  imports: [
    CommonModule,
    TicketEventComponent,
    TicketEventDetailComponent,
    CreateAdComponent,
    OnboardingHeaderComponent,
    TicketEventDetailComponent,
    TicketEventComponent,
    TicketFlightComponent,
    TicketFlightDatesComponent,
    TicketFlightDetailComponent
  ],
  templateUrl: './ticket-edit.component.html',
  styleUrl: './ticket-edit.component.scss',
})
export class TicketEditComponent implements OnInit {
  ticketId: string | null = null;
  currentStep = 1;
  totalSteps = 3;
  adType: 'flight' | 'event' = 'flight';
  ad:Ad
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
  constructor(private adService: AdService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {

    this.ticketId = this.route.snapshot.paramMap.get('ticketId'); 
    if(this.ticketId) {
      this.adService.getAdById(this.ticketId).subscribe({ 
        next: (ad) => {
          this.adType = ad.type;
          this.ad = ad;
          if(ad.type === 'event') {
            this.adService.updateFormData({
              eventName:ad.event?.title,
              eventDate: this.formatDate(ad.event?.date) ,
              eventLocation: ad.event?.location,
              eventLink: ad.event?.url,
              eventTime: this.formatTime(ad.event?.date),
              ticketDetails: ad.details
            });

          } else {
            this.adService.updateFormData({
              ticketDetails: ad.details,
              ticketQuantity: ad.amount,
              costPrice: ad.buyPrice,
              salePrice: ad.sellPrice,
              flightDestination: ad.flight?.destination,
              flightNumber: ad.flight?.number,
              flightType: ad.flight?.type,
              airlineName: ad.flight?.airline,
              departureDate: this.formatDate(ad.flight?.outboundDepartureDate),
              arrivalDate: this.formatDate(ad.flight?.outboundArrivalDate),
              returnDate: this.formatDate(ad.flight?.inboundArrivalDate),
              returnDepartureDate: this.formatDate(ad.flight?.inboundDepartureDate),
              departureTime: this.formatTime(ad.flight?.outboundDepartureDate),
              arrivalTime: this.formatTime(ad.flight?.outboundArrivalDate),
              returnTime: this.formatTime(ad.flight?.inboundArrivalDate),
              returnDepartureTime: this.formatTime(ad.flight?.inboundDepartureDate),
  
            });
          }
        } 
      });
    }

  }

  
  previousStep() {
    if(this.currentStep === 1){
      this.router.navigate(['/profile/tickets'])
    } else {
      this.currentStep--;
    }
  }
  nextStep() {
    this.currentStep++;
  }
  submit(){ 
    if(this.ticketId) {
      if(this.adType === 'flight'){
        this.adService.updateFlightAd(this.ad._id).subscribe({
          next: ()=>{
            this.router.navigate(['/profile/tickets']);
          },
          error: ()=>{
  
          }
        });
      } else {

      }
    }
  
  }
  private formatDate(dateString: string | undefined): string | undefined{
    if(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return undefined
    
  }
  private formatTime(dateString: string | undefined): string  | undefined{
    if(dateString) {

      const date = new Date(dateString);
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = (date.getMinutes()).toString().padStart(2, '0');
      return `${hour}:${minute}`;
    }
    return undefined
  }
}
