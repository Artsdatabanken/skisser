import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraNavigationComponent } from './extra-navigation.component';

describe('ExtraNavigationComponent', () => {
  let component: ExtraNavigationComponent;
  let fixture: ComponentFixture<ExtraNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
