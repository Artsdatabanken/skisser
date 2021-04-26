import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import TaxonInfo from '../data/taxon-info.json';

@Injectable({
  providedIn: 'root'
})

export class TestService {

  taxonInfo: typeof TaxonInfo = TaxonInfo;

  constructor() { }

  getTaxonInfo(): Observable<any> {

    return of(this.taxonInfo).pipe(
      map((response: any) => {

        const grouped = this.groupBy(response.vernacularNames, vernacularName => vernacularName.languageIsoCode);

        console.log('test', grouped)

        return grouped;

      })
    );

  }

  private groupBy(list, keyGetter): Map<any, any> {

    const map = new Map();

    list.forEach((item) => {

      const key = keyGetter(item);

      const collection = map.get(key);
      
      if (!collection) {
        map.set(key, [item]);
      }
      else {
        collection.push(item);
      }

    });

    return map;
  }

}
