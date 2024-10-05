import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expandable-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expandable-section.component.html',
  styleUrls: ['./expandable-section.component.scss'],
  animations: [
    trigger('contentExpansion', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ExpandableSectionComponent {
  @Input() title: string = '';
  @Input() isExpanded: boolean = false;
  @Output() toggleExpand: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggle() {
    this.isExpanded = !this.isExpanded;
    this.toggleExpand.emit(this.isExpanded);
  }
}
