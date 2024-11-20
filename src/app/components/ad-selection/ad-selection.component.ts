import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from '../onboarding-header/onboarding-header.component';
import { FlightIconComponent } from "../icons/flight-icon/flight-icon.component";
import { TicketIconComponent } from "../icons/ticket-icon/ticket-icon.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-selection',
  standalone: true,
  imports: [
    OnboardingHeaderComponent,

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
