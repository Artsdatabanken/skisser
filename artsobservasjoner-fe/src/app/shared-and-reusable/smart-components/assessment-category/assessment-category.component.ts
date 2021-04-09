import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AssessmentCategory } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-assessment-category',
  templateUrl: './assessment-category.component.html',
  styleUrls: ['./assessment-category.component.scss']
})

export class AssessmentCategoryComponent implements OnInit {

  @Input() categoryVariant: string | null;
  categories$: Observable<AssessmentCategory[]>;
  currentLanguage$: Observable<string> = this.translationService.currentLanguage$;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    if (this.categoryVariant !== null) {
      this.categories$ = this.statisticsService.getAssessmentCategories(this.categoryVariant);
    }
    else {
      this.categories$ = null;
    }

  }

}
