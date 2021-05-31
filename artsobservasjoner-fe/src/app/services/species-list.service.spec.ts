import { TestBed } from '@angular/core/testing';

import { SpeciesListService } from './species-list.service';

describe('SpeciesListService', () => {
  let service: SpeciesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeciesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
