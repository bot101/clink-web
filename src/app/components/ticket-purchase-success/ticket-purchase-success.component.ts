import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { ButtonComponent } from "../button/button.component";
import { ClipboardModule } from 'ngx-clipboard';
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-purchase-success',
  standalone: true,
  imports: [
    ClipboardModule,
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    FooterComponent
  ],
  templateUrl: './ticket-purchase-success.component.html',
  styleUrl: './ticket-purchase-success.component.scss'
})
export class TicketPurchaseSuccessComponent {
  constructor(private router: Router) { }

  sellATicket() {
    this.router.navigate(['/new-ad']);
  }
}
