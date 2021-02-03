import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, publishReplay, refCount, share, shareReplay, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ValidatedDataItem, SpecialSpeciesDataItem } from '../models/statistics';
import { UtilitiesService } from './utilities.service';

import ValidatedData from '../data/validatedData.json';
import RedListedSpeciesData from '../data/redListedSpeciesData.json';
import { AssessmentCategory } from '../models/assessmentCategory';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  public responseCache = new Map();

  // API
  tempApiUrl: string = 'https://arvped-ao3api-staging.azurewebsites.net/v1/Statistics/GetRedlist';
  apiUrl: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/';
  speciesGroupListApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';
  redlistedCategoriesApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetRedListCategories';

  // data
  validatedData: any = ValidatedData;
  redlistedSpeciesData: any = RedListedSpeciesData;

  redlistedCategories: AssessmentCategory[] = [];
  redlistedCategories$: Observable<AssessmentCategory[]>;

  // ------------------------------------------------------------ ***

  constructor(
    private httpClient: HttpClient,
    private utilitiesService: UtilitiesService
  ) {
    
    console.log('from cache', this.responseCache.get(this.redlistedCategoriesApi))
   }

  // ------------------------------------------------------------ ***

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

          //console.log('ITEM', item)

          if (item.speciesGroupId) {

            specialSpeciesDataItem = {
              id: item.speciesGroupId,
              data: item.data
            }

            specialSpeciesDataItems.push(specialSpeciesDataItem);

          }

        });


        //console.log('specialSpeciesDataItems', specialSpeciesDataItems);
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

  getRedlistedCategories3(): Observable<AssessmentCategory[]> {

    const redlistedCategories = this.responseCache.get(this.redlistedCategoriesApi);

    console.log('from cache', this.responseCache.get(this.redlistedCategoriesApi))

    if (redlistedCategories) {
      return of(redlistedCategories);
    }

    return this.httpClient.get<any>(this.redlistedCategoriesApi).pipe(
      map((data: any) => {

        const categories: AssessmentCategory[] = [];

        data.forEach(item => {

          let category: AssessmentCategory = {
            id: item.redListCategoryId,
            code: item.redListCategoryCode,
            labelEnglish: item.redListCategoryResourceLabels[0].label,
            labelNorwegian: item.redListCategoryResourceLabels[1].label
          }

          categories.push(category);

        });

        this.responseCache.set(this.redlistedCategoriesApi, categories);

        console.log('to cache', this.responseCache.set(this.redlistedCategoriesApi, categories))
        console.log('from cache', this.responseCache.get(this.redlistedCategoriesApi))

        return categories;

      })
    );

  }

  getRedlistedCategories(): Observable<AssessmentCategory[]> {
    return this.httpClient.get('https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetRedListCategories').pipe(
      map((res: any) => {

        console.log('redlisted cats', res)

        const categories: AssessmentCategory[] = [];

        res.forEach(data => {

          let category: AssessmentCategory = {
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

  // getCategory(categoryId: number): Observable<RedlistedCategory> {
  //   return this.getRedlistedCategories().pipe(
  //     map(categories => categories.find(cat => cat.id === categoryId))
  //   );
  // }

}
