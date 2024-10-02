import { Component, Input } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  host: {
    class: 'block'
  }
})
export class MainHeaderComponent {
  @Input() title: string = '';
}
