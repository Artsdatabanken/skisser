import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { SpeciesService } from 'src/app/services/species.service';
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
    private speciesService: SpeciesService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.speciesGroupLabel$ = combineLatest([
      this.currentLanguage$,
      this.speciesService.speciesGroups
    ]).pipe(
      map(([currentLanguage, speciesGroups]) => {

        const speciesGroupObject: Category = speciesGroups.find(sg => sg.id == this.speciesGroupId);

        let result: string = '';

        if (speciesGroupObject) {
          if (currentLanguage == 'no') result = speciesGroupObject.no;
          if (currentLanguage == 'en') result = speciesGroupObject.en;
        }

        return result;

      })
    );

  }

}
