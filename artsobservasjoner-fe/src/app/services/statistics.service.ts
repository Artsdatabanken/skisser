import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, publishReplay, refCount, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { UtilitiesService } from './utilities.service';
import { Category, OLD_COUNTIES } from '../models/shared';
import Geographic from '../data/Geografisk_fordeling3.json';
import Geographic2 from '../data/Geografisk_fordeling2.json';

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

  public responseCache = new Map();
  errorMessage: string;
  totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  assessmentCategoryTypes: typeof ASSESSMENT_CATEGORY_TYPES = ASSESSMENT_CATEGORY_TYPES;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  sightingsCountPerYear: typeof SIGHTINGS_PER_YEAR = SIGHTINGS_PER_YEAR;

  // JSON

  geographic: any = Geographic;
  geographic2: any = Geographic2;
  counties: typeof OLD_COUNTIES = OLD_COUNTIES;

  // API

  VALIDATED_DATA_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetValidatedData';
  VALIDATED_DATA_BY_STATUS_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSightingsValidatedCountData';
  ASSESSED_SPECIES_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetAssessmentList?assessmentListType=';

  SPECIES_GROUP_API: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetSpeciesGroupList';
  ASSESSMENT_CATEGORIES_API: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetAssessmentCategories?assessmentListType=';
  VALIDATION_STATUS_API: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetValidationStatusList';
  DATA_SOURCE_LIST_API: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetDatasourceTypeList';
  DATA_SOURCE_LIS2_API: string = 'https://ao3-listsapi-staging.azurewebsites.net/api/v1/Lists/GetApiList';

  OVERVIEW_STATS_1_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSightingsCountPerSpeciesGroup';
  OVERVIEW_STATS_2_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetImagesPerSpeciesGroupData';
  OVERVIEW_STATS_3A_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSumOfSightingsCountPerYear';
  OVERVIEW_STATS_3B_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSumOfSightingsCountPerYearArtskart';
  OVERVIEW_STATS_SIGHTINGS_PER_AREA_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSightingPerCountyData';

  SIGHTINGS_PER_SOURCE_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSightingsDataPerDataSource';
  MONTHLY_SIGHTINGS_PER_SPECIES_GROUP_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetSightingCountObservedPerMonth';

  USER_COUNT1_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetReportersCountThisYear';
  USER_COUNT2_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetReportersCountLastYear';
  USER_COUNT3_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetReportersCountLast7Days';

  TOTAL_COUNT_SIGHTINGS_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalSightingsCount';
  TOTAL_COUNT_SPECIES_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalSpeciesCount';
  TOTAL_COUNT_IMAGES_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalImagesCount';
  TOTAL_COUNT_USERS_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetTotalUsersCount';
  TOTAL_COUNT_PROJECTS_API: string = 'https://ao3-statisticsapi-test.azurewebsites.net/api/v1/Statistics/GetProjectData';

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
      tap(t => console.log('t', t)),
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
      this.getValidationStatus(this.validationStatuses.validated)
    ]).pipe(
      map(([validatedData, speciesGroups, validationStatuses]) => {

        let statusObject: object = {};

        validationStatuses.forEach(validationStatus => {

          statusObject['0'] = {};
          statusObject[validationStatus.id] = {};

          speciesGroups.forEach(speciesGroup => {
            statusObject['0'][speciesGroup.id]= speciesGroup.id;
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
  getAssessedSpeciesData(categoryVariant: string): Observable<any> {

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
      this.getAssessmentCategories(assessmentCategory)
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

        return map;

      })
    );

    return data$;
  }

  // SPECIES GROUPS / ARTSGRUPPER

  getSpeciesGroups(): Observable<Category[]> {
    return this.httpClient.get(this.SPECIES_GROUP_API).pipe(
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

    let api: string;

    switch (categoryVariant) {
      case this.assessmentCategoryTypes.redlist:
        api = this.ASSESSMENT_CATEGORIES_API + this.assessmentCategoryTypes.redlist;
        break;

      case this.assessmentCategoryTypes.alienlist:
        api = this.ASSESSMENT_CATEGORIES_API + this.assessmentCategoryTypes.alienlist;
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
    apiUrl = group ? apiUrl = this.VALIDATION_STATUS_API + '?group=' + group : apiUrl = this.VALIDATION_STATUS_API;

    return this.httpClient.get(apiUrl).pipe(
      map((response: any) => {

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

  // DATA SOURCE LIST

  getDataSourceList(): Observable<Category[]> {

    return this.httpClient.get(this.DATA_SOURCE_LIST_API).pipe(
      map((response: any) => {

        let objs: Category[] = [];

        response.forEach(element => {
          const obj: Category = {
            id: element.dataSourceTypeId,
            label: element.type,
            en: element.resourceLabels[0].label,
            no: element.resourceLabels[1].label,
          }

          objs.push(obj);
        });

        return objs;

      }),
      publishReplay(1),
      refCount()
    );

  }

  getApiDataSourceList(): Observable<object[]> {

    return this.httpClient.get(this.DATA_SOURCE_LIS2_API).pipe(
      map((response: any) => {

        let objs: object[] = [];

        response.forEach(element => {
          objs.push({
            id: element.id,
            name: element.name
          })
        });

        return objs;

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

  // OVERVIEW STATISTICS

  getSightingsCountPerSpeciesGroup(): Observable<object[]> {

    return this.httpClient.get(this.OVERVIEW_STATS_1_API).pipe(
      map((response: any) => {

        let statisticsItem: object;
        let statisticsItems: object[] = [];

        response.sightingsCountPerSpeciesGroupStatistics.forEach(element => {

          if (element.speciesGroupId !== null) {

            statisticsItem = {
              id: element.speciesGroupId,
              totalCount: element.sightingCount,
              totalPublished: element.publishedThisYear,
              totalSighted: element.observedThisYear
            }

            statisticsItems.push(statisticsItem);

          }

        });

        return statisticsItems.sort((a, b) => b['totalCount'] - a['totalCount']);

      }),
      publishReplay(1),
      refCount()
    );

  }

  getImageCountPerSpeciesGroup(): Observable<ImageStatisticsItem[]> {

    return this.httpClient.get(this.OVERVIEW_STATS_2_API).pipe(
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

  getSightinsCountSumPerYear(variant: string): Observable<StatisticsItem[]> {

    let api: string;

    switch (variant) {
      case this.sightingsCountPerYear.artsobs:
        api = this.OVERVIEW_STATS_3A_API;
        break;

      case this.sightingsCountPerYear.artskart:
        api = this.OVERVIEW_STATS_3B_API;
        break;

      default:
        console.log();
    }

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        let statisticsItem: StatisticsItem;
        let statisticsItems: StatisticsItem[] = [];

        response.sightingsCountByYearStatistics.forEach(element => {

          if (element.speciesGroupId !== null) {

            statisticsItem = {
              id: element.year,
              count: element.totalSightingsCount
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

  getProjectsCount(): Observable<object> {

    return this.httpClient.get(this.TOTAL_COUNT_PROJECTS_API).pipe(
      map((response: any) => {

        const projectsCount: object = {
          totalProjectsCount: response['projectDataStatistics'].projectCount,
          publicProjectsCount: response['projectDataStatistics'].publicProjectCount,
          privateProjectsCount: response['projectDataStatistics'].hiddenProjectCount
        }

        return projectsCount;
      }),
      publishReplay(1),
      refCount()
    );

  }

  getSightingsPerDataSource(): Observable<object[]> {

    return this.httpClient.get(this.SIGHTINGS_PER_SOURCE_API).pipe(
      map((response: any) => {

        let sightingsPerDataSource: object[] = [];

        response['sightingDataPerDataSourceStatistics'].forEach(element => {


          let obj: object = {
            dataSourceId: element.dataSourceTypeId,
            apiId: element.apiId,
            reportersCount: element.reportersCount,
            sightingsCount: element.sightingCount,
            nullFindingsCount: element.notPresentOrRecoveredCount
          };

          sightingsPerDataSource.push(obj);

        });

        return sightingsPerDataSource;

      }),
      publishReplay(1),
      refCount()
    );

  }

  getSightingsByArea(): Observable<object[]> {

    return this.httpClient.get(this.OVERVIEW_STATS_SIGHTINGS_PER_AREA_API).pipe(
      tap(t => console.log('t', t)),
      map((response: any) => {

        let item: object;
        let items: object[] = [];

        response.sightingPerCountyStatistics.forEach(element => {

          item = {
            areaId: element.areaId,
            areaName: element.areaName,
            data: element.data
          }

          items.push(item);

        });

        return items;

      }),
      publishReplay(1),
      refCount()
    );

  }

  getSightingsGeographicalDistribution(): Observable<object> {

    const data$ = forkJoin([
      this.getSightingsByArea(),
      this.getSpeciesGroups()
    ]).pipe(
      map(([sightingsByArea, speciesGroups]) => {

        let obj: object = {};

        sightingsByArea = sightingsByArea.sort((a, b) => a['areaName'].localeCompare(b['areaName']));

        sightingsByArea.forEach(element => {
          obj[element['areaName']] = {};

          speciesGroups.forEach(speciesGroup => {
            obj[element['areaName']][speciesGroup.id] = 0;
          });

        });

        sightingsByArea.forEach(element => {

          element['data'].forEach(item => {
            if (item.hasOwnProperty('speciesGroupId') && item['speciesGroupId'] !== 0) {
              obj[element['areaName']][item['speciesGroupId']] = item['sightingCount'];
            }
          });

        });

        console.log('obj', obj);

        return obj;
      })
    );

    return data$;

  }

  getMonthlySightingsOrRegistrationsBySpeciesGroup(): Observable<StatisticsItem[]> {
    return this.httpClient.get(this.MONTHLY_SIGHTINGS_PER_SPECIES_GROUP_API).pipe(
      map((response: any) => {

        let items: StatisticsItem[] = [];

        response.sightingCountPerMonthStatistics.forEach(element => {

          let item: StatisticsItem = {
            id: element.speciesGroupId,
            data: element.data
          }

          items.push(item);

        });

        return items;

      }),
      publishReplay(1),
      refCount()
    );
  }

}