import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { RoundedPersonComponent } from "../icons/rounded-person/rounded-person.component";
import { HamburgerComponent } from "../icons/hamburger/hamburger.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, RoundedPersonComponent, HamburgerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'block'
  }
})
export class HeaderComponent {

}
