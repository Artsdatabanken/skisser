import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, multicast, publishReplay, refCount, shareReplay } from 'rxjs/operators';
import { TopObserver, UserStatistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})

export class UserStatisticsService {

  totalPages$ = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) { }

  getTopObservers(
    pageNumber: number,
    pageSize: number,
    year?: string,
    speciesGroupId?: string,
    taxonId?: string,
    areaId?: string): Observable<UserStatistics> {

    const baseUrl: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/ObserverSpeciesCount?';
    const api: string = this.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        let userStatisticsObject: UserStatistics;

        let topObserver: TopObserver;
        let topObservers: TopObserver[] = [];

        response.result.forEach((element) => {

          topObserver = {
            id: element.userId,
            name: element.userName.replace(/ *\[[^\]]*]/g, '').replace(/ *\([^)]*\) */g, ""),
            city: element.city,
            sightingsCount: element.count
          };

          topObservers.push(topObserver);

        });

        userStatisticsObject = {
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          topObservers: topObservers,
          totalCount: response.totalCount
        }

        this.totalPages$.next(Math.ceil(response.totalCount / pageSize));

        //console.log('userStatisticsObject', userStatisticsObject)

        return userStatisticsObject;

      }),
      shareReplay(1)
    );

  }

  // getTopPhotographers(): Observable<any> {
  //   return null;
  // }

  getTopPhotographers(
    pageNumber: number,
    pageSize: number,
    year?: string,
    speciesGroupId?: string,
    taxonId?: string,
    areaId?: string): Observable<UserStatistics> {

    const baseUrl: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/UsersMediaCount?';

    const api: string = this.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        let userStatisticsObject: UserStatistics;

        let topObserver: TopObserver;
        let topObservers: TopObserver[] = [];

        response.result.forEach((element) => {

          topObserver = {
            id: element.userId,
            name: element.userName,
            city: element.city,
            sightingsCount: element.speciesCount,
            mediaCount: element.mediaCount
          };

          topObservers.push(topObserver);

        });

        userStatisticsObject = {
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          topObservers: topObservers,
          totalCount: response.totalCount
        }

        this.totalPages$.next(Math.ceil(response.totalCount / pageSize));

        return userStatisticsObject;

      }),
      publishReplay(1),
      refCount()
    );

  }

  private createApiUrl(
    baseUrl: string,
    pageNumberParam: number,
    pageSizeParam: number,
    yearParam?: string,
    speciesGroupParam?: string,
    taxonParam?: string,
    areaParam?: string
  ): string {

    let api: string;
    let params: URLSearchParams = new URLSearchParams();

    // console.log('params year', yearParam);
    // console.log('params species group', speciesGroupParam);
    // console.log('params taxon', taxonParam);
    // console.log('params område', areaParam);
    // console.log('params pageNumber', pageNumberParam);
    // console.log('params pageSize', pageSizeParam);

    const addParam = (key, value) => {

      if (value) {
        params.append(key, value.toString());
      }

    };

    addParam('Year', yearParam);
    addParam('SpeciesGroupId', speciesGroupParam);
    addParam('TaxonId', taxonParam);
    addParam('AreaId', areaParam);
    addParam('PageNumber', pageNumberParam);
    addParam('PageSize', pageSizeParam);

    // if (yearParam) params.append('Year', yearParam.toString());
    // if (speciesGroupParam) params.append('SpeciesGroupId', speciesGroupParam.toString());
    // if (taxonParam) params.append('TaxonId', taxonParam.toString());
    // if (areaParam) params.append('AreaId', areaParam.toString());
    // if (pageNumberParam) params.append('PageNumber', pageNumberParam.toString());
    // if (pageSizeParam) params.append('PageSize', pageSizeParam.toString());

    api = baseUrl + params.toString();

    //console.log('api', api)

    return api;

  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {

    const position: number = (pageNumber - 1) * pageSize + index + 1;
    return +position;

  }

}
