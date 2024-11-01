import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPurchaseSuccessComponent } from './ticket-purchase-success.component';

describe('TicketPurchaseSuccessComponent', () => {
  let component: TicketPurchaseSuccessComponent;
  let fixture: ComponentFixture<TicketPurchaseSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketPurchaseSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPurchaseSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
