import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ExpandableSectionComponent } from '../../components/expandable-section/expandable-section.component';
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, ExpandableSectionComponent],
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  isPlatformInfoExpanded: boolean = false;
  platformInfoText: string = 'Our platform ensures secure transactions and protects both buyers and sellers...';

  ticketsSoldMessage: string = '10 tickets sold via the site';
  isTrustedSeller: boolean = true;
  showTrustedSellerInfo: boolean = false;

  eventDateTime: Date = new Date('2023-12-31T20:00:00');
  location: string = 'Stadium A, City B';

  showTrustedSellerPopup: boolean = false;
  @Output() continue = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Input() ticket:Ad

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch ticket details from a service
  }

  toggleTrustedSellerPopup() {
    this.showTrustedSellerPopup = !this.showTrustedSellerPopup;
  }

  togglePlatformInfo(): void {
    this.isPlatformInfoExpanded = !this.isPlatformInfoExpanded;
  }

  toggleTrustedSellerInfo(): void {
    this.showTrustedSellerInfo = !this.showTrustedSellerInfo;
  }

  reportSeller(): void {
    // Navigate to report screen
  }

  purchaseTicket(): void {
    // Navigate to purchase screen or initiate purchase process
    this.continue.emit();
  }
}
