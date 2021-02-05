import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportObservationsComponent } from './import-observations.component';

describe('ImportObservationsComponent', () => {
  let component: ImportObservationsComponent;
  let fixture: ComponentFixture<ImportObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportObservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
