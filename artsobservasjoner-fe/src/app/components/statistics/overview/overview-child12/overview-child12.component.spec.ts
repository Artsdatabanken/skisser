import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild12Component } from './overview-child12.component';

describe('OverviewChild12Component', () => {
  let component: OverviewChild12Component;
  let fixture: ComponentFixture<OverviewChild12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
