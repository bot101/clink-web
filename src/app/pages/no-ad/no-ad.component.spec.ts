import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAdComponent } from './no-ad.component';

describe('NoAdComponent', () => {
  let component: NoAdComponent;
  let fixture: ComponentFixture<NoAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
