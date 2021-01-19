import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild11Component } from './overview-child11.component';

describe('OverviewChild11Component', () => {
  let component: OverviewChild11Component;
  let fixture: ComponentFixture<OverviewChild11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
