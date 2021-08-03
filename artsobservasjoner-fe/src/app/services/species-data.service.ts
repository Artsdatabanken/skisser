import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount, shareReplay } from 'rxjs/operators';
import { PaginatedStatistics } from '../models/statistics';
import { ApiService } from './api.service';
import { AreaService } from './area.service';
import { TaxonService } from './taxon.service';

@Injectable({
  providedIn: 'root'
})

export class SpeciesDataService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private areaService: AreaService,
    private taxonService: TaxonService
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

  getSpeciesListByArea(
    pageNumber: number,
    pageSize: number,
    areaId: string,
    year?: string,
    speciesGroupId?: string,
    taxonId?: string
  ): Observable<any> {

    const baseUrl: string = 'https://ao3-statisticsapi.test.artsobservasjoner.no/api/v1/TopList/SpeciesList?';
    const api: string = this.apiService.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    // return this.httpClient.get(api, { observe: 'response' }).pipe(
    //   map((response: any) => {

    //     console.log('response', response)

    //     let paginatedStatisticItem: PaginatedStatistics;

    //     let obj: object;
    //     let objs: object[] = [];

    //     response.body.result.forEach((element) => {

    //       obj = {
    //         taxonId: element.taxonId,
    //         scientificName: element.scientificTaxonName,
    //         vernacularName: element.preferredTaxonName,
    //         date: element.startDate,
    //         sortOrder: element.sortOrder
    //       };

    //       objs.push(obj);

    //     });

    //     paginatedStatisticItem = {
    //       pageNumber: response.body.pageNumber,
    //       pageSize: response.body.pageSize,
    //       results: objs,
    //       totalCount: response.body.totalCount
    //     }

    //     console.log('paginatedStatisticItem', paginatedStatisticItem)
    //     return paginatedStatisticItem;

    //   }),
    //   publishReplay(1),
    //   refCount()
    // );

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        //console.log('response', response)

        let paginatedStatisticItem: PaginatedStatistics;

        let obj: object;
        let objs: object[] = [];

        response.result.forEach((element) => {

          obj = {
            taxonId: element.taxonId,
            scientificName: element.scientificTaxonName,
            vernacularName: element.preferredTaxonName,
            date: element.startDate,
            sortOrder: element.sortOrder,
            taxonData: this.taxonService.getTaxonData(element.taxonId)
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
     shareReplay()
    );

  }

}
