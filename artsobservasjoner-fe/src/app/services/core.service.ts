import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CoreService {

  countiesApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Name/County';
  municipalitySearchApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/Areas/Name/Municipality/';

  constructor(private http: HttpClient) { }

  getCounties(): Observable<object[]> {

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

        // console.log('counties', response)
        return response.sort((a, b) => a.name.localeCompare(b.name));
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

