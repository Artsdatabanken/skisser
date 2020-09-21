import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyReportingComponent } from './easy-reporting.component';

describe('EasyReportingComponent', () => {
  let component: EasyReportingComponent;
  let fixture: ComponentFixture<EasyReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
