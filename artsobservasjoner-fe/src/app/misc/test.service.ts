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

  getData(): Observable<any> {
    return of(this.taxonInfo).pipe(
      map((response: any) => {

        let obj: object;
        const grouped = this.groupBy(response.vernacularNames, vernacularName => vernacularName.languageIsoCode);

        obj = {
          scientificNameId: response.scientificNameId,
          taxonId: response.taxonId,
          scientificNames: response.scientificNames,
          vernacularNames: grouped,
          higherClassification: response.higherClassification
        };

        return obj;

      })
    );
  }

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
