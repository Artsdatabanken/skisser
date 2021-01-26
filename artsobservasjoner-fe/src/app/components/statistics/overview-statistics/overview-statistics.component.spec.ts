import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewStatisticsComponent } from './overview-statistics.component';

describe('OverviewStatisticsComponent', () => {
  let component: OverviewStatisticsComponent;
  let fixture: ComponentFixture<OverviewStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
