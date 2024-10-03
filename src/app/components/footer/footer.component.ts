import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { LogoDarkComponent } from "../logo-dark/logo-dark.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, LogoDarkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
