import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBankComponent } from './payment-bank.component';

describe('PaymentBankComponent', () => {
  let component: PaymentBankComponent;
  let fixture: ComponentFixture<PaymentBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
