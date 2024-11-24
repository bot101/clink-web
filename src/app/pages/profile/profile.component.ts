import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";
import { CheckboxComponent } from "../../components/checkbox/checkbox.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    CommonModule,
    RouterModule,
    FooterComponent,
    ConfirmationDialogComponent,
    CheckboxComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  showConfirmationDialog = false;
  showTrustedSellerPopup: boolean = false;
  deleteAccountConfirmed: boolean = false;
  userInfo: User | null = null;
  isLoading:boolean = false;

  constructor(private router: Router,private userService:UserService,private authService:AuthService) {

  }
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.userInfo = user;
    });
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
    this.userService.deleteUser().subscribe({
      next: ()=>{
        this.authService.signOut();
        this.router.navigate(['/']);
        this.showConfirmationDialog = false;
      }
    })
  }
}
