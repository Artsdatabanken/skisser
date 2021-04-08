import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingsCollectionComponent } from './sightings-collection.component';

describe('SightingsCollectionComponent', () => {
  let component: SightingsCollectionComponent;
  let fixture: ComponentFixture<SightingsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightingsCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightingsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
