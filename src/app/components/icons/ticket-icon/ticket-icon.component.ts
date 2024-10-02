import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ticket-icon',
  standalone: true,
  imports: [],
  templateUrl: './ticket-icon.component.html',
  styleUrl: './ticket-icon.component.scss',
  // host: {
  //   class: 'block'
  // },
  encapsulation: ViewEncapsulation.None
})
export class TicketIconComponent {
  @Input() outlineColor: string = '';
  @Input() fillColor: string = '';
}
