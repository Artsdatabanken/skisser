import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TOTAL_COUNT_STATISTICS } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-overview-child4',
  templateUrl: './overview-child4.component.html',
  styleUrls: ['./overview-child4.component.scss']
})

export class OverviewChild4Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_4');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    
  }
}
