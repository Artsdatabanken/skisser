import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportObservationComponent } from './report-observation.component';

describe('ReportObservationComponent', () => {
  let component: ReportObservationComponent;
  let fixture: ComponentFixture<ReportObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
