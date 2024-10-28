import { Component, EventEmitter, Output } from '@angular/core';
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
  styleUrl: './ad-selection.component.scss',
  host: {
    class: 'block'
  }
})
export class AdSelectionComponent {
  @Output() onAdTypeSelected = new EventEmitter<string>();

  constructor(private router: Router) { }

  onSelect(element: HTMLInputElement, type: string) {
    setTimeout(() => {
      this.onAdTypeSelected.emit(type);
      return;
    }, 1000);
    element.checked = true;
  }

  back() {
    this.router.navigate(['..']);
  }
}
