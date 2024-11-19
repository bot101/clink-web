import { Component, Input, Output, EventEmitter, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { ClipboardModule } from 'ngx-clipboard';
import { Ad } from '../../models/ad';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { registerLocaleData } from '@angular/common';
import localHe from '@angular/common/locales/he';
registerLocaleData(localHe);

@Component({
  selector: 'app-ticket-entry',
  standalone: true,
  imports: [ClipboardModule,CommonModule,RouterModule, ButtonComponent, ConfirmationDialogComponent],
  providers:[
    {
      provide: LOCALE_ID, useValue: "he-IL"
    }
  ],
  templateUrl: './ticket-entry.component.html',
  styleUrl: './ticket-entry.component.scss'
})
export class TicketEntryComponent {
  @Input() ticket: Ad;
  @Output() editTicket = new EventEmitter<string>();
  @Output() deleteTicket = new EventEmitter<string>();
  @Output() copyLink = new EventEmitter<string>();
  @Output() markDetailsUpdated = new EventEmitter<string>();

  BASE_URL = environment.BASE_URL

  isCopied = false

  showMenu: boolean = false;
  showUpdateConfirmationDialog: boolean = false;
  showDeleteConfirmationDialog: boolean = false;
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
    this.isCopied = true
  }

  onMarkDetailsUpdated() {
    if(this.ticket.flight) {
      this.ticket.flight.isConfirmChanged = true
    }
    this.markDetailsUpdated.emit(this.ticket._id);
  }

  onToggleUpdateConfirmationDialog() {
    this.showUpdateConfirmationDialog = !this.showUpdateConfirmationDialog;
  }

  onToggleDeleteConfirmationDialog() {
    this.showDeleteConfirmationDialog = !this.showDeleteConfirmationDialog;
    this.showMenu = false;
  }

  isEventPassed(): boolean {
    return new Date(String(this.ticket.event?.date)) < new Date();
  }

  onCancelConfirmation() {
    this.showUpdateConfirmationDialog = false;
    this.showDeleteConfirmationDialog = false;
  }

  onConfirmDeleteAction() {
    this.onDeleteTicket()
    this.showDeleteConfirmationDialog = false;
  }

  onConfirmUpdateAction() {
    this.onMarkDetailsUpdated();
    this.showUpdateConfirmationDialog = false;
  }
}
