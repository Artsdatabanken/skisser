import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesWithNoDataComponent } from './species-with-no-data.component';

describe('SpeciesWithNoDataComponent', () => {
  let component: SpeciesWithNoDataComponent;
  let fixture: ComponentFixture<SpeciesWithNoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesWithNoDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesWithNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
