import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyTicketsComponent } from './pages/my-tickets/my-tickets.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { ReportComponent } from './pages/report/report.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { AgreementComponent } from './pages/agreement/agreement.component';
import { AboutComponent } from './pages/about/about.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { BuyTicketComponent } from './pages/buy-ticket/buy-ticket.component';
import { VerificationComponent } from './components/verification/verification.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { authGuard } from './auth/auth.guard';
import { PreAuthenticationComponent } from './components/pre-authentication/pre-authentication.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'overview', component: OverviewComponent },
    { path: 'agreement', component: AgreementComponent },
    { path: 'about', component: AboutComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'new-ad', component: CreateAdComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'verification-testing', component: VerificationComponent }, // for testing - do not delete
    { path: 'payment-testing', component: PaymentComponent }, // for testing - do not delete
    { path: 'profile', component: ProfileComponent },
    { path: 'my-tickets', component: MyTicketsComponent },
    { path: 'ticket-details', component: TicketDetailsComponent },
    { path: 'report', component: ReportComponent },
    { path: 'ticket/:ticketId', component: BuyTicketComponent },
    { path: 'buy-ticket/:ticketId', component: BuyTicketComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'start-auth', component: PreAuthenticationComponent },
    { path: '**', redirectTo: ''}
];     