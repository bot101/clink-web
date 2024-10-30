import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdSuccessComponent } from './create-ad-success.component';

describe('CreateAdSuccessComponent', () => {
  let component: CreateAdSuccessComponent;
  let fixture: ComponentFixture<CreateAdSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
