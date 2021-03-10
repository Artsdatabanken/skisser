import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { StatisticsItem, ValidatedDataItem, VALIDATION_STATUS } from 'src/app/models/statistics';
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
  validationStatus$: Observable<Category[]>;
  speciesGroups$: Observable<Category[]>;
  currentLanguage$: Observable<string>;
  validationStatus: typeof VALIDATION_STATUS = VALIDATION_STATUS;

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

    //this.validationStatus$ = this.statisticsService.getValidationStatus(this.validationStatus.validated);
    this.speciesGroups$ = this.statisticsService.getSpeciesGroups();
    this.validatedDataByStatus$ = this.statisticsService.getValidatedDataByStatus();

    this.statisticsService.getValidatedDataByStatus().subscribe(res => {
      console.log('xxxxx', res)
    })
    
    // this.validatedDataByStatus$ = forkJoin(([
    //   this.statisticsService.getValidatedDataByStatus(),
    //   this.statisticsService.getSpeciesGroups(),
    //   this.statisticsService.getValidationStatus()
    // ])).pipe(
    //   map(([validatedData, speciesGroups, validationStatuses]) => {

    //     console.log('xxx', validatedData)

    //     // ---------------------------------------- ***

    //     const getSpeciesGroup = (id: number): Category => {
    //       return speciesGroups.find(speciesGroup => speciesGroup.id === id);
    //     }

    //     const getValidationStatus = (id: number): Category => {
    //       return validationStatuses.find(validationStatus => validationStatus.id === id);
    //     }

    //     // ---------------------------------------- ***

    //     let statsItem: StatisticsItem;
    //     let statsItems: StatisticsItem[] = [];

    //     validatedData.forEach(element => {

    //       statsItem = {
    //         id: element.id,
    //         speciesGroup: getSpeciesGroup(element.id),
    //         count: element.count,
    //       }

    //       statsItems.push(statsItem);

    //     });

    //     this.translationService.currentLanguage$.subscribe(lang => {
    //       statsItems = statsItems.sort((a, b) => a.speciesGroup[lang].localeCompare(b.speciesGroup[lang]));
    //     });

    //     return statsItems;
    //   })
    // );

  }

  getSpeciesGroups(): void {
    this.speciesGroups$ = this.statisticsService.getSpeciesGroups();
  }
}
