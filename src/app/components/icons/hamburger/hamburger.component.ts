import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.scss'
})
export class HamburgerComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  onClick(): void {
    this.toggleMenu.emit();
  }
}
