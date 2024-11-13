import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketPurchaseService } from '../../services/ticket-purchase/ticket-purchase.service';
import { InputFieldComponent } from "../input-field/input-field.component";
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from '@angular/common';
import { matchEmailsValidator } from '../../validators/validator';

@Component({
  selector: 'app-ticket-purchase',
  standalone: true,
  templateUrl: './ticket-purchase.component.html',
  styleUrl: './ticket-purchase.component.scss',
  imports: [CommonModule, ReactiveFormsModule, InputFieldComponent, ButtonComponent]
})
export class TicketPurchaseComponent implements OnInit {
  @Output() continue = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  ticketPurchaseForm!: FormGroup;

  constructor(private fb: FormBuilder, private ticketPurchaseService: TicketPurchaseService) {}

  ngOnInit(): void {
    this.ticketPurchaseForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^0(5[0-9]|7[2-9])[0-9]{7}$')]]
      },
      { validators: [matchEmailsValidator] }
    )

    // Load data from service if available
    const savedData = this.ticketPurchaseService.getTicketPurchaseData();
    if (savedData) {
      this.ticketPurchaseForm.patchValue(savedData);
    }
  }

  onContinue() {
    if (this.ticketPurchaseForm.valid) {
      this.ticketPurchaseService.updateTicketPurchaseData(this.ticketPurchaseForm.value);
      this.continue.emit();
    }
  }
}
