import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSpeciesListTableComponent } from './detailed-species-list-table.component';

describe('DetailedSpeciesListTableComponent', () => {
  let component: DetailedSpeciesListTableComponent;
  let fixture: ComponentFixture<DetailedSpeciesListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSpeciesListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSpeciesListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
