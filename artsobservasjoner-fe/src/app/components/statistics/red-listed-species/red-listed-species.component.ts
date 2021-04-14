import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ASSESSMENT_CATEGORY_TYPES, VALIDATION_STATUS } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-red-listed-species',
  templateUrl: './red-listed-species.component.html',
  styleUrls: ['./red-listed-species.component.scss']
})

export class RedListedSpeciesComponent implements OnInit {

  currentLanguage$: Observable<string>;  
  data$;
  assessmentCategoryTypes: typeof ASSESSMENT_CATEGORY_TYPES = ASSESSMENT_CATEGORY_TYPES;
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  translationParamValue: string;
  value: string;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.translationService.currentLanguage$.subscribe(language => {
      language === 'no' ? this.translationParamValue = 'rødlistede arter' : this.translationParamValue = 'redlisted species';
    });

    this.currentLanguage$ = this.translationService.currentLanguage$;
      this.getData();

  }

  getData(): void {

    this.data$ = this.statisticsService.getAssessedSpeciesData(this.assessmentCategoryTypes.redlist);
    // this.data$ = this.statisticsService.getAssessedSpeciesStatistics(this.assessmentCategoryTypes.redlist);

  }

}


