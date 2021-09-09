import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  toggledItems$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  items: string[] = [];

  constructor(private httpClient: HttpClient) { }

  fetchData(): Observable<any> {

    return this.httpClient.get('https://www.inaturalist.org/observations.json').pipe(
      map((response: any) => {

        console.log('response', response)
        return response;

      })
    );

  }

  toggleItem(item: string, bulk: number): void {
    this.items.push(item);
    this.toggledItems$.next(this.items);
  }

}
