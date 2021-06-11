import { TestBed } from '@angular/core/testing';

import { SpeciesDataService } from './species-data.service';

describe('SpeciesDataService', () => {
  let service: SpeciesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeciesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
