import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
    year?: number,
    speciesGroupId?: number,
    taxonId?: number,
    areaId?: number): Observable<UserStatistics> {

    const baseUrl: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/ObserverSpeciesCount?';

    const api: string = this.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        console.log('response', response)

        let userStatisticsObject: UserStatistics;

        let topObserver: TopObserver;
        let topObservers: TopObserver[] = [];

        response.result.forEach((element) => {

          topObserver = {
            id: element.userId,
            name: element.userName,
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

        console.log('userStatisticsObject', userStatisticsObject)
        return userStatisticsObject;

      }),
      shareReplay()
    );

  }

  getTopPhotographers(
    pageNumber: number,
    pageSize: number,
    year?: number,
    speciesGroupId?: number,
    taxonId?: number,
    areaId?: number): Observable<UserStatistics> {

    const baseUrl: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/UsersMediaCount?';

    const api: string = this.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        console.log('response photographers', response)

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

        console.log('userStatisticsObject', userStatisticsObject)
        return userStatisticsObject;

      }),
      shareReplay()
    );

  }

  private createApiUrl(
    baseUrl: string,
    pageNumberParam: number,
    pageSizeParam: number,
    yearParam?: number,
    speciesGroupParam?: number,
    taxonParam?: number,
    areaParam?: number
  ): string {

    let api: string;
    let params: URLSearchParams = new URLSearchParams();

    console.log('params XXX', yearParam);
    console.log('params XXX', speciesGroupParam);
    console.log('params XXX', taxonParam);
    console.log('params XXX', areaParam);
    console.log('params XXX', pageNumberParam);
    console.log('params XXX', pageSizeParam);

    if (yearParam) params.append('Year', yearParam.toString());
    if (speciesGroupParam) params.append('SpeciesGroupId', speciesGroupParam.toString());
    if (taxonParam) params.append('TaxonId', taxonParam.toString());
    if (areaParam) params.append('AreaId', areaParam.toString());
    if (pageNumberParam) params.append('PageNumber', pageNumberParam.toString());
    if (pageSizeParam) params.append('PageSize', pageSizeParam.toString());

    api = baseUrl + params.toString();

    return api;

  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {

    const position: number = (pageNumber - 1) * pageSize + index + 1;
    return +position;

  }

}
