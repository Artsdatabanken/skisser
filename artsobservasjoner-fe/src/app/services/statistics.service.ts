import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, publishReplay, refCount, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { UtilitiesService } from './utilities.service';
import { Category, OLD_COUNTIES } from '../models/shared';


import {
  AssessmentCategory,
  AssessedSpeciesItem,
  ValidatedDataItem,
  StatisticsItem,
  TotalCountStatistic,
  ImageStatisticsItem,
  TOTAL_COUNT_STATISTICS,
  ASSESSMENT_CATEGORY_TYPES,
  AssessedSpeciesItemStats,
  ValidatedDataItemByStatus,
  SIGHTINGS_PER_YEAR,
  VALIDATION_STATUS
} from '../models/statistics';
import { SpeciesService } from './species.service';


@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  assessmentCategoryTypes: typeof ASSESSMENT_CATEGORY_TYPES = ASSESSMENT_CATEGORY_TYPES;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  sightingsCountPerYear: typeof SIGHTINGS_PER_YEAR = SIGHTINGS_PER_YEAR;

  // JSON

  counties: typeof OLD_COUNTIES = OLD_COUNTIES;

  // API

  VALIDATED_DATA_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetValidatedData';
  VALIDATED_DATA_BY_STATUS_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSightingsValidatedCountData';
  ASSESSED_SPECIES_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetAssessmentList?assessmentListType=';

  SPECIES_GROUP_API: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';
  ASSESSMENT_CATEGORIES_API: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAssessmentCategories?assessmentListType=';
  VALIDATION_STATUS_API: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetValidationStatusList';

  USER_COUNT1_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetReportersCountThisYear';
  USER_COUNT2_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetReportersCountLastYear';
  USER_COUNT3_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetReportersCountLast7Days';

  TOTAL_COUNT_SIGHTINGS_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalSightingsCount';
  TOTAL_COUNT_SPECIES_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalSpeciesCount';
  TOTAL_COUNT_IMAGES_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalImagesCount';
  TOTAL_COUNT_USERS_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalUsersCount';

  // ------------------------------------------------------------ ***

  constructor(
    private httpClient: HttpClient,
    private speciesService: SpeciesService,
    private utilitiesService: UtilitiesService
  ) { }

  // ------------------------------------------------------------ ***

  // VALIDATED DATA / KVALITETSSIKREDE DATA

  getValidatedData(): Observable<ValidatedDataItem[]> {

    return this.httpClient.get(this.VALIDATED_DATA_API).pipe(
      map((response: any) => {

        let validatedSightings: ValidatedDataItem[] = [];
        let validatedSighting: ValidatedDataItem;

        response['validatedDataStatistics'].forEach(element => {

          validatedSighting = {
            id: element.speciesGroupId,
            speciesGroup: element.speciesGroupId,
            count: element.sightingCount,
            sightingTaxonCount: element.sightingTaxonCount,
            sightingWithMediaCount: element.sightingWithMediaCount,
            validatedSightingCount: element.validatedSightingCount,
            approvedSightingCount: element.approvedValidatedSightingCount,
            percentageSightedVsValidated: this.utilitiesService.getPercentage(element.sightingCount, element.validatedSightingCount),
            percentageValidatedVsApproved: this.utilitiesService.getPercentage(element.validatedSightingCount, element.approvedValidatedSightingCount),
          }

          validatedSightings.push(validatedSighting);

        });

        return validatedSightings;
      }),
      shareReplay()
    );

  }

  getValidatedDataCountByStatus(): Observable<ValidatedDataItemByStatus[]> {

    return this.httpClient.get(this.VALIDATED_DATA_BY_STATUS_API).pipe(
      map(response => {

        let statisticsItem: ValidatedDataItemByStatus;
        let statisticsItems: ValidatedDataItemByStatus[] = [];

        response['sightingsValidated'].forEach(element => {

          statisticsItem = {
            validationStatusId: element.validationStatusId,
            speciesGroupId: element.speciesGroupId,
            count: element.sightingCount
          }

          statisticsItems.push(statisticsItem);

        });

        return statisticsItems;

      }),
      shareReplay()
    );

  }

  getValidatedDataByStatus(): Observable<object> {

    const data$ = forkJoin([
      this.getValidatedDataCountByStatus(),
      this.speciesService.speciesGroups,
      this.speciesService.getValidationStatus(this.validationStatuses.validated)
    ]).pipe(
      map(([validatedData, speciesGroups, validationStatuses]) => {

        let statusObject: object = {};

        validationStatuses.forEach(validationStatus => {

          statusObject[0] = {};
          statusObject[validationStatus.id] = {};

          speciesGroups.forEach(speciesGroup => {
            statusObject[0][speciesGroup.id] = speciesGroup.id;
            statusObject[validationStatus.id][speciesGroup.id] = 0;
          });

        });

        validatedData.forEach(data => {

          statusObject[data.validationStatusId][data.speciesGroupId] = data.count;

        });

        console.log();
        return statusObject;

      })
    );

    return data$;
  }

  // REDLISTED AND ALIEN STATS

  // denne henter fra DB
  getAssessedSpeciesStatistics(categoryVariant: string): Observable<AssessedSpeciesItem[]> {

    let api: string;

    switch (categoryVariant) {
      case this.assessmentCategoryTypes.redlist:
        api = this.ASSESSED_SPECIES_API + this.assessmentCategoryTypes.redlist;
        break;

      case this.assessmentCategoryTypes.alienlist:
        api = this.ASSESSED_SPECIES_API + this.assessmentCategoryTypes.alienlist;
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
      shareReplay()
    );

  }

  // denne joiner de forskjellige datasett og sender videre til komponentene som konsumerer dataen
  getAssessedSpeciesData(categoryVariant: string): Observable<Map<number, AssessedSpeciesItemStats[]>> {

    let assessmentCategory: string;

    switch (categoryVariant) {
      case this.assessmentCategoryTypes.redlist:
        assessmentCategory = this.assessmentCategoryTypes.redlist;
        break;

      case this.assessmentCategoryTypes.alienlist:
        assessmentCategory = this.assessmentCategoryTypes.alienlist;
        break;

      default:
        console.log('');
    }

    const data$ = forkJoin([
      this.getAssessedSpeciesStatistics(assessmentCategory),
      this.speciesService.getAssessmentCategories(assessmentCategory)
    ]).pipe(
      map(([species, categories]) => {

        let assessedSpeciesItemStats: AssessedSpeciesItemStats;

        // ---------------------------------------- ***

        const getCategory = (id: number): AssessmentCategory => {
          return categories.find(category => category.id === id);
        }

        // ---------------------------------------- ***

        const map = new Map();

        species.forEach(speciesItem => {

          let tempArray = [];

          speciesItem.data.forEach(data => {

            assessedSpeciesItemStats = {
              id: speciesItem.id,
              speciesGroupId: speciesItem.id,
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

            //map.set(getSpeciesGroup(speciesItem.id), { data: tempArray });
            map.set(speciesItem.id, { data: tempArray });

          });

        });

        //console.log('map', map)
        return map;

      })
    );

    return data$;
  }

  // NUMBERS STATISTICS

  getTotalCount(stats: string): Observable<TotalCountStatistic> {

    let api: string;

    switch (stats) {
      case this.totalCountStatistics.totalSightings:
        api = this.TOTAL_COUNT_SIGHTINGS_API;
        break;

      case this.totalCountStatistics.totalSpecies:
        api = this.TOTAL_COUNT_SPECIES_API;
        break;

      case this.totalCountStatistics.totalImages:
        api = this.TOTAL_COUNT_IMAGES_API;
        break;

      case this.totalCountStatistics.totalUsers:
        api = this.TOTAL_COUNT_USERS_API;
        break;

      case this.totalCountStatistics.usersThisYear:
        api = this.USER_COUNT1_API;
        break;

      case this.totalCountStatistics.usersLastYear:
        api = this.USER_COUNT2_API;
        break;

      case this.totalCountStatistics.usersLast7Days:
        api = this.USER_COUNT3_API;
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


}