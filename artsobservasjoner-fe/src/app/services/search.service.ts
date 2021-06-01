import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Taxon, TaxonName } from '../models/taxon';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  taxonSearchApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/TaxonName/Search?';

  /**
   * 
   * https://ao3-coreapi-test.azurewebsites.net/api/v1/TaxonName/Search?Search=spekkhogger&SpeciesGroupId=7&IncludeSubSpecies=true&OnlyReportable=true
   * 
   */
  constructor(private httpClient: HttpClient) { }

  
}
