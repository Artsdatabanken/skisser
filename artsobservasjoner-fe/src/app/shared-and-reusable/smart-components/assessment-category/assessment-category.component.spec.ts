import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCategoryComponent } from './assessment-category.component';

describe('AssessmentCategoryComponent', () => {
  let component: AssessmentCategoryComponent;
  let fixture: ComponentFixture<AssessmentCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
