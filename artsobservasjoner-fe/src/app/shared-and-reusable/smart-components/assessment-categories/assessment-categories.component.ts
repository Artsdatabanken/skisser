import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssessmentCategory } from 'src/app/models/statistics';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-assessment-categories',
  templateUrl: './assessment-categories.component.html',
  styleUrls: ['./assessment-categories.component.scss']
})

export class AssessmentCategoriesComponent implements OnInit {

  @Input() categoryVariant: string | null;
  categories$: Observable<AssessmentCategory[]>;
  currentLanguage$: Observable<string> = this.translationService.currentLanguage$;

  constructor(
    private speciesService: SpeciesService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    if (this.categoryVariant !== null) {
      this.categories$ = this.speciesService.getAssessmentCategories(this.categoryVariant);
    }
    else {
      this.categories$ = null;
    }

  }

}
