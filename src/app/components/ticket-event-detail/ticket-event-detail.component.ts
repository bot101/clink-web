import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { OnboardingHeaderComponent } from "../onboarding-header/onboarding-header.component";
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { salePriceValidator } from '../../validators/validator';
import { AdService } from '../../services/ad/ad.service';

@Component({
  selector: 'app-ticket-event-detail',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    NgxCurrencyDirective, 
    OnboardingHeaderComponent, 
    RadioGroupComponent,
    ButtonComponent,
    InputFieldComponent 
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
    private adService: AdService,
    private fb: FormBuilder
  ) {}
  
  ngOnInit() {
    this.previousData = this.adService.getFormData();
    this.initForm();
  }

  initForm() {
    this.ticketForm = this.fb.group({
      ticketQuantity: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      costPrice: [0, [Validators.required, Validators.min(0.1)]],
      salePrice: [0, [Validators.required, Validators.min(0.1)]],
      ticketDetails: [''],
      eventLink: ['', [Validators.pattern('https?://.+')]]
    }, {
      validators: salePriceValidator('salePrice','costPrice')
    });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  onFinish(): void {
    if (this.ticketForm.valid) {
      this.adService.updateFormData(this.ticketForm.value);
      this.nextStep.emit();
    }
  }

  private clearForm(): void {
    this.adService.clearFormData();
    this.ticketForm.reset({
      ticketQuantity: 1,
      costPrice: 0,
      salePrice: 0,
      ticketDetails: '',
      eventLink: ''
    });
  }
}