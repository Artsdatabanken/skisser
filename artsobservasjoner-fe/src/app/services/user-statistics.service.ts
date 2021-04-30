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

  getTopUsersStatistics(
    pageNumberParam: number = 1,
    pageSizeParam: number,
    yearParam?: number,
    speciesGroupParam?: number,
    taxonParam?: number,
    areaParam?: number): Observable<UserStatistics> {

    const baseUrl: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/ObserverSpeciesCount?';
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

    // const params: URLSearchParams = new URLSearchParams({
    //   year: yearParam?.toString(),
    //   speciesGroupId: speciesGroupParam?.toString(),
    //   taxonId: taxonParam?.toString(),
    //   areaId: areaParam?.toString(),
    //   pageNumber: pageNumberParam.toString(),
    //   pageSize: pageSizeParam.toString()
    // });

    console.log('params 1', params.toString());

    // for (var pair of params.entries()) {
    //   console.log('KEY', pair[0]);
    //   console.log('VALUE', pair[1]);
    //   //console.log('ENTRIES', pair[0] + ', ' + pair[1]);

    //   if (params.get(pair[0]) == undefined) {
    //     params.delete(pair[0]);
    //   }

    // }

    console.log('params 2', params.toString());

    // if (speciesGroupId) {
    //   api = this.TOPOBSERVERS_API + 'SpeciesGroupId=' + speciesGroupId + '&PageNumber=' + pageNumber + '&PageSize=' + pageSize;
    // }
    // else if (year) {
    //   api = this.TOPOBSERVERS_API + 'Year=' + year + 'PageNumber=' + pageNumber + '&PageSize=' + pageSize;
    // }
    // else {
    //   api = this.TOPOBSERVERS_API + 'PageNumber=' + pageNumber + '&PageSize=' + pageSize;
    // }

    console.log('api', api)

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

        this.totalPages$.next(Math.ceil(response.totalCount / pageSizeParam));

        //console.log('userStatisticsObject', userStatisticsObject)
        return userStatisticsObject;

      }),
      shareReplay()
    );

  }

}
