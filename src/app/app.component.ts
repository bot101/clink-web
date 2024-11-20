import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Intercom from '@intercom/messenger-js-sdk';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

Intercom({
  app_id: environment.INTERCOM_APP_ID,
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService,private userService:UserService) {}
  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.userService.loadUserData();
    }
  }
}
