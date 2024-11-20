import { Component } from '@angular/core';
import { EmailConfirmationComponent } from "../../components/email-confirmation/email-confirmation.component";
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [EmailConfirmationComponent, OnboardingHeaderComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
  userInfo: User | null = null;
  userId:string | undefined;
  constructor(private userService:UserService,private router:Router) {

  }
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.userId = user?._id;
      this.userService.updateFormData({email: user?.email });
    });
  }
  cancel() {
    this.router.navigate(['/profile'])
  }
  submit(){
    const formData = this.userService.getFormData();
    if(this.userId) {
      this.userService.editUserProfileInfo(this.userId,formData).subscribe({
        next: ()=>{
          this.userService.loadUserData();
          this.router.navigate(['/profile'])
        },
        error: ()=>{
  
        }
      })
    }
  }
}
