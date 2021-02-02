import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { ValidatedDataItem, SpecialSpeciesDataItem, SpecialSpeciesDataObject } from '../models/statistics';

import ValidatedData from '../data/validatedData.json';
import RedListedSpeciesData from '../data/redListedSpeciesData.json';
import { UtilitiesService } from './utilities.service';
import { HttpClient } from '@angular/common/http';
import { RedlistedCategory } from '../models/redlistedCategory';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  // API
  tempApiUrl: string = 'https://arvped-ao3api-staging.azurewebsites.net/v1/Statistics/GetRedlist';
  apiUrl: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/';
  speciesGroupListApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';

  // data
  validatedData: any = ValidatedData;
  redlistedSpeciesData: any = RedListedSpeciesData;
  public redlistedCategories: RedlistedCategory[] = [];

  constructor(
    private httpClient: HttpClient,
    private utilitiesService: UtilitiesService
  ) {

    this.getCategory(2).subscribe(s => console.log('testtttt', s))
    console.log('TEST', this.getCategory(2))
  }

  getRedlistedSpeciesData(): Observable<SpecialSpeciesDataItem[]> {

    // return this.httpClient.get(this.tempApiUrl).pipe(
    //   map((res: any) => {

    //     console.log('res', res)

    //     return res;
    //   })
    // );

    return of(this.redlistedSpeciesData).pipe(
      map(data => {

        let specialSpeciesDataItem: SpecialSpeciesDataItem;
        let specialSpeciesDataItems: SpecialSpeciesDataItem[] = [];

        data.speciesGroupStatistics.forEach(item => {

          console.log('xxxxx', item.data)

          // let riskGroup;

          // item.data.forEach(element => {
          //   riskGroup = element.data.redListId;
          //   console.log('element.data.redListId', element.data.redListId)
          // });

          specialSpeciesDataItem = {
            id: item.speciesGroupId,
            data: item.data,
          }

          specialSpeciesDataItems.push(specialSpeciesDataItem);

        });


        console.log('specialSpeciesDataItems', specialSpeciesDataItems);
        return specialSpeciesDataItems;

      })
    );

  }

  getValidatedData(): Observable<ValidatedDataItem[]> {

    let validatedSightings: ValidatedDataItem[] = [];
    let validatedSighting: ValidatedDataItem;

    return of(this.validatedData).pipe(
      map(data => {

        data.forEach(d => {

          validatedSighting = {
            id: d.SpeciesGroupId,
            sightingCount: d.SightingCount,
            validatedSightingCount: d.ValidatedSightingCount,
            approvedSightingCount: d.ApprovedValidatedSightingCount,
            percentageSightedVsValidated: this.utilitiesService.getPercentage(d.SightingCount, d.ValidatedSightingCount),
            percentageValidatedVsApproved: this.utilitiesService.getPercentage(d.ValidatedSightingCount, d.ApprovedValidatedSightingCount),
          }

          validatedSightings.push(validatedSighting);

        });

        // console.log('validatedSightings', validatedSightings)
        return validatedSightings;
      })
    );

  }

  getQADYears(): Observable<string[]> {

    console.log('qa')

    let years: string[] = [];


    this.validatedData.forEach(element => {
      console.log('validatedData', element.Data)

      element.Data.forEach(elem => {
        if (!years.includes(elem.year)) {
          years.push(elem.year);
        }
      });

    });

    console.log('years', years)
    console.log('count years', years.length)

    return of(years).pipe();

  }

  getSpeciesGroups(): Observable<any> {
    return this.httpClient.get(this.speciesGroupListApi).pipe(
      map((res: any) => {
        console.log('speciesgroup', res)
        return res;


      }),
      publishReplay(1),
      refCount()
    );
  }

  getRedlistedCategories(): Observable<RedlistedCategory[]> {
    return this.httpClient.get('https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetRedListCategories').pipe(
      map((res: any) => {
        console.log('redlisted cats', res)

        const categories: RedlistedCategory[] = [];

        res.forEach(data => {

          let category: RedlistedCategory = {
            id: data.redListCategoryId,
            code: data.redListCategoryCode,
            labelEnglish: data.redListCategoryResourceLabels[0].label,
            labelNorwegian: data.redListCategoryResourceLabels[1].label
          }

          categories.push(category);

        });

        return categories;
      }),
      publishReplay(1),
      refCount()
    );
  }

  getCategory(categoryId: number): Observable<RedlistedCategory> {
    return this.getRedlistedCategories().pipe(
      map(categories => categories.find(cat => cat.id === categoryId))
    );
  }


  // getMovies(): Observable<Movie[]> {
  //   return this.http.get('http://api.request.com')
  //     .map((res: Response) => res.json()['results']);
  // }

  // getMovie(id: number): Observable<Movie> {
  //   return this.getMovies()
  //     .map(movies => movies.find(movie => movie.id == id));
  // }

}
