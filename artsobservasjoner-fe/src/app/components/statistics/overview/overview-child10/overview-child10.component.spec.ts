import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild10Component } from './overview-child10.component';

describe('OverviewChild10Component', () => {
  let component: OverviewChild10Component;
  let fixture: ComponentFixture<OverviewChild10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
