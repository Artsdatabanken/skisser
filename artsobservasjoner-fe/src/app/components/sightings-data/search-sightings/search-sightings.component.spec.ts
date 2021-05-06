import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSightingsComponent } from './search-sightings.component';

describe('SearchSightingsComponent', () => {
  let component: SearchSightingsComponent;
  let fixture: ComponentFixture<SearchSightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSightingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
