import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairDealPolicyComponent } from './fair-deal-policy.component';

describe('FairDealPolicyComponent', () => {
  let component: FairDealPolicyComponent;
  let fixture: ComponentFixture<FairDealPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FairDealPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairDealPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
