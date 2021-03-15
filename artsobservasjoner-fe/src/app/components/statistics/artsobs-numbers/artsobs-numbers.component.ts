import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TOTAL_COUNT_STATISTICS } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artsobs-numbers',
  templateUrl: './artsobs-numbers.component.html',
  styleUrls: ['./artsobs-numbers.component.scss']
})

export class ArtsobsNumbersComponent implements OnInit {

  totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  data$;
  currentLanguage$: Observable<string>;

  constructor(
    private translationService: TranslationService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void { 
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

}
