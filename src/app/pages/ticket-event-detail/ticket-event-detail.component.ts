import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../../components/logo/logo.component';
import { Router } from '@angular/router';
import { TicketEventService } from '../../services/ticket-event.service';
import { ApiService } from '../../services/api.service';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-ticket-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent, NgxCurrencyDirective],
  providers: [CurrencyPipe],
  templateUrl: './ticket-event-detail.component.html',
  styleUrls: ['./ticket-event-detail.component.scss']
})
export class TicketEventDetailComponent implements OnInit {
  ticketQuantity: number = 1;
  costPrice: number = 0;
  salePrice: number = 0;
  ticketDetails: string = '';
  eventLink: string = '';
  previousData: any;
  costPriceInput: number | null = null;
  costPriceFormatted: string = '';
  
  constructor(
    private router: Router,
    private ticketEventService: TicketEventService,
    private apiService: ApiService,
    private currencyPipe: CurrencyPipe,
  ) {}
  
  ngOnInit() {
    this.previousData = this.ticketEventService.getFormData();
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  onFinish(): void {
    if (this.isFormValid()) {
      const completeData = {
        ...this.previousData,
        ticketQuantity: this.ticketQuantity,
        costPrice: this.costPrice,
        salePrice: this.salePrice,
        ticketDetails: this.ticketDetails,
        eventLink: this.eventLink
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

  isFormValid(): boolean {
    const costPrice = parseFloat(this.costPrice.toString().replace(/[^0-9.]/g, ''));
    const salePrice = parseFloat(this.salePrice.toString().replace(/[^0-9.]/g, ''));
    return this.ticketQuantity >= 1 && this.ticketQuantity <= 5 &&
           !isNaN(costPrice) && !isNaN(salePrice) &&
           this.costPrice.toString().trim() !== '' &&
            this.salePrice.toString().trim() !== '';
  }

  private clearForm(): void {
    this.ticketEventService.clearFormData();
    this.ticketQuantity = 1;
    this.costPrice = 0;
    this.salePrice = 0;
    this.ticketDetails = '';
    this.eventLink = '';
  }
}