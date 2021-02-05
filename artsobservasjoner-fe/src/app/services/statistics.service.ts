import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { UtilitiesService } from './utilities.service';

import ValidatedData from '../data/validatedData.json';
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
 
  redlistSpeciesApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetRedlist';
  speciesGroupListApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';
  redlistedCategoriesApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetRedListCategories';
  alienCategoriesApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAlienListCategories';

  totalSightingsCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalSightingsCount';
  totalSpeciesCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalSpeciesCount';
  totalImagesCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalImagesCount';
  totalUsersCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalUsersCount';

  // data
  validatedData: any = ValidatedData;

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

    return this.httpClient.get(this.redlistSpeciesApi).pipe(
      map(data => {

        console.log('data', data)
        let redlistedSpeciesItem: RedlistedSpeciesItem;
        let redlistedSpeciesItems: RedlistedSpeciesItem[] = [];

        data['speciesGroupStatistics'].forEach(item => {

          console.log('ITEM', item)

          if (item.speciesGroupId) {

            redlistedSpeciesItem = {
              id: item.speciesGroupId,
              data: item.data
            }

            redlistedSpeciesItems.push(redlistedSpeciesItem);

          }

        });

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

  getRedlistedCategories(): Observable<AssessmentCategory[]> {
    return this.httpClient.get(this.redlistedCategoriesApi).pipe(
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

}
