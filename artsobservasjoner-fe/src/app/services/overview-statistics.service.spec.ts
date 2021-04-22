import { TestBed } from '@angular/core/testing';

import { OverviewStatisticsService } from './overview-statistics.service';

describe('OverviewStatisticsService', () => {
  let service: OverviewStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverviewStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
