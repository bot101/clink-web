import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPurchasePassengerDetailsComponent } from './ticket-purchase-passenger-details.component';

describe('TicketPurchasePassengerDetailsComponent', () => {
  let component: TicketPurchasePassengerDetailsComponent;
  let fixture: ComponentFixture<TicketPurchasePassengerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketPurchasePassengerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPurchasePassengerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
