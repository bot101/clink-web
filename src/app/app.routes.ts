import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { OtpComponent } from './components/otp/otp.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { AdSelectionComponent } from './components/ad-selection/ad-selection.component';
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
import { NoAdComponent } from './pages/no-ad/no-ad.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { BuyTicketComponent } from './pages/buy-ticket/buy-ticket.component';
import { VerificationComponent } from './components/verification/verification.component';
import { PaymentComponent } from './components/payment/payment.component';

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
    { path: 'no-ad', component: NoAdComponent },
    { path: 'ticket/:ticketId', component: BuyTicketComponent },
    { path: 'buy-ticket/:ticketId', component: BuyTicketComponent },
    { path: '**', redirectTo: ''}
];     