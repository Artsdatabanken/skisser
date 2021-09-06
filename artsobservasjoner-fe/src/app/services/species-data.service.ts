import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount, shareReplay } from 'rxjs/operators';
import { AREA_TYPE } from '../models/shared';
import { PaginatedStatistics } from '../models/statistics';
import { ApiService } from './api.service';
import { AreaService } from './area.service';
import { TaxonService } from './taxon.service';

@Injectable({
  providedIn: 'root'
})

export class SpeciesDataService {

  areaType: typeof AREA_TYPE = AREA_TYPE;

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private areaService: AreaService,
    private taxonService: TaxonService
  ) { }

  getAreaSpeciesCount(
    areaType: string,
    pageNumber: number,
    pageSize: number,
    year?: string,
    speciesGroupId?: string,
    taxonId?: string,
    areaId?: string
  ): Observable<PaginatedStatistics> {

    let baseUrl: string = areaType === this.areaType.county ? this.apiService.TOP_LISTS.countySpeciesCount : this.apiService.TOP_LISTS.municipalitySpeciesCount;

    const api: string = this.apiService.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    return this.httpClient.get(api, { observe: 'response' }).pipe(
      map((response: any) => {

        let paginatedStatisticItem: PaginatedStatistics;

        let obj: object;
        let objs: object[] = [];

        //console.log('response status', response.status, response)

        response.body.result.forEach((element) => {

          obj = {
            areaId: element.areaId,
            areaName: this.areaService.getAreaNameById(element.areaId),
            speciesCount: element.speciesCount
          };

          objs.push(obj);

        });

        paginatedStatisticItem = {
          pageNumber: response.body.pageNumber,
          pageSize: response.body.pageSize,
          results: objs,
          totalCount: response.body.totalCount
        }

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
  ): Observable<PaginatedStatistics> {

    const baseUrl: string = this.apiService.TOP_LISTS.speciesList;
    const api: string = this.apiService.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    return this.httpClient.get(api, { observe: 'response' }).pipe(
      map((response: any) => {

        let paginatedStatisticItem: PaginatedStatistics;

        let obj: object;
        let objs: object[] = [];
        const data: any = response.body;

        data.result.forEach((element) => {

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
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          results: objs,
          totalCount: data.totalCount,
          areaId: +areaId
        }

        //console.log('paginatedStatisticItem SERVICE', paginatedStatisticItem)

        return paginatedStatisticItem;

      }),
      shareReplay()
    );

  }

}
