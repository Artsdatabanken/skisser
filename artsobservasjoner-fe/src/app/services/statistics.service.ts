import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, publishReplay, refCount, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { UtilitiesService } from './utilities.service';
import { Category } from '../models/shared';


import {
  AssessmentCategory,
  AssessedSpeciesItem,
  ValidatedDataItem,
  TotalCountStatistic,
  TOTAL_COUNT_STATISTICS,
  ASSESSMENT_CATEGORY_TYPES,
  AssessedSpeciesItemStats,
  ValidatedDataItemByStatus,
  SIGHTINGS_PER_YEAR,
  VALIDATION_STATUS
} from '../models/statistics';

import { SpeciesService } from './species.service';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  assessmentCategoryTypes: typeof ASSESSMENT_CATEGORY_TYPES = ASSESSMENT_CATEGORY_TYPES;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  sightingsCountPerYear: typeof SIGHTINGS_PER_YEAR = SIGHTINGS_PER_YEAR;

  // ------------------------------------------------------------ ***

  constructor(
    private httpClient: HttpClient,
    private speciesService: SpeciesService,
    private utilitiesService: UtilitiesService,
    private apiService: ApiService
  ) { }

  // ------------------------------------------------------------ ***

  // VALIDATED DATA / KVALITETSSIKREDE DATA

  getValidatedData(): Observable<ValidatedDataItem[]> {

    return this.httpClient.get(this.apiService.STATISTICS.validatedData).pipe(
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

    return this.httpClient.get(this.apiService.STATISTICS.validatedDataCountByStatus).pipe(
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
        api = this.apiService.STATISTICS.assessedSpecies + this.assessmentCategoryTypes.redlist;
        break;

      case this.assessmentCategoryTypes.alienlist:
        api = this.apiService.STATISTICS.assessedSpecies + this.assessmentCategoryTypes.alienlist;
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

            map.set(speciesItem.id, { data: tempArray });

          });

        });

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
        api = this.apiService.STATISTICS.totalSightingsCount;
        break;

      case this.totalCountStatistics.totalSpecies:
        api = this.apiService.STATISTICS.totalSpeciesCount;
        break;

      case this.totalCountStatistics.totalImages:
        api = this.apiService.STATISTICS.totalImagesCount;
        break;

      case this.totalCountStatistics.totalUsers:
        api = this.apiService.STATISTICS.totalUsersCount;
        break;

      case this.totalCountStatistics.usersThisYear:
        api = this.apiService.STATISTICS.reportersCountThisYear;
        break;

      case this.totalCountStatistics.usersLastYear:
        api = this.apiService.STATISTICS.reportersCountLastYear;
        break;

      case this.totalCountStatistics.usersLast7Days:
        api = this.apiService.STATISTICS.reportersCountLast7Days;
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