import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAd3Component } from './new-ad3.component';

describe('NewAd3Component', () => {
  let component: NewAd3Component;
  let fixture: ComponentFixture<NewAd3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAd3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAd3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
