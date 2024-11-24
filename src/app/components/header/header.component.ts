import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';

import { RoundedPersonComponent } from "../icons/rounded-person/rounded-person.component";
import { HamburgerComponent } from "../icons/hamburger/hamburger.component";
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,  RoundedPersonComponent, HamburgerComponent, MobileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'block'
  }
})
export class HeaderComponent implements OnInit, OnDestroy {

  isSubmenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  isMobileMenuOpen: boolean = false;
  private resizeListener: () => void = () => {};

  constructor(private router: Router, private authService:AuthService, private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.updateHeaderHeight();
    });
    this.updateHeaderHeight();
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleSubmenu(): void {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }


  private updateHeaderHeight(): void {
    const headerElement = this.el.nativeElement.querySelector('#header');
    if (headerElement) {
      const offsetHeight = headerElement.offsetHeight;
      this.renderer.setStyle(headerElement, 'height', `${offsetHeight}px`);
      console.log(offsetHeight);
      
    }
  }
  signOut() {
    this.authService.signOut();
    this.isSubmenuOpen = false;
    this.isLoggedIn = false;
  }

}
