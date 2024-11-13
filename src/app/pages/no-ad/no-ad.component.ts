import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ButtonComponent } from "../../components/button/button.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-no-ad',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, FooterComponent, RouterModule],
  templateUrl: './no-ad.component.html',
  styleUrl: './no-ad.component.scss'
})
  export class NoAdComponent {

  constructor(private router: Router) {}

}
