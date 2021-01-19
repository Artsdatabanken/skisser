import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild7Component } from './overview-child7.component';

describe('OverviewChild7Component', () => {
  let component: OverviewChild7Component;
  let fixture: ComponentFixture<OverviewChild7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
