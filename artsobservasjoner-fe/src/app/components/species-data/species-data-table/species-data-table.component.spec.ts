import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesDataTableComponent } from './species-data-table.component';

describe('SpeciesDataTableComponent', () => {
  let component: SpeciesDataTableComponent;
  let fixture: ComponentFixture<SpeciesDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
