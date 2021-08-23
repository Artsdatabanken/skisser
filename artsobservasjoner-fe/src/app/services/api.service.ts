import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// DISSE MÅ ENDRES BASERT PÅ ENVIRONMENT

export const CORE_BASE_URL: string = 'https://ao3-coreapi.test.artsobservasjoner.no/api/v1/Lists/';
export const LISTS_BASE_URL: string = 'https://ao3-listsapi.test.artsobservasjoner.no/api/v1/Lists/';
export const AREAS_BASE_URL: string = 'https://ao3-coreapi.test.artsobservasjoner.no/api/v1/Areas/';
export const LIST_BASE_URL: string = 'https://ao3-listsapi.test.artsobservasjoner.no/api/v1/Lists/';
export const STATISTICS_BASE_URL: string = 'https://ao3-statisticsapi.test.artsobservasjoner.no/api/v1/Statistics/';
export const TOPLIST_BASE_URL: string = 'https://ao3-statisticsapi.test.artsobservasjoner.no/api/v1/TopList/';
export const TAXONS_BASE_URL: string = 'https://ao3-coreapi.test.artsobservasjoner.no/api/v1/Taxons/';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  DRUPAL_API: object = {
    about: 'https://artsdatabanken.no/api/Resource/?Collection=Nodes/302996',
    nodes: 'https://artsdatabanken.no/api/Content/'
  }

  AREA: any = {
    areaById: AREAS_BASE_URL + 'Names/',
    //areasByString: AREAS_BASE_URL + 'Names/Search?Search=',
    areasByString: AREAS_BASE_URL + 'Names/ByAreaDataset/CountyAndMunicipality/Search?Search=',
    counties: AREAS_BASE_URL + 'Names/ByAreaDataset/County/',
    municipalities: AREAS_BASE_URL + 'Names/ByAreaDataset/Municipality/',
    countiesByString: AREAS_BASE_URL + 'Names/ByAreaDataset/County/Search?Search=',
    municipalitiesByString: AREAS_BASE_URL + 'Names/ByAreaDataset/Municipality/Search?Search='
  }

  STATISTICS: any = {
    dataSourceList1: LIST_BASE_URL + 'GetDatasourceTypeList',
    dataSourceList2: LIST_BASE_URL + 'GetApiList',

    sightingsCountPerSpeciesGroup: STATISTICS_BASE_URL + 'GetSightingsCountPerSpeciesGroup',
    imagesPerSpeciesGroup: STATISTICS_BASE_URL + 'GetImagesPerSpeciesGroupData',
    sumOfSightingsCountPerYear: STATISTICS_BASE_URL + 'GetSumOfSightingsCountPerYear',
    sumOfSightingsCountPerYearArtskart: STATISTICS_BASE_URL + 'GetSumOfSightingsCountPerYearArtskart',
    sightingPerCounty: STATISTICS_BASE_URL + 'GetSightingPerCountyData',

    sightingsPerDataSource: STATISTICS_BASE_URL + 'GetSightingsDataPerDataSource',
    sightingCountObservedPerMonth: STATISTICS_BASE_URL + 'GetSightingCountObservedPerMonth',

    reportersCountThisYear: STATISTICS_BASE_URL + 'GetReportersCountThisYear',
    reportersCountLastYear: STATISTICS_BASE_URL + 'GetReportersCountLastYear',
    reportersCountLast7Days: STATISTICS_BASE_URL + 'GetReportersCountLast7Days',

    totalSightingsCount: STATISTICS_BASE_URL + 'GetTotalSightingsCount',
    totalSpeciesCount: STATISTICS_BASE_URL + 'GetTotalSpeciesCount',
    totalImagesCount: STATISTICS_BASE_URL + 'GetTotalImagesCount',
    totalUsersCount: STATISTICS_BASE_URL + 'GetTotalUsersCount',
    projectsCount: STATISTICS_BASE_URL + 'GetProjectData',

    validatedData: STATISTICS_BASE_URL + 'GetValidatedData',
    validatedDataCountByStatus: STATISTICS_BASE_URL + 'GetSightingsValidatedCountData',
    assessedSpecies: STATISTICS_BASE_URL + 'GetAssessmentList?assessmentListType='

  }

  TOP_LISTS: any = {
    countySpeciesCount: TOPLIST_BASE_URL + 'CountySpeciesCount?',
    municipalitySpeciesCount: TOPLIST_BASE_URL + 'MunicipalitySpeciesCount?',
    speciesList: TOPLIST_BASE_URL + 'SpeciesList?'
  }

  SPECIES: any = {
    speciesGroupsList: LISTS_BASE_URL + 'GetSpeciesGroupList',
    assessmentCategories: LISTS_BASE_URL + 'GetAssessmentCategories?assessmentListType=',
    validationStatuses: LISTS_BASE_URL + 'GetValidationStatusList'
  }

  TAXONS: any = {
    taxonData: 'https://ao3-coreapi.test.artsobservasjoner.no/api/v1/Taxons/',
    taxonNameSearch: 'https://ao3-coreapi.test.artsobservasjoner.no/api/v1/TaxonName/Search?',
    taxonClassification: TAXONS_BASE_URL + 'TaxonCategories'
  }

  RESOURCES: any = {
    translations: 'https://ao3-resourcesapi.test.artsobservasjoner.no/api/v1/Resources'
  }

  USER_STATISTICS: any = {
    observerSpeciesCount: TOPLIST_BASE_URL + 'ObserverSpeciesCount?',
    usersMediaCount: TOPLIST_BASE_URL + 'UsersMediaCount?'
  }

  //------------------------------------------------------------------------------------***

  constructor(private httpClient: HttpClient) { }

  public handleError(err: HttpErrorResponse) {

    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;

    }
    else {

      // The backend returned an unsuccessful response code.
      switch (err.status) {
        case 400:
          errorMessage = "Bad Request.";
          break;
        case 401:
          errorMessage = "You need to log in to do this action.";
          break;
        case 403:
          errorMessage = "You don't have permission to access the requested resource.";
          break;
        case 404:
          errorMessage = "The requested resource does not exist.";
          break;
        case 412:
          errorMessage = "Precondition Failed.";
          break;
        case 500:
          errorMessage = "Internal Server Error.";
          break;
        case 503:
          errorMessage = "The requested service is not available.";
          break;
        case 422:
          errorMessage = "Validation Error!";
          break;
        default:
          errorMessage = "Something went wrong!";
      }

    }

    if (errorMessage) {

    }

  }

  createApiUrl(
    baseUrl: string,
    pageNumberParam: number,
    pageSizeParam: number,
    yearParam?: number | string,
    speciesGroupParam?: number | string,
    taxonParam?: number | string,
    areaParam?: number | string
  ): string {

    let api: string;
    let params: URLSearchParams = new URLSearchParams();

    const addParam = (key, value) => {

      if (value) {
        params.append(key, value.toString());
      }

    };

    addParam('Year', yearParam);
    addParam('SpeciesGroupId', speciesGroupParam);
    addParam('TaxonId', taxonParam);
    addParam('AreaId', areaParam);
    addParam('PageNumber', pageNumberParam);
    addParam('PageSize', pageSizeParam);

    api = baseUrl + params.toString();

    return api;

  }

}
