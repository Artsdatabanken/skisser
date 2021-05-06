import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSightingsComponent } from './compare-sightings.component';

describe('CompareSightingsComponent', () => {
  let component: CompareSightingsComponent;
  let fixture: ComponentFixture<CompareSightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareSightingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
