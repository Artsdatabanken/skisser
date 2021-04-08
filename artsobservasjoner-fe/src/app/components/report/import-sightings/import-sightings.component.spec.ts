import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSightingsComponent } from './import-sightings.component';

describe('ImportSightingsComponent', () => {
  let component: ImportSightingsComponent;
  let fixture: ComponentFixture<ImportSightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSightingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
