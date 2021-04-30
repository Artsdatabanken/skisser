import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

const PAGE_SIZE: number = 20;

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
  totalPages$: BehaviorSubject<number>;
  position: number;
  speciesGroups$: Observable<Category[]>;
  years: number[];


  selectedYear: number | null = null;
  selectedSpeciesGroup: number | null = null;
  selectedTaxon: number | null = null;
  selectedArea: number | null = null;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private utilitiesService: UtilitiesService,
    private userStatisticsService: UserStatisticsService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {

    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.years = this.utilitiesService.generateYears();
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(1, PAGE_SIZE);
    this.totalPages$ = this.userStatisticsService.totalPages$;

  }

  onPageChange(event: number): void {
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(event, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  onSpeciesGroupSelection(event: Event): void {
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  onYearSelection(event: Event): void {
    console.log('selected year', event)
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
 }

  getPosition(index: number, pageNumber: number, pageSize: number): number {

    const position: number = (pageNumber - 1) * pageSize + index + 1;
    return +position;

  }

}
