import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { UtilitiesService } from './utilities.service';

import ValidatedData from '../data/validatedData.json';
import RedListedSpeciesData from '../data/redListedSpeciesData.json';
import { AssessmentCategory } from '../models/assessmentCategory';
import { TotalCountStatistic } from '../models/totalCountStatistic';
import { ApiService } from './api.service';
import { RedlistedSpeciesItem, ValidatedDataItem } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  public responseCache = new Map();
  errorMessage: string;

  // API
  tempApiUrl: string = 'https://arvped-ao3api-staging.azurewebsites.net/v1/Statistics/GetRedlist';
  apiUrl: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/';
  speciesGroupListApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';
  redlistedCategoriesApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetRedListCategories';
  alienCategoriesApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAlienListCategories';

  totalSightingsCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalSightingsCount';
  totalSpeciesCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalSpeciesCount';
  totalImagesCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalImagesCount';
  totalUsersCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalUsersCount';

  // data
  validatedData: any = ValidatedData;
  redlistedSpeciesData: any = RedListedSpeciesData;

  redlistedCategories: AssessmentCategory[] = [];
  redlistedCategories$: Observable<AssessmentCategory[]>;

  // ------------------------------------------------------------ ***

  constructor(
    private httpClient: HttpClient,
    private utilitiesService: UtilitiesService,
    private apiService: ApiService
  ) { }

  // ------------------------------------------------------------ ***

  // VALIDATED DATA / KVALITETSSIKREDE DATA
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

  // REDLISTED SPECIES / RØDLISTEDE ARTER
  getRedlistedSpeciesData(): Observable<RedlistedSpeciesItem[]> {

    // return this.httpClient.get(this.tempApiUrl).pipe(
    //   map((res: any) => {

    //     console.log('res', res)

    //     return res;
    //   })
    // );

    /*
someHttpCall.pipe(
  switchMap(arrayOfItems => {
    const arrayOfObservables: Observable<any>[] = arrayOfItems.map(item => this.someService.returnsHttpCallsWithId(item.id))
    return forkJoin(
      arrayOfObservables
    )
  })
)
    */

    return of(this.redlistedSpeciesData).pipe(
      map(data => {

        let redlistedSpeciesItem: RedlistedSpeciesItem;
        let redlistedSpeciesItems: RedlistedSpeciesItem[] = [];

        data.speciesGroupStatistics.forEach(item => {

          //console.log('ITEM', item)

          if (item.speciesGroupId) {

            redlistedSpeciesItem = {
              id: item.speciesGroupId,
              data: item.data
            }

            redlistedSpeciesItems.push(redlistedSpeciesItem);

          }

        });


        // console.log('redlistedSpeciesItems', redlistedSpeciesItems);
        return redlistedSpeciesItems;

      })
    );

  }

  // NUMBERS STATISTICS

  getTotalCount(apiUrl: string): Observable<TotalCountStatistic> {

    let totalCount: TotalCountStatistic;

    return this.httpClient.get(apiUrl).pipe(
      map((data: any) => {

        console.log('data', data)

        totalCount = {
          count: data.count
        }

        return totalCount;
      }),
      catchError(error => {
        console.log('error', error)
        this.apiService.handleError<TotalCountStatistic[]>('getTotalCountStatistics', [])
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        }
        else {
          this.errorMessage = this.apiService.getServerErrorMessage(error);
        }

        return throwError(this.errorMessage);
      }),
      publishReplay(1),
      refCount()
    );

  }

  // SPECIES GROUPS / ARTSGRUPPER
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

  // ASSESSMENT CATEGORIES

  // (TEST)
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

       // console.log('redlisted cats', res)

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

  getAlienCategories(): Observable<AssessmentCategory[]> {
    return this.httpClient.get(this.alienCategoriesApi).pipe(
      map((res: any) => {

        console.log('res', res)

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

  getAssessmentCategory(categoryId: number): Observable<AssessmentCategory> {
    return this.getRedlistedCategories().pipe(
      map(categories => categories.find(cat => cat.id === categoryId))
    );
  }


}
