import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-agreement',
  standalone: true,
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.scss'
})
export class AgreementComponent {

}
