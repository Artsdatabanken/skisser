import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesInventoryComponent } from './species-inventory.component';

describe('SpeciesInventoryComponent', () => {
  let component: SpeciesInventoryComponent;
  let fixture: ComponentFixture<SpeciesInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
