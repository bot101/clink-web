import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from '../../components/onboarding-header/onboarding-header.component';

@Component({
  selector: 'app-ad-selection',
  standalone: true,
  imports: [
    OnboardingHeaderComponent,
    LogoComponent,
    CommonModule
  ],
  templateUrl: './ad-selection.component.html',
  styleUrl: './ad-selection.component.scss'
})
export class AdSelectionComponent {

  onSelect(element: any) {
    element.checked = true;
  }
}
