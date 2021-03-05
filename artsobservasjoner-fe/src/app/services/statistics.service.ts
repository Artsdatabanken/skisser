import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { UtilitiesService } from './utilities.service';
import { AssessmentCategory, Category, AssessedSpeciesItem, ValidatedDataItem, StatisticsItem, TotalCountStatistic, ImageStatisticsItem, TOTAL_COUNT_STATISTICS } from '../models/statistics';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  public responseCache = new Map();
  errorMessage: string;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;

  // API

  validatedDataApi: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetValidatedData';
  redlistSpeciesApi: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetAssessmentList?assessmentListType=redlist';
  alienSpeciesApi: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetAssessmentList?assessmentListType=alienlist';

  speciesGroupListApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';
  redlistedCategoriesApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAssessmentCategories?assessmentListType=redlist';
  alienCategoriesApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAssessmentCategories?assessmentListType=alienlist';
  assessmentCategoriesApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAssessmentCategories?assessmentListType=';

  overviewStatsApi1: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSightingsCountPerSpeciesGroup';
  overviewStatsApi2: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetImagesPerSpeciesGroupData';

  totalCountApiSightings: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalSightingsCount';
  totalCountApiSpecies: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalSpeciesCount';
  totalCountApiImages: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalImagesCount';
  totalCountApiUsers: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalUsersCount';

  // ------------------------------------------------------------ ***

  constructor(
    private httpClient: HttpClient,
    private utilitiesService: UtilitiesService,
    private translate: TranslateService
  ) { }

  // ------------------------------------------------------------ ***

  // VALIDATED DATA / KVALITETSSIKREDE DATA
  getValidatedData(): Observable<ValidatedDataItem[]> {

    let validatedSightings: ValidatedDataItem[] = [];
    let validatedSighting: ValidatedDataItem;

    return this.httpClient.get(this.validatedDataApi).pipe(
      map((response: any) => {

        console.log('res', response)

        response['validatedDataStatistics'].forEach(d => {

          validatedSighting = {
            id: d.speciesGroupId,
            speciesGroup: null,
            count: d.sightingCount,
            sightingTaxonCount: d.sightingTaxonCount,
            sightingWithMediaCount: d.sightingWithMediaCount,
            validatedSightingCount: d.validatedSightingCount,
            approvedSightingCount: d.approvedValidatedSightingCount,
            percentageSightedVsValidated: this.utilitiesService.getPercentage(d.sightingCount, d.validatedSightingCount),
            percentageValidatedVsApproved: this.utilitiesService.getPercentage(d.validatedSightingCount, d.approvedValidatedSightingCount),
          }

          validatedSightings.push(validatedSighting);

        });

        // console.log('validatedSightings', validatedSightings)
        return validatedSightings;
      }),
      publishReplay(1),
      refCount()
    );

  }

  getAssessedSpeciesStats(data: string): Observable<AssessedSpeciesItem[]> {

    const api: string = data === 'redlistedSpecies' ? this.redlistSpeciesApi : this.alienSpeciesApi;

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        let speciesItem: AssessedSpeciesItem;
        let speciesItems: AssessedSpeciesItem[] = [];

        response['speciesGroupStatistics'].forEach(item => {

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

  // NUMBERS STATISTICS

  getTotalCount(stats: string): Observable<TotalCountStatistic> {

    let api: string;

    switch (stats) {
      case this.totalCountStatistics.totalSightings:
        api = this.totalCountApiSightings;
        break;

      case this.totalCountStatistics.totalSpecies:
        api = this.totalCountApiSpecies;
        break;

      case this.totalCountStatistics.totalImages:
        api = this.totalCountApiImages;
        break;

      case this.totalCountStatistics.totalUsers:
        api = this.totalCountApiUsers;
        break;

      default:
        console.log();
    }

    let totalCount: TotalCountStatistic;

    return this.httpClient.get(api).pipe(
      map((response: any) => {
        totalCount = {
          count: response.count
        }

        return totalCount;
      }),
      // catchError(error => {

      //   this.apiService.handleError<TotalCountStatistic[]>('getTotalCountStatistics', []);

      //   if (error.error instanceof ErrorEvent) {
      //     this.errorMessage = `Error: ${error.error.message}`;
      //   }
      //   else {
      //     this.errorMessage = this.apiService.getServerErrorMessage(error);
      //   }

      //   return throwError(this.errorMessage);
      // }),
      publishReplay(1),
      refCount()
    );

  }

  // SPECIES GROUPS / ARTSGRUPPER

  getSpeciesGroups(): Observable<Category[]> {
    return this.httpClient.get(this.speciesGroupListApi).pipe(
      map((response: any) => {

        const speciesGroups: Category[] = [];

        response.forEach(data => {

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
      map((response: any) => {

        const categories: AssessmentCategory[] = [];

        response.forEach(data => {

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

  // OVERVIEW STATISTICS

  getSightingsCountPerSpeciesGroup(): Observable<StatisticsItem[]> {

    return this.httpClient.get(this.overviewStatsApi1).pipe(
      map((response: any) => {

        let statisticsItem: StatisticsItem;
        let statisticsItems: StatisticsItem[] = [];

        response.sightingsCountPerSpeciesGroupStatistics.forEach(element => {

          if (element.speciesGroupId !== null) {

            statisticsItem = {
              id: element.speciesGroupId,
              count: element.sightingCount
            }

            statisticsItems.push(statisticsItem);

          }

        });

        return statisticsItems;

      }),
      publishReplay(1),
      refCount()
    );

  }

  getImageCountPerSpeciesGroup(): Observable<ImageStatisticsItem[]> {

    return this.httpClient.get(this.overviewStatsApi2).pipe(
      map((response: any) => {

        let statisticsItem: ImageStatisticsItem;
        let statisticsItems: ImageStatisticsItem[] = [];

        response.imagesPerSpeciesGroupStatistics.forEach(element => {

          if (element.speciesGroupId !== null) {

            statisticsItem = {
              id: element.speciesGroupId,
              imageCount: element.imageCount,
              imageCountWithOpenLicence: element.imageCountWithOpenLicense
            }

            statisticsItems.push(statisticsItem);

          }

        });

        return statisticsItems;

      }),
      publishReplay(1),
      refCount()
    );

  }

}
