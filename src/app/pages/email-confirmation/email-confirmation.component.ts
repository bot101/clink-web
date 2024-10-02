import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [
    LogoComponent,
    ProgressBarComponent,
    FormsModule,
    ButtonComponent,
    OnboardingHeaderComponent
],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.scss'
})
export class EmailConfirmationComponent {
  email: string = '';
  confirmEmail: string = '';
  matchingEmails: boolean = false;

  onInputEmail() {
    console.log(this.email);
    this.matchingEmails = this.isEmailMatching();
  }

  onContinue() {
    console.log(this.email);
    console.log(this.confirmEmail);
  }

  isEmailMatching() {
    return this.email === this.confirmEmail;
  }
}
