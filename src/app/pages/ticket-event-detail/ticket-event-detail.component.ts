import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../components/logo/logo.component';
import { TicketEventService } from '../../services/ticket-event.service';
import { ApiService } from '../../services/api.service';
import { NgxCurrencyDirective } from 'ngx-currency';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-ticket-event-detail',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    LogoComponent, 
    NgxCurrencyDirective, 
    OnboardingHeaderComponent, 
    RadioGroupComponent,
    ButtonComponent
  ],
  providers: [CurrencyPipe],
  templateUrl: './ticket-event-detail.component.html',
  styleUrls: ['./ticket-event-detail.component.scss']
})
export class TicketEventDetailComponent implements OnInit {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  ticketForm!: FormGroup;
  previousData: any;
  
  constructor(
    private router: Router,
    private ticketEventService: TicketEventService,
    private apiService: ApiService,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder
  ) {}
  
  ngOnInit() {
    this.previousData = this.ticketEventService.getFormData();
    this.initForm();
  }

  initForm() {
    this.ticketForm = this.fb.group({
      ticketQuantity: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      costPrice: [0, [Validators.required, Validators.min(0.1)]],
      salePrice: [0, [Validators.required, Validators.min(0.1)]],
      ticketDetails: [''],
      eventLink: ['', [Validators.pattern('https?://.+')]]
    });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  onFinish(): void {
    if (this.ticketForm.valid) {
      const completeData = {
        ...this.previousData,
        ...this.ticketForm.value
      };

      this.apiService.submitTicketEvent(completeData).subscribe(
        (response: any) => {
          alert('Ticket event submitted successfully');
          this.clearForm();
          this.router.navigate(['/']);
        },
        (error: any) => {
          alert('Error submitting ticket event');
        }
      );
    }
  }

  private clearForm(): void {
    this.ticketEventService.clearFormData();
    this.ticketForm.reset({
      ticketQuantity: 1,
      costPrice: 0,
      salePrice: 0,
      ticketDetails: '',
      eventLink: ''
    });
  }
}