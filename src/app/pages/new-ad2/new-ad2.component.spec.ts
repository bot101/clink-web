import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAd2Component } from './new-ad2.component';

describe('NewAd2Component', () => {
  let component: NewAd2Component;
  let fixture: ComponentFixture<NewAd2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAd2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
