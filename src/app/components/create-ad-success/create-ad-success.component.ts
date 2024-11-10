import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ButtonComponent } from "../button/button.component";
import { FooterComponent } from "../footer/footer.component";
import { ClipboardModule } from 'ngx-clipboard';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-ad-success',
  standalone: true,
  imports: [ClipboardModule, RouterModule, HeaderComponent, ButtonComponent, FooterComponent],
  templateUrl: './create-ad-success.component.html',
  styleUrl: './create-ad-success.component.scss'
})
export class CreateAdSuccessComponent {

  @Input() shortId:string;
  BASE_URL = 'http://localhost:4200'

}
