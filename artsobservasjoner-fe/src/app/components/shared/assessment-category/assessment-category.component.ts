import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AssessmentCategory } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-assessment-category',
  templateUrl: './assessment-category.component.html',
  styleUrls: ['./assessment-category.component.scss']
})

export class AssessmentCategoryComponent implements OnInit {

  @Input() categoryVariant: string;
  categories$: Observable<AssessmentCategory[]>;
  currentLanguage: string = this.translate.currentLang;

  constructor(
    private statisticsService: StatisticsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.statisticsService.getAssessmentCategories(this.categoryVariant);

    this.translate.onLangChange.subscribe(l => {
      this.currentLanguage = l.lang;
    });
    
  }

}
