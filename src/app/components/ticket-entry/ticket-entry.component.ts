import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { ClipboardModule } from 'ngx-clipboard';
import { Ad } from '../../models/ad';

@Component({
  selector: 'app-ticket-entry',
  standalone: true,
  imports: [ClipboardModule,CommonModule, ButtonComponent, ConfirmationDialogComponent],
  templateUrl: './ticket-entry.component.html',
  styleUrl: './ticket-entry.component.scss'
})
export class TicketEntryComponent {
  @Input() ticket: Ad;
  @Input() isFlightTicket: boolean = false;
  @Output() editTicket = new EventEmitter<string>();
  @Output() deleteTicket = new EventEmitter<string>();
  @Output() copyLink = new EventEmitter<string>();
  @Output() markDetailsUpdated = new EventEmitter<string>();

  BASE_URL = 'http://localhost:4200'

  isCopied = false

  showMenu: boolean = false;
  showConfirmationDialog: boolean = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onEditTicket() {
    this.editTicket.emit(this.ticket._id);
  }

  onDeleteTicket() {
    this.deleteTicket.emit(this.ticket._id);
  }

  onCopyLink() {
    //this.copyLink.emit(this.ticket._id);
    this.isCopied = true
  }

  onMarkDetailsUpdated() {
    this.markDetailsUpdated.emit(this.ticket._id);
  }

  onToggleConfirmationDialog() {
    this.showConfirmationDialog = !this.showConfirmationDialog;
  }

  isEventPassed(): boolean {
    return new Date(String(this.ticket.event?.date)) < new Date();
  }

  onCancelConfirmation() {
    this.showConfirmationDialog = false;
  }

  onConfirmAction() {
    this.onMarkDetailsUpdated();
    this.showConfirmationDialog = false;
  }
}
