import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild9Component } from './overview-child9.component';

describe('OverviewChild9Component', () => {
  let component: OverviewChild9Component;
  let fixture: ComponentFixture<OverviewChild9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
