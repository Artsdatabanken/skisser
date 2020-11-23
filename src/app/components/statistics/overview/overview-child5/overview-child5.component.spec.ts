import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewChild5Component } from './overview-child5.component';

describe('OverviewChild5Component', () => {
  let component: OverviewChild5Component;
  let fixture: ComponentFixture<OverviewChild5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewChild5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChild5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
