import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-species-group',
  templateUrl: './species-group.component.html',
  styleUrls: ['./species-group.component.scss']
})

export class SpeciesGroupComponent implements OnInit {

  @Input() speciesGroupId: number;
  @Input() language: string;
  currentLanguage$: Observable<string>;
  speciesGroup$: Observable<string>;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.speciesGroup$ = combineLatest([
      this.currentLanguage$,
      this.statisticsService.getValidationStatus()
    ]).pipe(
      map(([ currentLanguage, speciesGroups ]) => {

        console.log('speciesGroups', speciesGroups);

        const speciesGroupObject: Category = speciesGroups.find(vs => vs.id == this.speciesGroupId);
        let result: string;

        if (currentLanguage == 'no') result = speciesGroupObject.no;
        if (currentLanguage == 'en') result = speciesGroupObject.en;

        console.log('speciesGroups', result);

        return result;

      }),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  }

}
