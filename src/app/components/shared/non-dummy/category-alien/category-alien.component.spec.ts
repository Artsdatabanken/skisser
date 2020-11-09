import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAlienComponent } from './category-alien.component';

describe('CategoryAlienComponent', () => {
  let component: CategoryAlienComponent;
  let fixture: ComponentFixture<CategoryAlienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAlienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAlienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
