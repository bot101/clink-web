import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { LogoDarkComponent } from "../logo-dark/logo-dark.component";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule,RouterModule,  LogoDarkComponent],
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

  closeMenu(): void {
    this.menuState = 'out';
    setTimeout(() => this.close.emit(), 300);
  }

}
