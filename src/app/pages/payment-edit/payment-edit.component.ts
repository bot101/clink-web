import { Component, OnInit } from '@angular/core';
import { PaymentComponent } from "../../components/payment/payment.component";
import { OnboardingHeaderComponent } from "../../components/onboarding-header/onboarding-header.component";
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-payment-edit',
  standalone: true,
  imports: [PaymentComponent, OnboardingHeaderComponent],
  templateUrl: './payment-edit.component.html',
  styleUrl: './payment-edit.component.scss'
})
export class PaymentEditComponent implements OnInit{
  userInfo: User | null = null;
  userId:string | undefined;
  constructor(private userService:UserService,private router:Router) {
  }
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {

      this.userId = user?._id;
      this.userService.updateFormData({
        fullName: user?.fullName,
        paymentType: user?.paymentType,
        paymentBank: user?.paymentBank,
        paymentBranch: user?.paymentBranch,
        paymentNumber: user?.paymentNumber 
      });
    });
  }
  cancel() {
    this.router.navigate(['/profile'])
  }
  submit(){
    const formData = this.userService.getFormData();
    if(this.userId) {
      this.userService.editUserPaymentInfo(this.userId,formData).subscribe({
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
