import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneValidateComponent } from './phone-validate.component';

describe('PhoneValidateComponent', () => {
  let component: PhoneValidateComponent;
  let fixture: ComponentFixture<PhoneValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneValidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
