import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Category } from '../models/shared';
import { TOTAL_COUNT_STATISTICS, ASSESSMENT_CATEGORY_TYPES, VALIDATION_STATUS, SIGHTINGS_PER_YEAR, ImageStatisticsItem, StatisticsItem } from '../models/statistics';
import { SpeciesService } from './species.service';

@Injectable({
  providedIn: 'root'
})

export class OverviewStatisticsService {
  
  totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  assessmentCategoryTypes: typeof ASSESSMENT_CATEGORY_TYPES = ASSESSMENT_CATEGORY_TYPES;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  sightingsCountPerYear: typeof SIGHTINGS_PER_YEAR = SIGHTINGS_PER_YEAR;

  // API

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

  constructor(
    private httpClient: HttpClient,
    private speciesService: SpeciesService
  ) { }

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
      this.speciesService.speciesGroups
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
  
}
