import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFlightComponent } from './ticket-flight.component';

describe('TicketFlightComponent', () => {
  let component: TicketFlightComponent;
  let fixture: ComponentFixture<TicketFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
