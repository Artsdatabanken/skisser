import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Area } from '../models/shared';

@Injectable({
  providedIn: 'root'
})

export class AreaService {

  areaApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Names/Search?search=';
  countiesAndMunicipalityApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Names/ByAreaDataset/CountyAndMunicipality/Search?search=';
  countiesApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Names/ByAreaDataset/County';
  municipalitySearchApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Names/ByAreaDataset/Municipality/';

  constructor(private httpClient: HttpClient) { }

  // getArea(searchString: string): Observable<Area[]> {
  //   return this.httpClient.get(this.countiesAndMunicipalityApi + searchString).pipe(
  //     map((response: any) => {

  //       console.log('areas response', response)
  //       console.log('areas response body', response.body)

  //       let area: Area;
  //       let areas: Area[] = [];

  //       response.forEach(element => {

  //         area = {
  //           id: element.id,
  //           name: element.name,
  //           type: element.areaDataset
  //         }

  //         areas.push(area);

  //       });

  //       console.log('areas', areas)
  //       return areas.sort((a, b) => a.name.localeCompare(b.name));

  //     }),
  //     shareReplay()
  //   );

  // }

  getArea(searchString: string): Observable<Area[]> {
    return this.httpClient.get(this.countiesAndMunicipalityApi + searchString, { observe: 'response' }).pipe(
      map((response: any) => {

        let area: Area;
        let areas: Area[] = [];

        const data = response.body;

        if (data) {

          data.forEach(element => {

            area = {
              id: element.id,
              name: element.name,
              type: element.areaDataset
            }

            areas.push(area);

          });

        }

        return areas.sort((a, b) => a.name.localeCompare(b.name));

      }),
      shareReplay()
    );

  }

  getAreaById(id: number): Observable<Area> {

    const api: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Names/';

    return this.httpClient.get(api + id).pipe(
      map((response: any) => {

        const area: Area = {
          id: response.id,
          name: response.name,
          type: response.areaDataset
        }

        return area;

      })
    );

  }

  getAreaNameById(id: number): Observable<string> {

    const area: Observable<Area> = this.getAreaById(id);

    const areaName: Observable<string> = area.pipe(
      map((data: Area) => {
        return data.name;
      })
    );

    return areaName;

  }

  getCounties(): Observable<Area[]> {

    return this.httpClient.get(this.countiesApi).pipe(
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

    return this.httpClient.get(this.municipalitySearchApi + searchString).pipe(
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