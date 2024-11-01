import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";
import { CheckboxComponent } from "../../components/checkbox/checkbox.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    CommonModule,
    FooterComponent,
    ConfirmationDialogComponent,
    CheckboxComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  showConfirmationDialog = false;
  isTrustedSeller: boolean = false;
  showTrustedSellerPopup: boolean = false;
  ticketsSold: number = 0;
  deleteAccountConfirmed: boolean = false;

  constructor(private router: Router) {}

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
    this.showConfirmationDialog = true;
  }
  onDeleteAccountConfirm(evt: Event) {
    this.deleteAccountConfirmed = (evt.target as HTMLInputElement).checked;
  }

  onCancelConfirmation() {
    this.showConfirmationDialog = false;
  }

  onConfirmAction() {
    // TODO: Implement action
    this.showConfirmationDialog = false;
  }
}
