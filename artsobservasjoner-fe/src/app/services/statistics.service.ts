import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { UtilitiesService } from './utilities.service';

import ValidatedData from '../data/validatedData.json';
import { TotalCountStatistic } from '../models/totalCountStatistic';
import { ApiService } from './api.service';
import { AlienSpeciesItem, AssessmentCategory, Category, RedlistedSpeciesItem, SpecialSpeciesItem, ValidatedDataItem } from '../models/statistics';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  public responseCache = new Map();
  errorMessage: string;

  // API

  redlistSpeciesApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetRedlist';
  alienSpeciesApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetAlienlist';
  speciesGroupListApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';
  redlistedCategoriesApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetRedListCategories';
  alienCategoriesApi: string = 'https://ap-ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAlienListCategories';
  dataVariantApi: string;

  // totalSightingsCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalSightingsCount';
  // totalSpeciesCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalSpeciesCount';
  // totalImagesCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalImagesCount';
  // totalUsersCountApi: string = 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalUsersCount';

  // data
  validatedData: any = ValidatedData;

  // ------------------------------------------------------------ ***

  constructor(
    private httpClient: HttpClient,
    private utilitiesService: UtilitiesService,
    private apiService: ApiService,
    private translate: TranslateService
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

  getSpeciesGroupsStatsData(data: string): Observable<SpecialSpeciesItem[]> {

    const api: string = data === 'redlistedSpecies' ? this.redlistSpeciesApi : this.alienSpeciesApi;

    return this.httpClient.get(api).pipe(
      map((res: any) => {

        console.log('TEST res', res)

        let speciesItem: SpecialSpeciesItem;
        let speciesItems: SpecialSpeciesItem[] = [];

        res['speciesGroupStatistics'].forEach(item => {

          if (item.speciesGroupId) {

            speciesItem = {
              id: item.speciesGroupId,
              data: item.data
            }

            speciesItems.push(speciesItem);

          }

        });

        return speciesItems;


      }),
      publishReplay(1),
      refCount()
    );

  }

  // ***GOING TO BE DELETED because of more generic method
  // REDLISTED SPECIES / RØDLISTEDE ARTER
  getRedlistedSpeciesData(): Observable<RedlistedSpeciesItem[]> {

    return this.httpClient.get(this.redlistSpeciesApi).pipe(
      map(data => {

        let redlistedSpeciesItem: RedlistedSpeciesItem;
        let redlistedSpeciesItems: RedlistedSpeciesItem[] = [];

        data['speciesGroupStatistics'].forEach(item => {

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

  // ***GOING TO BE DELETED because of more generic method
  // ALIEN SPECIES /  FREMMEDE ARTER

  getAlienSpeciesData(): Observable<AlienSpeciesItem[]> {

    return this.httpClient.get(this.alienSpeciesApi).pipe(
      map((res: any) => {
        console.log('res', res)

        let alienSpeciesItem: AlienSpeciesItem;
        let alienSpeciesItems: AlienSpeciesItem[] = [];

        res['speciesGroupStatistics'].forEach(item => {

          if (item.speciesGroupId) {

            alienSpeciesItem = {
              id: item.speciesGroupId,
              data: item.data
            }

            alienSpeciesItems.push(alienSpeciesItem);

          }

        });

        return alienSpeciesItems;


      }),
      publishReplay(1),
      refCount()
    );

  }

  // NUMBERS STATISTICS

  getTotalCount(apiUrl: string): Observable<TotalCountStatistic> {

    let api: string;

    let totalCount: TotalCountStatistic;

    return this.httpClient.get(apiUrl).pipe(
      map((data: any) => {
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

        const speciesGroups: Category[] = [];

        res.forEach(data => {

          let label: string;

          if (this.translate.currentLang == 'en') {
            label = data.speciesGroupResourceLabels[0].label;
          }
          else {
            label = data.speciesGroupResourceLabels[1].label;
          }

          this.translate.onLangChange.subscribe(response => {
            if (response.lang == 'en') {
              label = data.speciesGroupResourceLabels[0].label;
            }
            if (response.lang == 'no') {
              label = data.speciesGroupResourceLabels[1].label;
            }
          });

          let speciesGroup: Category = {
            id: data.speciesGroupId,
            label: label,
            labelEnglish: data.speciesGroupResourceLabels[0].label,
            labelNorwegian: data.speciesGroupResourceLabels[1].label
          }

          speciesGroups.push(speciesGroup);

        });

        return speciesGroups;
      }),
      publishReplay(1),
      refCount()
    );
  }

  // ASSESSMENT CATEGORIES

  getAssessmentCategories(categoryVariant: string): Observable<AssessmentCategory[]> {

    const api: string = categoryVariant === 'redlistedCategories' ? this.redlistedCategoriesApi : this.alienCategoriesApi;

    return this.httpClient.get(api).pipe(
      map((res: any) => {

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
