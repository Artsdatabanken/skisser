import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSightingsComponent } from './explore-sightings.component';

describe('ExploreSightingsComponent', () => {
  let component: ExploreSightingsComponent;
  let fixture: ComponentFixture<ExploreSightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreSightingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreSightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
