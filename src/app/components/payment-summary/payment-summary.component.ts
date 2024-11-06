import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { LogoComponent } from "../logo/logo.component";
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { TicketDetails, TicketPurchaseService } from '../../services/ticket-purchase/ticket-purchase.service';
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [OnboardingHeaderComponent, LogoComponent, ButtonComponent, CommonModule, ConfirmationDialogComponent],
  templateUrl: './payment-summary.component.html',
  styleUrl: './payment-summary.component.scss'
})
export class PaymentSummaryComponent {
  @ViewChild('confirmationDialog') confirmationDialog!: ConfirmationDialogComponent;
  @Input() totalSteps: number = 0;
  @Input() currentStep: number = 0;
  @Input() title: string = '';
  @Input() iconName: string = '';
  @Input() ticketInformation: any;

  @Output() onContinue = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();

  ticketDetails: TicketDetails | undefined;

  constructor(private ticketPurchaseService: TicketPurchaseService) {}

  continue() {
    this.ticketPurchaseService.createTransaction().then(() => {
      this.onContinue.emit();
    }, (error) => {
      console.error(error);
      this.confirmationDialog.configureDialog({
        showDialog: true,
        showCancelButton: false,
        disableConfirmButton: false,
        title: 'Error!',
        message: 'An error occurred while creating the transaction',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Continue'
      });
    });
  }

  back() {
    this.onBack.emit();
  }

}
