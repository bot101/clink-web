import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ButtonComponent } from "../../components/button/button.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'app-create-ad-success',
  standalone: true,
  imports: [ClipboardModule, HeaderComponent, ButtonComponent, FooterComponent],
  templateUrl: './create-ad-success.component.html',
  styleUrl: './create-ad-success.component.scss'
})
export class CreateAdSuccessComponent {

}
