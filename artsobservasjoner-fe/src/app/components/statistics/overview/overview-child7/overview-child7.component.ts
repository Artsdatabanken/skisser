import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-overview-child7',
  templateUrl: './overview-child7.component.html',
  styleUrls: ['./overview-child7.component.scss']
})

export class OverviewChild7Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$:  Observable<string>;
  data$: Observable<object>;
  speciesGroups$: Observable<Category[]>;

  constructor(
    private layoutService: LayoutService,
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_7');
    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.speciesGroups$ = this.statisticsService.getSpeciesGroups();
    this.data$ = this.statisticsService.getSightingsGeographicalDistribution();

  }

}
