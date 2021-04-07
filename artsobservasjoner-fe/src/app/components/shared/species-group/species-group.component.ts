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
  speciesGroupLabel$: Observable<string>;
  currentLanguage$: Observable<string>;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.speciesGroupLabel$ = combineLatest([
      this.currentLanguage$,
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([currentLanguage, speciesGroups]) => {

        const speciesGroupObject: Category = speciesGroups.find(sg => sg.id == this.speciesGroupId);

        let result: string = '';

        if (speciesGroupObject) {
          if (currentLanguage == 'no') result = speciesGroupObject.no;
          if (currentLanguage == 'en') result = speciesGroupObject.en;
        }

        return result;

      }),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  }

}
