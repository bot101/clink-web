import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ButtonComponent } from "../../components/button/button.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-summary',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, FooterComponent],
  templateUrl: './report-summary.component.html',
  styleUrl: './report-summary.component.scss'
})
export class ReportSummaryComponent {
  constructor(private router: Router) {}
  goHome(): void {
    this.router.navigate(['/']);
  }
}
