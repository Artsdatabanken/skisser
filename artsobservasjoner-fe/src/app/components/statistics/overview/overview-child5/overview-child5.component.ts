import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-overview-child5',
  templateUrl: './overview-child5.component.html',
  styleUrls: ['./overview-child5.component.scss']
})

export class OverviewChild5Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
  
    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_5');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.data$ = this.statisticsService.getProjectsCount();
    
  }

}
