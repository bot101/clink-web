import { Routes } from '@angular/router';
import { TicketEventComponent } from './pages/ticket-event/ticket-event.component';
import { TicketEventDetailComponent } from './pages/ticket-event-detail/ticket-event-detail.component';

export const routes: Routes = [
    { path: '', component: TicketEventComponent },
    { path: 'ticket-event-details', component: TicketEventDetailComponent },
];