import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAuthenticationComponent } from './pre-authentication.component';

describe('PreAuthenticationComponent', () => {
  let component: PreAuthenticationComponent;
  let fixture: ComponentFixture<PreAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreAuthenticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
