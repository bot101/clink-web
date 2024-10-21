import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';
import { FlightIconComponent } from "../../components/icons/flight-icon/flight-icon.component";
import { TicketIconComponent } from "../../components/icons/ticket-icon/ticket-icon.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-selection',
  standalone: true,
  imports: [
    OnboardingHeaderComponent,
    LogoComponent,
    CommonModule,
    FlightIconComponent,
    TicketIconComponent
],
  templateUrl: './ad-selection.component.html',
  styleUrl: './ad-selection.component.scss'
})
export class AdSelectionComponent {

  constructor(private router: Router) {}
  
  onSelect(element: HTMLInputElement, type: string) {
    element.checked = true;
    if(type === 'flight') {
      this.router.navigate(['/new-ad/flight']);  
    } else {
      this.router.navigate(['/new-ad/ticket']);  
    }
  }

  back() {
    this.router.navigate(['/']);
  }
}
