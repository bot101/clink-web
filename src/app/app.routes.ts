import { Routes } from '@angular/router';
import { TicketEventComponent } from './pages/ticket-event/ticket-event.component';
import { TicketEventDetailComponent } from './pages/ticket-event-detail/ticket-event-detail.component';
import { NewAdComponent } from './pages/new-ad/new-ad.component';
import { NewAd2Component } from './pages/new-ad2/new-ad2.component';
import { NewAd3Component } from './pages/new-ad3/new-ad3.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { OtpComponent } from './pages/otp/otp.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { AdSelectionComponent } from './pages/ad-selection/ad-selection.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyTicketsComponent } from './pages/my-tickets/my-tickets.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { ReportComponent } from './pages/report/report.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ticket-event', component: TicketEventComponent },
    { path: 'new-ad', component: NewAdComponent },
    { path: 'ticket-event-details', component: TicketEventDetailComponent },
    { path: 'new-ad-2', component: NewAd2Component },
    { path: 'new-ad-3', component: NewAd3Component },
    
    { path: 'login', component: AuthenticationComponent },
    { path: 'otp', component: OtpComponent },
    { path: 'email-confirmation', component: EmailConfirmationComponent },
    { path: 'ad-selection', component: AdSelectionComponent },

    { path: 'profile', component: ProfileComponent },
    { path: 'my-tickets', component: MyTicketsComponent },
    { path: 'ticket-details', component: TicketDetailsComponent },
    { path: 'report', component: ReportComponent },
];     