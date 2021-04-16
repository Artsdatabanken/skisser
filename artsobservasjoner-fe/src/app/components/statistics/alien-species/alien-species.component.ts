import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssessedSpeciesItemStats, ASSESSMENT_CATEGORY_TYPES, VALIDATION_STATUS } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-alien-species',
  templateUrl: './alien-species.component.html',
  styleUrls: ['./alien-species.component.scss']
})

export class AlienSpeciesComponent implements OnInit {

  data$: Observable<Map<number, AssessedSpeciesItemStats[]>>;
  assessmentCategoryTypes: typeof ASSESSMENT_CATEGORY_TYPES = ASSESSMENT_CATEGORY_TYPES;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  currentLanguage$: Observable<string>;
  translationParamValue: string;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.translationService.currentLanguage$.subscribe(language => {
      language === 'no' ? this.translationParamValue = 'fremmede arter' : this.translationParamValue = 'alien species';
    });

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getData();

  }

  getData(): void {

    this.data$ = this.statisticsService.getAssessedSpeciesData(this.assessmentCategoryTypes.alienlist);

  }

}
