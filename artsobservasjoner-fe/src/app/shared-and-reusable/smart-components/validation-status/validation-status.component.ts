import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { VALIDATION_STATUS } from 'src/app/models/statistics';
import { SpeciesService } from 'src/app/services/species.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-validation-status',
  templateUrl: './validation-status.component.html',
  styleUrls: ['./validation-status.component.scss']
})

export class ValidationStatusComponent implements OnInit {

  @Input() validationStatusId: number;
  @Input() language: string;
  currentLanguage$: Observable<string>;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  validationStatus: string;
  validationStatus$: Observable<string>;

  constructor(
    private speciesService: SpeciesService,
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.currentLanguage$ = this.translationService.currentLanguage$;

    // this.statisticsService.getValidationStatus().pipe(
    //   map((data: any) => {

    //     const obj: Category = data.find(d => d.id == this.validationStatusId);

    //     this.validationStatus = this.language === 'no' ? obj.no : obj.en;
    //     console.log('this.validationStatus', this.validationStatus);
    //     //console.log('XXXXXXXXXX', data, this.validationStatusId, data.id === this.validationStatusId);


    //     return this.validationStatus;

    //   })
    // ).subscribe();

    this.validationStatus$ = combineLatest([
      this.currentLanguage$,
      this.speciesService.getValidationStatus(),
      this.statisticsService.getValidationStatus()
    ]).pipe(
      map(([currentLanguage, validationStatuses, validationStatuses2]) => {

        const validationStatusObject: Category = validationStatuses.find(vs => vs.id == this.validationStatusId);
        let result: string;

        //console.log('validationStatusObject', validationStatusObject);

        if (validationStatusObject) {
          if (currentLanguage == 'no') result = validationStatusObject.no;
          if (currentLanguage == 'en') result = validationStatusObject.en;
        }


        console.log('spec service', validationStatuses);
        console.log('stats service', validationStatuses2);

        return result;

      })
    );

  }


}
