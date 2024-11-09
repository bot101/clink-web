import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { LogoDarkComponent } from "../logo-dark/logo-dark.component";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, LogoComponent, LogoDarkComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(-100%)'
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class MobileMenuComponent implements OnInit {
  menuState: 'in' | 'out' = 'out';

  @Input() isLoggedIn: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Trigger the animation after a short delay
    setTimeout(() => this.menuState = 'in', 100);
  }

  onBack(): void {
    this.menuState = 'out';
    setTimeout(() => this.close.emit(), 300);
  }

  onProfile(): void {
    this.router.navigate(['/profile']);
    this.onBack();
  }

  onCreateNewListing(): void {
    this.router.navigate(['/ad-selection']);
    this.onBack();
  }

  onLogin(): void {
    this.router.navigate(['/login']);
    this.onBack();
  }

  onHowItWorks(): void {
    this.router.navigate(['/how-it-works']);
    this.onBack();
  }

  onGuidelines(): void {
    this.router.navigate(['/guidelines']);
    this.onBack();
  }

  onAboutUs(): void {
    this.router.navigate(['/about-us']);
    this.onBack();
  }

  onContactUs(): void {
    // Implement external chat integration here
    console.log('Open external chat');
    this.onBack();
  }

  onPrivacyPolicy(): void {
    this.router.navigate(['/privacy-policy']);
    this.onBack();
  }

  onTermsOfUse(): void {
    this.router.navigate(['/terms-of-use']);
    this.onBack();
  }
}
