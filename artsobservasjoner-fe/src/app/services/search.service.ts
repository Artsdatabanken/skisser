import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Taxon, TaxonName } from '../models/taxon';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  fetchData(): Observable<any> {

    return this.httpClient.get('https://fakestoreapi.com/products/1').pipe(
      map((response: any) => {

        return response;

      })
    );

  }

  
}
