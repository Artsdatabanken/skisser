import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { ValidatedDataItem, VALIDATION_STATUS } from 'src/app/models/statistics';
import { SpeciesService } from 'src/app/services/species.service';
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
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  validationStatuses$: Observable<Category[]>;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {

    this.getValidatedData();
    this.getValidatedDataByStatus();

  }

  getValidatedData(): void {

    this.data$ = this.statisticsService.getValidatedData();

    // this.data$ = forkJoin([
    //   this.statisticsService.getValidatedData(),
    //   this.speciesService.speciesGroups
    // ]).pipe(
    //   map(([species, speciesGroups]) => {

    //     // ---------------------------------------- ***

    //     // const getSpeciesGroup = (id: number): Category => {
    //     //   return speciesGroups.find(speciesGroup => speciesGroup.id === id);
    //     // }

    //     // ---------------------------------------- ***

    //     let validatedDataItem: ValidatedDataItem;
    //     let validatedData: ValidatedDataItem[] = [];

    //     species.forEach(speciesItem => {

    //       validatedDataItem = {
    //         id: speciesItem.id,
    //         // speciesGroup: getSpeciesGroup(speciesItem.id),
    //         speciesGroup: speciesItem.id,
    //         count: speciesItem.count,
    //         sightingTaxonCount: speciesItem.sightingTaxonCount,
    //         sightingWithMediaCount: speciesItem.sightingWithMediaCount,
    //         validatedSightingCount: speciesItem.validatedSightingCount,
    //         approvedSightingCount: speciesItem.approvedSightingCount,
    //         percentageSightedVsValidated: speciesItem.percentageSightedVsValidated,
    //         percentageValidatedVsApproved: speciesItem.percentageValidatedVsApproved,
    //       }

    //       validatedData.push(validatedDataItem);

    //     });

    //     return validatedData;

    //   })
    // );

  }

  getValidatedDataByStatus(): void {

    this.validatedDataByStatus$ = this.statisticsService.getValidatedDataByStatus();

  }

}
