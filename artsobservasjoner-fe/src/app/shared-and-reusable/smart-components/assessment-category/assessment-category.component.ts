import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssessmentCategory } from 'src/app/models/statistics';
import { SpeciesService } from 'src/app/services/species.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-assessment-category',
  templateUrl: './assessment-category.component.html',
  styleUrls: ['./assessment-category.component.scss']
})

export class AssessmentCategoryComponent implements OnInit {

  @Input() categoryVariant: string | null;
  @Input() assessmentCategoryId: number;
  assessmentCategoryLabel$: Observable<string>;

  constructor(
    private speciesService: SpeciesService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.assessmentCategoryLabel$ = combineLatest([
      this.translationService.currentLanguage$,
      this.speciesService.getAssessmentCategories(this.categoryVariant)
    ]).pipe(
      map(([currentLanguage, assessmentCategories]) => {

        const assessmentCategoryObject: AssessmentCategory = assessmentCategories.find(sg => sg.id == this.assessmentCategoryId);

        let result: string = '';

        if (assessmentCategoryObject) {
          if (currentLanguage == 'no') result = assessmentCategoryObject.no;
          if (currentLanguage == 'en') result = assessmentCategoryObject.en;
        }

        return result;

      })
    );

  }

}
