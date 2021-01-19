import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyProjectComponent } from './survey-project.component';

describe('SurveyProjectComponent', () => {
  let component: SurveyProjectComponent;
  let fixture: ComponentFixture<SurveyProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
