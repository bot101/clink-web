import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router) {}

  isTrustedSeller: boolean = false;
  showTrustedSellerPopup: boolean = false;
  ticketsSold: number = 0;

  ngOnInit() {
    // Fetch user data and set properties
    this.fetchUserData();
  }

  fetchUserData() {
    // TODO: Implement API call to fetch user data
    // For now, we'll use mock data
    this.isTrustedSeller = true;
    this.ticketsSold = 10;
  }

  toggleTrustedSellerPopup() {
    this.showTrustedSellerPopup = !this.showTrustedSellerPopup;
  }

  onSellTicket() {
    this.router.navigate(['/new-ad']);
  }

  onTicketsForSale() {
    this.router.navigate(['/my-tickets']);
  }

  onUpdateEmail() {
    this.router.navigate(['/update-email']);
  }

  onUpdatePayment() {
    this.router.navigate(['/update-payment']);
  }

  onDeleteAccount() {
    this.router.navigate(['/delete-account']);
  }
}
