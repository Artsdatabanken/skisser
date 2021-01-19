import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild4Component } from './overview-child4.component';

describe('OverviewChild4Component', () => {
  let component: OverviewChild4Component;
  let fixture: ComponentFixture<OverviewChild4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
