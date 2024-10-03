import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { LogoDarkComponent } from "../logo-dark/logo-dark.component";

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, LogoComponent, LogoDarkComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
  @Input() isLoggedIn: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  onBack(): void {
    this.close.emit();
  }

  onCreateNewListing(): void {
    this.router.navigate(['/ad-selection']);
    this.close.emit();
  }

  onLogin(): void {
    this.router.navigate(['/login']);
    this.close.emit();
  }

  onHowItWorks(): void {
    this.router.navigate(['/how-it-works']);
    this.close.emit();
  }

  onGuidelines(): void {
    this.router.navigate(['/guidelines']);
    this.close.emit();
  }

  onAboutUs(): void {
    this.router.navigate(['/about-us']);
    this.close.emit();
  }

  onContactUs(): void {
    // Implement external chat integration here
    console.log('Open external chat');
    this.close.emit();
  }

  onPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']);
    this.close.emit();
  }

  onTermsOfUse(): void {
    this.router.navigate(['/terms-of-use']);
    this.close.emit();
  }
}
