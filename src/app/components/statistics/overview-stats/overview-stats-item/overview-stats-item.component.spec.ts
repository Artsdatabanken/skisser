import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewStatsItemComponent } from './overview-stats-item.component';

describe('OverviewStatsItemComponent', () => {
  let component: OverviewStatsItemComponent;
  let fixture: ComponentFixture<OverviewStatsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewStatsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewStatsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
