import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TopObserver, UserStatistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})

export class UserStatisticsService {

  TOPOBSERVERS_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/TopList/ObserverSpeciesCount?';
  totalPages$ = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) { }

  getTopUsersStatistics(pageNumber: number = 1, pageSize: number = 10, speciesGroupId?: number): Observable<UserStatistics> {

    let api: string;

    if (speciesGroupId) {
      api = this.TOPOBSERVERS_API + 'SpeciesGroupId=' + speciesGroupId + '&PageNumber=' + pageNumber + '&PageSize=' + pageSize;
    }
    else {
      api = this.TOPOBSERVERS_API + 'PageNumber=' + pageNumber + '&PageSize=' + pageSize;
    }

    // console.log('api', api)

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

        this.totalPages$.next(Math.trunc(response.totalCount / pageSize) + 1); // + 1 for å ta hensyn til vi fjerner desimaler fra totalPages with Math.trunc

        //console.log('userStatisticsObject', userStatisticsObject)
        return userStatisticsObject;

      }),
      shareReplay()
    );

  }

}
