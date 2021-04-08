import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingsMapComponent } from './sightings-map.component';

describe('SightingsMapComponent', () => {
  let component: SightingsMapComponent;
  let fixture: ComponentFixture<SightingsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightingsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightingsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
