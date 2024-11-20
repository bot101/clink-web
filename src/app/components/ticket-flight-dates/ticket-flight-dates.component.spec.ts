import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFlightDatesComponent } from './ticket-flight-dates.component';

describe('TicketFlightDatesComponent', () => {
  let component: TicketFlightDatesComponent;
  let fixture: ComponentFixture<TicketFlightDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketFlightDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketFlightDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
