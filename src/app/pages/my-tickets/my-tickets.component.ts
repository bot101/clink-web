import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { TicketEntryComponent } from "../../components/ticket-entry/ticket-entry.component";
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { AdService } from '../../services/ad/ad.service';
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, TicketEntryComponent, ConfirmationDialogComponent, OnboardingHeaderComponent],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.scss'
})
export class MyTicketsComponent implements OnInit {
  tickets: Ad[] = [];
  showConfirmationDialog: boolean = false;
  ticketId: string = '';
  isLoading:boolean = false;
  constructor(public router: Router,private adService:AdService) { }

  ngOnInit() {
    this.isLoading = true;
    this.adService.getUserAds().subscribe({
      next: (res)=>{
        this.tickets = res
        this.isLoading = false;
      }
    })
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  onEditTicket(ticketId: string) {
    this.router.navigate(['/ticketId']);
  }

  onDeleteTicket(ticketId: string) {
    this.adService.delete(ticketId).subscribe({
      next:()=>{
        this.tickets = this.tickets.filter(ticket => ticket._id.toString() !== ticketId);
      },
      error: ()=> {

      }
    })
  }

  onCopyLink(ticketId: string) {
    // Copy link logic
    // Show toast message
    //alert('Link copied successfully');
  }

  onMarkDetailsUpdated(ticketId: string) {
    this.adService.markDetailsUpdated(ticketId).subscribe(()=>{});
  }
}
