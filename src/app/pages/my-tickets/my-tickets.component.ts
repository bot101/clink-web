import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { TicketEntryComponent } from "../../components/ticket-entry/ticket-entry.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, TicketEntryComponent],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.scss'
})
export class MyTicketsComponent implements OnInit {
  tickets: any[] = [];

  constructor(public router: Router) { }

  ngOnInit() {
    // Fetch tickets from a service
    // setTimeout(() => {
      this.tickets = [
        // Sample data, replace with actual data from your service
        {
          id: '1',
          name: 'Concert Ticket',
          numberOfTickets: 2,
          sold: false,
          eventDate: new Date('2023-12-31'),
          location: 'Stadium A',
          originalPrice: 100,
          salePrice: 90,
          description: 'Great seats!',
          eventWebsite: 'ticket-details'
        },
        {
          id: '2',
          name: 'Flight Ticket',
          numberOfTickets: 1,
          sold: true,
          status: 'pending',
          departureDate: new Date('2023-11-15'),
          arrivalDate: new Date('2023-11-16'),
          departureLocation: 'New York',
          arrivalLocation: 'London',
          originalPrice: 500,
          salePrice: 450,
          detailsUpdated: false
        }
      ,
      {
        id: '3',
        name: 'Theater Show',
        numberOfTickets: 3,
        sold: false,
        eventDate: new Date('2024-02-14'),
        location: 'City Theater',
        originalPrice: 75,
        salePrice: 70,
        description: 'Valentine\'s Day special performance',
        eventWebsite: 'https://citytheater.com'
      },
      {
        id: '4',
        name: 'Flight Ticket',
        numberOfTickets: 1,
        sold: true,
        status: 'completed',
        departureDate: new Date('2023-12-01'),
        arrivalDate: new Date('2023-12-02'),
        departureLocation: 'Los Angeles',
        arrivalLocation: 'Tokyo',
        originalPrice: 800,
        salePrice: 750,
        detailsUpdated: true
      },
      {
        id: '5',
        name: 'Sports Game',
        numberOfTickets: 4,
        sold: true,
        status: 'canceled',
        eventDate: new Date('2023-11-20'),
        location: 'Sports Arena',
        originalPrice: 120,
        salePrice: 100,
        description: 'Season opener',
        eventWebsite: 'https://sportsarena.com'
      }
      ];
    // }, 3000);
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  onEditTicket(ticketId: string) {
    // Navigate to edit page
    this.router.navigate(['/edit-ticket', ticketId]);
  }

  onDeleteTicket(ticketId: string) {
    // Show confirmation dialog and delete if confirmed
    if (confirm('Are you sure you want to delete this ticket?')) {
      // Delete ticket logic
      console.log('Deleting ticket:', ticketId);
    }
  }

  onCopyLink(ticketId: string) {
    // Copy link logic
    console.log('Copying link for ticket:', ticketId);
    // Show toast message
    alert('Link copied successfully');
  }

  onMarkDetailsUpdated(ticketId: string) {
    // Update ticket details logic
    console.log('Marking details updated for ticket:', ticketId);
    this.router.navigate(['/update-flight-details', ticketId]);
  }
}