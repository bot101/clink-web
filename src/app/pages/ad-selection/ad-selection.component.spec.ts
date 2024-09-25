import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSelectionComponent } from './ad-selection.component';

describe('AdSelectionComponent', () => {
  let component: AdSelectionComponent;
  let fixture: ComponentFixture<AdSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
