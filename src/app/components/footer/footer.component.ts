import { Component } from '@angular/core';

import { LogoDarkComponent } from "../logo-dark/logo-dark.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ LogoDarkComponent, CommonModule, RouterModule],
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
