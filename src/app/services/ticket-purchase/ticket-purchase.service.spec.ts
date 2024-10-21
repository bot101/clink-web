import { TestBed } from '@angular/core/testing';

import { TicketPurchaseService } from './ticket-purchase.service';

describe('TicketPurchaseService', () => {
  let service: TicketPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
