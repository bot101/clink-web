import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() buttonClasses: string = 'w-full px-4 py-3 border rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';

  onClick(event: Event): void {
    console.log('Button clicked');
  }
}
