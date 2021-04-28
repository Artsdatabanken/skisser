import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { TopObserver, TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';

@Component({
  selector: 'app-top-observers',
  templateUrl: './top-observers.component.html',
  styleUrls: ['./top-observers.component.scss']
})

export class TopObserversComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  userStatistics$: Observable<UserStatistics>;
  totalPages: number;
  speciesGroups$: Observable<Category[]>;
  selectedSpeciesGroup: number | null = null;
  PAGE_SIZE: number = 20;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private userStatisticsService: UserStatisticsService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {
    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(1, this.PAGE_SIZE);

    this.userStatisticsService.getTopUsersStatistics().subscribe(response => {
      this.totalPages = Math.trunc(response.totalCount / response.pageSize);
    });

  }

  onPageChange(event: number): void {
    console.log('event on change', event)
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(event, this.PAGE_SIZE, this.selectedSpeciesGroup);
  }

  onSpeciesGroupSelection(event: Event): void {
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(1, this.PAGE_SIZE, this.selectedSpeciesGroup);
    console.log('sg', event)
  }

}
