import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Area, AREA_TYPE, Category } from 'src/app/models/shared';
import { TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { CoreService } from 'src/app/services/core.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

const PAGE_SIZE: number = 20;

export interface Filter {
  pagination?: number;
  bySpeciesGroup?: number;
  byYear?: number;
  byTaxon?: number;
  byArea?: number;
}

@Component({
  selector: 'app-user-count-sightings',
  templateUrl: './user-count-sightings.component.html',
  styleUrls: ['./user-count-sightings.component.scss']
})

export class UserCountSightingsComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  userStatistics$: Observable<UserStatistics>;
  totalPages$: BehaviorSubject<number>;
  position: number;
  speciesGroups$: Observable<Category[]>;
  years: number[];
  areas$: Observable<Area[]>;
  areaType: typeof AREA_TYPE = AREA_TYPE;

  // selectedYear: number | null = null;
  // selectedSpeciesGroup: number | null = null;
  // selectedTaxon: number | null = null;
  // selectedArea: number;

  filter: Filter;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private utilitiesService: UtilitiesService,
    private coreService: CoreService,
    private userStatisticsService: UserStatisticsService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    
    //this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE);
  }

  ngOnInit(): void {

    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.years = this.utilitiesService.generateYears();
    // this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE);
    this.totalPages$ = this.userStatisticsService.totalPages$;

    this.updateFilter(1, null, null, null, null);

  }

  updateFilter(
    paginationFilter: number | null,
    yearFilter: number | null,
    speciesGroupFilter: number | null,
    taxonFilter: number | null,
    areaFilter: number | null
  ): void {

    this.filter = {
      pagination: paginationFilter,
      byYear: yearFilter,
      bySpeciesGroup: speciesGroupFilter,
      byTaxon: taxonFilter,
      byArea: areaFilter
    }

    this.userStatistics$ = this.userStatisticsService.getTopObservers(
      this.filter.pagination,
      PAGE_SIZE,
      this.filter.byYear,
      this.filter.bySpeciesGroup,
      null,
      this.filter.byArea
    );

  }

  onPaginationClick(event: number): void {
    this.updateFilter(event, null, null, null, null);
  }

  onYearSelection(event: number): void {
    console.log('year', event)
    this.updateFilter(null, event, null, null, null);
  }

  onSpeciesGroupSelection(event: number): void {
    console.log('species group', event)
    this.updateFilter(null, null, event, null, null);
  }

  onAreaSelection(event: number): void {
    console.log('area', event);
    this.updateFilter(null, null, null, null, event);
  }

  getArea(event: any): void {
    if (event.length > 0) {
      this.areas$ = this.coreService.getArea(event);
    }
  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {
    return this.userStatisticsService.getPosition(index, pageNumber, pageSize);
  }

}
