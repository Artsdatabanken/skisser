import { Pipe, PipeTransform } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/shared';
import { StatisticsService } from '../services/statistics.service';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'getObjectsName'
})

export class GetObjectsNamePipe implements PipeTransform {

  currentLanguage$: Observable<string>;
  speciesGroups$: Observable<Category[]>;
  validationStatuses$: Observable<Category[]>;

  constructor(
    private translationService: TranslationService,
    private statisticsService: StatisticsService
  ) {
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  transform(value: unknown, ...args: unknown[]): unknown {

   //console.log('value', value)

    const data$ = forkJoin([
      this.currentLanguage$,
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([currentLanguage, speciesGroups]) => {

        const speciesGroup: Category = speciesGroups.find(sp => sp.id === value);
        let result: string;

        if (currentLanguage == 'no') result = speciesGroup.no;
        if (currentLanguage == 'en') result = speciesGroup.en;

      return result;

      })
    );

    //console.log('data', data$)
    
    return data$;
  }

}
