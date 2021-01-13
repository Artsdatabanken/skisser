import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild8Component } from './overview-child8.component';

describe('OverviewChild8Component', () => {
  let component: OverviewChild8Component;
  let fixture: ComponentFixture<OverviewChild8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
