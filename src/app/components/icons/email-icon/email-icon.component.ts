import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-icon',
  standalone: true,
  imports: [],
  templateUrl: './email-icon.component.html',
  styleUrl: './email-icon.component.scss'
})
export class EmailIconComponent {
  @Input() outlineColor: string = '#fff';
  @Input() fillColor: string = '#FFC5C5';
}
