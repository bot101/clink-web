import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { LogoDarkComponent } from "../logo-dark/logo-dark.component";

@Component({
  selector: 'app-pre-authentication',
  standalone: true,
  imports: [LogoComponent, LogoDarkComponent],
  templateUrl: './pre-authentication.component.html',
  styleUrl: './pre-authentication.component.scss'
})
export class PreAuthenticationComponent {

}
