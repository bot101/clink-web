import { Component, Input } from '@angular/core';

import { RoundedPersonComponent } from '../icons/rounded-person/rounded-person.component';
import { HamburgerComponent } from "../icons/hamburger/hamburger.component";

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [ RoundedPersonComponent, HamburgerComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  host: {
    class: 'block'
  }
})
export class MainHeaderComponent {
  @Input() title: string = '';
}
