import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild2Component } from './overview-child2.component';

describe('OverviewChild2Component', () => {
  let component: OverviewChild2Component;
  let fixture: ComponentFixture<OverviewChild2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
