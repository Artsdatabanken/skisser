import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from '../models/shared';
import { AssessmentCategory, ASSESSMENT_CATEGORY_TYPES, VALIDATION_STATUS } from '../models/statistics';
import { ApiService } from './api.service';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})

export class SpeciesService {

  private speciesGroupsCache$: Observable<Category[]>;
  private assessmentCategoriesCache$: Observable<AssessmentCategory[]>;
  private validationStatusesCache$: Observable<Category[]>;

  // enums
  assessmentCategoryTypes: typeof ASSESSMENT_CATEGORY_TYPES = ASSESSMENT_CATEGORY_TYPES;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) { }

  // SPECIES GROUPS / ARTSGRUPPER

  get speciesGroups(): Observable<Category[]> {

    if (!this.speciesGroupsCache$) {
      this.speciesGroupsCache$ = this.requestSpeciesGroups().pipe(shareReplay(CACHE_SIZE));
    }

    return this.speciesGroupsCache$;

  }

  private requestSpeciesGroups(): Observable<Category[]> {

    return this.httpClient.get(this.apiService.SPECIES.speciesGroupsList).pipe(
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
        api = this.apiService.SPECIES.assessmentCategories + this.assessmentCategoryTypes.redlist;
        break;

      case this.assessmentCategoryTypes.alienlist:
        api = this.apiService.SPECIES.assessmentCategories + this.assessmentCategoryTypes.alienlist;
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

    return this.validationStatusesCache$;

  }

  private requestValidationStatus(group?: string): Observable<Category[]> {

    let apiUrl: string;
    apiUrl = group ? apiUrl = this.apiService.SPECIES.validationStatuses + '?group=' + group : apiUrl = this.apiService.SPECIES.validationStatuses;

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
