import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild1Component } from './overview-child1.component';

describe('OverviewChild1Component', () => {
  let component: OverviewChild1Component;
  let fixture: ComponentFixture<OverviewChild1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
