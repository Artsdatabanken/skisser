import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount, shareReplay } from 'rxjs/operators';
import { TopObserver, UserStatistics } from '../models/statistics';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class UserStatisticsService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) { }

  getTopObservers(
    pageNumber: number,
    pageSize: number,
    year?: string,
    speciesGroupId?: string,
    taxonId?: string,
    areaId?: string): Observable<UserStatistics> {

    const baseUrl: string = this.apiService.USER_STATISTICS.observerSpeciesCount;
    const api: string = this.apiService.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

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

        //console.log('userStatisticsObject', userStatisticsObject)

        return userStatisticsObject;

      }),
      shareReplay(1)
    );

  }

  getTopPhotographers(
    pageNumber: number,
    pageSize: number,
    year?: string,
    speciesGroupId?: string,
    taxonId?: string,
    areaId?: string): Observable<UserStatistics> {

    const baseUrl: string = this.apiService.USER_STATISTICS.usersMediaCount;
    const api: string = this.apiService.createApiUrl(baseUrl, pageNumber, pageSize, year, speciesGroupId, taxonId, areaId);

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

        return userStatisticsObject;

      }),
      publishReplay(1),
      refCount()
    );

  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {

    const position: number = (pageNumber - 1) * pageSize + index + 1;
    return +position;

  }

}
