import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { ValidatedDataItem, VALIDATION_STATUS } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-validated-data',
  templateUrl: './validated-data.component.html',
  styleUrls: ['./validated-data.component.scss']
})

export class ValidatedDataComponent implements OnInit {

  data$: Observable<ValidatedDataItem[]>;
  validatedDataByStatus$: Observable<any>;
  currentLanguage$: Observable<string>;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  speciesGroups$: Observable<Category[]>;
  validationStatuses$: Observable<Category[]>;
  data2$;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getValidatedData();
    this.getValidatedDataByStatus();

  }

  getValidatedData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getValidatedData(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, speciesGroups]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        // ---------------------------------------- ***

        let validatedDataItem: ValidatedDataItem;
        let validatedData: ValidatedDataItem[] = [];

        species.forEach(speciesItem => {

          validatedDataItem = {
            id: speciesItem.id,
            speciesGroup: getSpeciesGroup(speciesItem.id),
            count: speciesItem.count,
            sightingTaxonCount: speciesItem.sightingTaxonCount,
            sightingWithMediaCount: speciesItem.sightingWithMediaCount,
            validatedSightingCount: speciesItem.validatedSightingCount,
            approvedSightingCount: speciesItem.approvedSightingCount,
            percentageSightedVsValidated: speciesItem.percentageSightedVsValidated,
            percentageValidatedVsApproved: speciesItem.percentageValidatedVsApproved,
          }

          validatedData.push(validatedDataItem);

        });

        this.translationService.currentLanguage$.subscribe(lang => {
          validatedData = validatedData.sort((a, b) => a.speciesGroup[lang].localeCompare(b.speciesGroup[lang]));
        });

        return validatedData;

      })
    );
  }

  getValidatedDataByStatus(): void {

    this.speciesGroups$ = this.statisticsService.getSpeciesGroups();
    this.validationStatuses$ = this.statisticsService.getValidationStatus();
    this.validatedDataByStatus$ = this.statisticsService.getValidatedDataByStatus();

    // this.data2$ = forkJoin([
    //   this.statisticsService.getSpeciesGroups(),
    //   this.statisticsService.getValidationStatus(),
    //   this.statisticsService.getValidatedDataByStatus()
    // ]).pipe(
    //   map(([speciesGroups, validationStatuses, validatedData]) => {

    //     // ---------------------------------------- ***

    //     const getValidationStatus = (id: number): Category => {
    //       return validationStatuses.find(valStatus => valStatus.id === id);
    //     }

    //     const getSpeciesGroup = (id: number): Category => {
    //       return speciesGroups.find(speciesGroup => speciesGroup.id === id);
    //     }

    //     // ---------------------------------------- ***

    //     Object.keys(validatedData).forEach(element => {
    //       console.log('elem', element);
    //     });

    //   })
    // );

  }

  getValidationStatus(id: number): any {
    console.log('validation status', id);
  }

}
