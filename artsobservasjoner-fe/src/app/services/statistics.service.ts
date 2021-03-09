import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { UtilitiesService } from './utilities.service';
import { AssessmentCategory, AssessedSpeciesItem, ValidatedDataItem, StatisticsItem, TotalCountStatistic, ImageStatisticsItem, TOTAL_COUNT_STATISTICS, ASSESSMENT_CATEGORIES, AssessedSpeciesItemStats } from '../models/statistics';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../models/shared';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  public responseCache = new Map();
  errorMessage: string;
  totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  assessmentCategories: typeof ASSESSMENT_CATEGORIES = ASSESSMENT_CATEGORIES;

  // API

  validatedDataApi: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetValidatedData';
  redlistSpeciesApi: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetAssessmentList?assessmentListType=redlist';
  alienSpeciesApi: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetAssessmentList?assessmentListType=alienlist';

  speciesGroupListApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';
  redlistedCategoriesApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAssessmentCategories?assessmentListType=redlist';
  alienCategoriesApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAssessmentCategories?assessmentListType=alienlist';
  //assessmentCategoriesApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAssessmentCategories?assessmentListType=';
  validationStatusApi: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetValidationStatusList';

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
    private translate: TranslateService,
    private translationService: TranslationService
  ) { }

  // ------------------------------------------------------------ ***

  // VALIDATED DATA / KVALITETSSIKREDE DATA
  getValidatedData(): Observable<ValidatedDataItem[]> {

    let validatedSightings: ValidatedDataItem[] = [];
    let validatedSighting: ValidatedDataItem;

    return this.httpClient.get(this.validatedDataApi).pipe(
      map((response: any) => {

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

  getAssessedSpeciesStats(categoryVariant: string): Observable<AssessedSpeciesItem[]> {

    //const api: string = data === 'redlistedSpecies' ? this.redlistSpeciesApi : this.alienSpeciesApi;

    let api: string;

    switch (categoryVariant) {
      case this.assessmentCategories.redlist:
        api = this.redlistSpeciesApi;
        break;

      case this.assessmentCategories.alienlist:
        api = this.alienSpeciesApi;
        break;

      default:
        console.log('');
    }

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

          let speciesGroup: Category = {
            id: data.speciesGroupId,
            en: data.speciesGroupResourceLabels[0].label,
            no: data.speciesGroupResourceLabels[1].label
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

    //const api: string = categoryVariant === 'redlistedCategories' ? this.redlistedCategoriesApi : this.alienCategoriesApi;

    let api: string;

    switch (categoryVariant) {
      case this.assessmentCategories.redlist:
        api = this.redlistedCategoriesApi;
        break;

      case this.assessmentCategories.alienlist:
        api = this.alienCategoriesApi;
        break;

      default:
        console.log('');
    }

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        const categories: AssessmentCategory[] = [];

        response.forEach(data => {

          let category: AssessmentCategory = {
            id: data.redListCategoryId,
            code: data.redListCategoryCode,
            en: data.redListCategoryResourceLabels[0].label,
            no: data.redListCategoryResourceLabels[1].label
          }

          categories.push(category);

        });

        return categories;
      }),
      publishReplay(1),
      refCount()
    );
  }

  // VALIDATION CATEGORIES

  getValidationStatus(group?: string): Observable<Category[]> {

    let apiUrl: string;
    apiUrl = group ? apiUrl = this.validationStatusApi + '?group=' + group : apiUrl = this.validationStatusApi;

    return this.httpClient.get(apiUrl).pipe(
      map((response: any) => {

        console.log('res', response)

        const statuses: Category[] = [];

        response.forEach(data => {

          let status: Category = {
            id: data.validationStatusId,
            en: data.speciesGroupResourceLabels[0].label,
            no: data.speciesGroupResourceLabels[1].label
          }

          statuses.push(status);

        });

        return statuses;

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

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  getAssessedSpeciesData(categoryVariant: string): any {

    console.log('we\'re using this one');

    let assessmentCategory: string;

    switch (categoryVariant) {
      case this.assessmentCategories.redlist:
        assessmentCategory = this.assessmentCategories.redlist;
        break;

      case this.assessmentCategories.alienlist:
        assessmentCategory = this.assessmentCategories.alienlist;
        break;

      default:
        console.log('');
    }

    const data$ = forkJoin([
      this.getAssessedSpeciesStats(assessmentCategory),
      this.getAssessmentCategories(assessmentCategory),
      this.getSpeciesGroups()
    ]).pipe(
      map(([species, categories, speciesGroups]) => {

        let assessedSpeciesItemStats: AssessedSpeciesItemStats;

        // ---------------------------------------- ***

        const getCategory = (id: number): AssessmentCategory => {
          return categories.find(category => category.id === id);
        }

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        // ---------------------------------------- ***

        const map = new Map();

        species.forEach(speciesItem => {

          let tempArray = [];

          speciesItem.data.forEach(data => {

            assessedSpeciesItemStats = {
              id: speciesItem.id,
              speciesGroupId: speciesItem.id,
              speciesGroup: getSpeciesGroup(speciesItem.id),
              assessmentCategoryId: data['redlistId'],
              assessmentCategory: getCategory(data['redlistId']),
              sightingsCount: data['sightingCount'],
              imagesCount: data['sightingWithMediaCount'],
              validatedCount: data['validatedSightingCount'],
              approvedCount: data['approvedValidatedSightingCount'],
            }

            if (speciesItem.id == assessedSpeciesItemStats.id) {
              tempArray.push(assessedSpeciesItemStats)
            }

            map.set(getSpeciesGroup(speciesItem.id), { data: tempArray });

          });

        });

        return map;

      })
    );

    return data$;
  }

}