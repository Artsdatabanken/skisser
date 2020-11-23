import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild3Component } from './overview-child3.component';

describe('OverviewChild3Component', () => {
  let component: OverviewChild3Component;
  let fixture: ComponentFixture<OverviewChild3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
