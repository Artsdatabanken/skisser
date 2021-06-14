import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSpeciesListComponent } from './detailed-species-list.component';

describe('DetailedSpeciesListComponent', () => {
  let component: DetailedSpeciesListComponent;
  let fixture: ComponentFixture<DetailedSpeciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSpeciesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSpeciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
