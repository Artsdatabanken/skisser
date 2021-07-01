import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from '../models/shared';
import { AssessmentCategory, ASSESSMENT_CATEGORY_TYPES, VALIDATION_STATUS } from '../models/statistics';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})

export class SpeciesService {

  private speciesGroupsCache$: Observable<Category[]>;
  private assessmentCategoriesCache$: Observable<AssessmentCategory[]>;
  private validationStatusesCache$: Observable<Category[]>;

  // API
  SPECIES_GROUP_API: string = 'https://ao3-listsapi.test.artsobservasjoner.no/api/v1/Lists/GetSpeciesGroupList';
  ASSESSMENT_CATEGORIES_API: string = 'https://ao3-listsapi.test.artsobservasjoner.no/api/v1/Lists/GetAssessmentCategories?assessmentListType=';
  VALIDATION_STATUS_API: string = 'https://ao3-listsapi.test.artsobservasjoner.no/api/v1/Lists/GetValidationStatusList';

  // enums
  assessmentCategoryTypes: typeof ASSESSMENT_CATEGORY_TYPES = ASSESSMENT_CATEGORY_TYPES;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;

  constructor(
    private httpClient: HttpClient
  ) { }

  // SPECIES GROUPS / ARTSGRUPPER

  get speciesGroups(): Observable<Category[]> {

    if (!this.speciesGroupsCache$) {
      this.speciesGroupsCache$ = this.requestSpeciesGroups().pipe(shareReplay(CACHE_SIZE));
    }

    return this.speciesGroupsCache$;

  }

  private requestSpeciesGroups(): Observable<Category[]> {

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
      shareReplay()
    );

  }

  // species groups by id

  getSpeciesGroupById(id: number): Observable<Category> {

    return this.speciesGroups.pipe(
      map((speciesGroups: Category[]) => speciesGroups.find(sg => sg.id === id))
    );

  }

  // ASSESSMENT CATEGORIES

  getAssessmentCategories(categoryVariant: string): Observable<AssessmentCategory[]> {

    if (!this.assessmentCategoriesCache$) {
      this.assessmentCategoriesCache$ = this.requestAssessmentCategories(categoryVariant).pipe(shareReplay(CACHE_SIZE));
    }

    return this.assessmentCategoriesCache$;

  }

  private requestAssessmentCategories(categoryVariant: string): Observable<AssessmentCategory[]> {

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
      shareReplay()
    );

  }

  // VALIDATION STATUS & CATEGORIES

  getValidationStatus(group?: string): Observable<Category[]> {
    return this.requestValidationStatus(group).pipe(shareReplay(CACHE_SIZE)); 
  }

  getCacheValidationStatus(group?: string): Observable<Category[]> {

    if (!this.validationStatusesCache$) {
      this.validationStatusesCache$ = this.requestValidationStatus(group).pipe(shareReplay(CACHE_SIZE));
    }

    console.log('validationStatusesCache', this.validationStatusesCache$)
    return this.validationStatusesCache$;

  }

  private requestValidationStatus(group?: string): Observable<Category[]> {

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

      })
    );

  }

}
