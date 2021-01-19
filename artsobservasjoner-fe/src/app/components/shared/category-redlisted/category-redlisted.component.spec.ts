import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRedlistedComponent } from './category-redlisted.component';

describe('CategoryRedlistedComponent', () => {
  let component: CategoryRedlistedComponent;
  let fixture: ComponentFixture<CategoryRedlistedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryRedlistedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRedlistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
