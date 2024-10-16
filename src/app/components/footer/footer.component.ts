import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { LogoDarkComponent } from "../logo-dark/logo-dark.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, LogoDarkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  host: {
    class: 'block'
  }
})
export class FooterComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
