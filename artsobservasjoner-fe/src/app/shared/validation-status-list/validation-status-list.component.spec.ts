import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationStatusListComponent } from './validation-status-list.component';

describe('ValidationStatusListComponent', () => {
  let component: ValidationStatusListComponent;
  let fixture: ComponentFixture<ValidationStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
