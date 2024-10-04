import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-entry.component.html',
  styleUrl: './ticket-entry.component.scss'
})
export class TicketEntryComponent {
  @Input() ticket: any;
  @Input() isFlightTicket: boolean = false;
  @Output() editTicket = new EventEmitter<string>();
  @Output() deleteTicket = new EventEmitter<string>();
  @Output() copyLink = new EventEmitter<string>();
  @Output() markDetailsUpdated = new EventEmitter<string>();

  showMenu: boolean = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onEditTicket() {
    this.editTicket.emit(this.ticket.id);
  }

  onDeleteTicket() {
    this.deleteTicket.emit(this.ticket.id);
  }

  onCopyLink() {
    this.copyLink.emit(this.ticket.id);
  }

  onMarkDetailsUpdated() {
    this.markDetailsUpdated.emit(this.ticket.id);
  }

  isEventPassed(): boolean {
    return new Date(this.ticket.eventDate) < new Date();
  }
}
