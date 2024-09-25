import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [
    LogoComponent,
    ProgressBarComponent,
    FormsModule
  ],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.scss'
})
export class EmailConfirmationComponent {
  email: string = '';
  confirmEmail: string = '';

  onInputEmail() {
    console.log(this.email);
  }

  onContinue() {
    console.log(this.email);
    console.log(this.confirmEmail);
  }

  isEmailMatching() {
    return this.email === this.confirmEmail;
  }
}
