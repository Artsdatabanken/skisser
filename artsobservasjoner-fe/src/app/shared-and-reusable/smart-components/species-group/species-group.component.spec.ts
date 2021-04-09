import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesGroupComponent } from './species-group.component';

describe('SpeciesGroupComponent', () => {
  let component: SpeciesGroupComponent;
  let fixture: ComponentFixture<SpeciesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
