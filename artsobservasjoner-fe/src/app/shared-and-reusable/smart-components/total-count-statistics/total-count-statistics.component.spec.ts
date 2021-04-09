import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountStatisticsComponent } from './total-count-statistics.component';

describe('TotalCountStatisticsComponent', () => {
  let component: TotalCountStatisticsComponent;
  let fixture: ComponentFixture<TotalCountStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCountStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCountStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
