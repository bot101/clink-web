import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFlightDetailComponent } from './ticket-flight-detail.component';

describe('TicketFlightDetailComponent', () => {
  let component: TicketFlightDetailComponent;
  let fixture: ComponentFixture<TicketFlightDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketFlightDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketFlightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
