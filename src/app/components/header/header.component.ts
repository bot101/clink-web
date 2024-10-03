import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { RoundedPersonComponent } from "../icons/rounded-person/rounded-person.component";
import { HamburgerComponent } from "../icons/hamburger/hamburger.component";
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, RoundedPersonComponent, HamburgerComponent, MobileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'block'
  }
})
export class HeaderComponent {

  isLoggedIn: boolean = false; // Set this based on your authentication logic
  isMobileMenuOpen: boolean = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

}
