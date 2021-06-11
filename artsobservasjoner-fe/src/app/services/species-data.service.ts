import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { PaginatedStatistics } from '../models/statistics';
import { ApiService } from './api.service';
import { AreaService } from './area.service';

@Injectable({
  providedIn: 'root'
})

export class SpeciesDataService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private areaService: AreaService
  ) { }

  getCountySpeciesCount(
    pageNumber: number,
    pageSize: number,
    year?: string,
    speciesGroupId?: string,
    taxonId?: string,
    areaId?: string
  ): Observable<PaginatedStatistics> {

    const baseUrl: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/CountySpeciesCount?';
    const api: string = this.apiService.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        let paginatedStatisticItem: PaginatedStatistics;

        let obj: object;
        let objs: object[] = [];

        response.result.forEach((element) => {

          obj = {
            areaId: element.areaId,
            areaName: this.areaService.getAreaNameById(element.areaId),
            speciesCount: element.speciesCount
          };

          objs.push(obj);

        });

        paginatedStatisticItem = {
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          results: objs,
          totalCount: response.totalCount
        }

        console.log('paginatedStatisticItem', paginatedStatisticItem)
        return paginatedStatisticItem;

      }),
      publishReplay(1),
      refCount()
    );

  }


}
