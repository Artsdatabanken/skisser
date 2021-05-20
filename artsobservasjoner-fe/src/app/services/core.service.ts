import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Area } from '../models/shared';

@Injectable({
  providedIn: 'root'
})

export class CoreService {

  areaApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Names/Search?search=';
  countiesApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Names/ByAreaDataset/County';
  municipalitySearchApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Name/Municipality/';

  constructor(private http: HttpClient) { }

  getArea(searchString: string): Observable<Area[]> {
    return this.http.get(this.areaApi + searchString).pipe(
      map((response: any) => {

        let area: Area;
        let areas: Area[] = [];

        response.forEach(element => {

          area = {
            id: element.id,
            name: element.name,
            type: element.areaDataset
          }

          areas.push(area);

        });

        return areas.sort((a, b) => a.name.localeCompare(b.name));

      }),
      shareReplay()
    );

  }

  getCounties(): Observable<Area[]> {

    return this.http.get(this.countiesApi).pipe(
      map((response: any) => {

        /*
         * her kan vi mappe til et std javascript-objekt, lage egne viewmodels eller sende responsen fra API direkte 
         */
        // let county: object;
        // let counties: object[] = [];

        // response.forEach(element => {
        //   county = {
        //     id: element.id,
        //     name: element.name
        //   }
        // });


        let area: Area;
        let areas: Area[] = [];

        response.forEach(element => {

          area = {
            id: element.id,
            name: element.name,
            type: element.areaDataset
          }

          areas.push(area);

        });

        return areas.sort((a, b) => a.name.localeCompare(b.name));

      }),
      shareReplay()
    );

  }

  getMunicipality(searchString: string): Observable<object[]> {

    return this.http.get(this.municipalitySearchApi + searchString).pipe(
      map((response: any) => {

        /*
         * her kan vi mappe til et std javascript-objekt, lage egne viewmodels eller sende responsen fra API direkte 
         */

        console.log('municipalities', response)

        return response;
      }),
      shareReplay()
    );

  }


}

