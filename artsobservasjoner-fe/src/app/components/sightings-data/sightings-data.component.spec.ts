import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingsDataComponent } from './sightings-data.component';

describe('SightingsDataComponent', () => {
  let component: SightingsDataComponent;
  let fixture: ComponentFixture<SightingsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightingsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightingsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
