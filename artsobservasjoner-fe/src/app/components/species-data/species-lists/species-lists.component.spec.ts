import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesListsComponent } from './species-lists.component';

describe('SpeciesListsComponent', () => {
  let component: SpeciesListsComponent;
  let fixture: ComponentFixture<SpeciesListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
