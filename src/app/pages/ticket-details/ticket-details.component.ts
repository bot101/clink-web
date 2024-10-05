import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ExpandableSectionComponent } from '../../components/expandable-section/expandable-section.component';

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
  sellerName: string = 'John Doe';
  ticketsSoldMessage: string = '10 tickets sold via the site';
  isTrustedSeller: boolean = true;
  showTrustedSellerInfo: boolean = false;
  eventName: string = 'Concert XYZ';
  uniqueIdentifier: string = 'ABC123';
  numberOfTickets: number = 2;
  eventDateTime: Date = new Date('2023-12-31T20:00:00');
  location: string = 'Stadium A, City B';
  originalPrice: number = 100;
  salePrice: number = 90;
  officialWebsite: string | null = 'https://example.com/event';
  additionalDetails: string | null = 'Great seats with an amazing view!';
  showTrustedSellerPopup: boolean = false;

  constructor() {}

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
  }
}
