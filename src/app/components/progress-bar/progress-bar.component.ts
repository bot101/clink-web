import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnChanges {
  @Input() max: number = 100;
  @Input() current: number = 0;

  progressPercentage: number = 0;

  ngOnChanges(): void {
    this.updateProgress();
  }

  private updateProgress(): void {
    if (this.current > this.max) {
      this.current = this.max;
    }
    this.progressPercentage = (this.current / this.max) * 100;
  }
}
