import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class SpeciesListService {

  countySpeciesCountApi: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/CountySpeciesCount?PageNumber=1&PageSize=10';
  municipalitySpeciesCountApi: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/CountySpeciesCount?PageNumber=1&PageSize=10';

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) { }

  getCountySpeciesCount(
    pageNumber: number,
    pageSize: number,
    year?: string,
    speciesGroupId?: string,
    taxonId?: string,
    areaId?: string
  ): Observable<any> {

    const baseUrl: string = this.countySpeciesCountApi;
    const api: string = this.apiService.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        console.log('response', response)

        return response;

      })
    );

  }

}
