import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flight-icon',
  standalone: true,
  imports: [],
  templateUrl: './flight-icon.component.html',
  styleUrl: './flight-icon.component.scss'
})
export class FlightIconComponent {
  @Input() outlineColor: string = '';
  @Input() fillColor: string = '';
}
