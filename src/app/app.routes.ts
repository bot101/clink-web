import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyTicketsComponent } from './pages/my-tickets/my-tickets.component';
import { ReportComponent } from './pages/report/report.component';
import { AgreementComponent } from './pages/agreement/agreement.component';
import { AboutComponent } from './pages/about/about.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { BuyTicketComponent } from './pages/buy-ticket/buy-ticket.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { authGuard } from './auth/auth.guard';
import { PreAuthenticationComponent } from './components/pre-authentication/pre-authentication.component';
import { TicketEditComponent } from './pages/ticket-edit/ticket-edit.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { PaymentEditComponent } from './pages/payment-edit/payment-edit.component';
import { TicketFlightDetailComponent } from './components/ticket-flight-detail/ticket-flight-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'overview', component: HowItWorksComponent },
    { path: 'agreement', component: AgreementComponent },
    { path: 'about', component: AboutComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'new-ad', component: CreateAdComponent },
    
    { path: 'new-ad3', component: TicketFlightDetailComponent },
    { path: 'sign', component: SignInComponent },
    { path: 'profile', 
        canActivate:[authGuard],
        children:[
            {path:'',component: ProfileComponent},
            { path:'tickets', children:[
                {path:'',component: MyTicketsComponent},
                {path:':ticketId',component:TicketEditComponent}
            ]},
            {path:'edit', component: ProfileEditComponent},
            {path:'payment', component: PaymentEditComponent}
        ] 
    },
    { path: 'report', component: ReportComponent },
    { path: 'ticket/:ticketId', component: BuyTicketComponent },
    { path: 'start-auth', component: PreAuthenticationComponent },
    { path: '**', redirectTo: ''}
]
