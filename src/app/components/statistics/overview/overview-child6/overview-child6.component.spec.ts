import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild6Component } from './overview-child6.component';

describe('OverviewChild6Component', () => {
  let component: OverviewChild6Component;
  let fixture: ComponentFixture<OverviewChild6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
