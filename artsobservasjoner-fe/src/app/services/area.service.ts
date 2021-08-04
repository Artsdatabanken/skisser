import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Area } from '../models/shared';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class AreaService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) { }

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
    return this.httpClient.get(this.apiService.AREA.countiesAndMunicipalitiesSearch + searchString, { observe: 'response' }).pipe(
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

    return this.httpClient.get(this.apiService.AREA.allAreas + id).pipe(
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

    return this.httpClient.get(this.apiService.AREA.counties).pipe(
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

    return this.httpClient.get(this.apiService.AREA.municipalities + searchString).pipe(
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
