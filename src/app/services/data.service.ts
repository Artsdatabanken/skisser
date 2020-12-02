import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, publishReplay, reduce, refCount, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  configUrl1: string = 'https://artsobs-stats.free.beeceptor.com';
  configUrl: string = 'https://reqres.in/api/unknown';

  constructor(private http: HttpClient) { }

  getStatsData(): Observable<any> {
    return this.http.get(this.configUrl).pipe(
      publishReplay(1), // Cache the latest emitted
      refCount() // Keep alive as long as there are subscribers
    );
  }

}
