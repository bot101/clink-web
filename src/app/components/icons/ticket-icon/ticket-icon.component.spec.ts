import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketIconComponent } from './ticket-icon.component';

describe('TicketIconComponent', () => {
  let component: TicketIconComponent;
  let fixture: ComponentFixture<TicketIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
