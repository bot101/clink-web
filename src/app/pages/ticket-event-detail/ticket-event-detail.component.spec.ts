import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEventDetailComponent } from './ticket-event-detail.component';

describe('TicketEventDetailComponent', () => {
  let component: TicketEventDetailComponent;
  let fixture: ComponentFixture<TicketEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketEventDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
