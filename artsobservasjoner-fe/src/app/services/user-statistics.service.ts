import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import TopObservers from '../data/top-observers.json';
import { TopObserver } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})

export class UserStatisticsService {

  topObservers: typeof TopObservers = TopObservers;

  constructor() { }

  getTopObservers(take?: number): Observable<TopObserver[]> {

    let topObserver: TopObserver;
    let topObservers: TopObserver[] = [];

    this.topObservers.result.forEach(element => {

      topObserver = {
        id: element.userId,
        name: element.userName,
        alias: element.userAlias,
        city: element.city,
        sightingsCount: element.count
      };

      topObservers.push(topObserver);

    });

    return of(topObservers.slice(0, take)).pipe();

  }

  getTopObservers2(pageNumber: number, pageSize: number): Observable<TopObserver[]> {

    let topObserver: TopObserver;
    let topObservers: TopObserver[] = [];

    this.topObservers.result.forEach(element => {

      topObserver = {
        id: element.userId,
        name: element.userName,
        alias: element.userAlias,
        city: element.city,
        sightingsCount: element.count
      };

      topObservers.push(topObserver);

    });

    return of(topObservers.slice(pageNumber, pageSize)).pipe();

  }

}
