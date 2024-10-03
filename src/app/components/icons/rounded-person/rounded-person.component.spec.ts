import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedPersonComponent } from './rounded-person.component';

describe('RoundedPersonComponent', () => {
  let component: RoundedPersonComponent;
  let fixture: ComponentFixture<RoundedPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundedPersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
