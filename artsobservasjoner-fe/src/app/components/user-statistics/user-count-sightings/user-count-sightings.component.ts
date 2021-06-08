import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, Subscription, forkJoin } from 'rxjs';
import { debounceTime, filter, map, retry, switchMap } from 'rxjs/operators';
import { Area, AREA_TYPE, Category } from 'src/app/models/shared';
import { TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { Taxon } from 'src/app/models/taxon';
import { AreasService } from 'src/app/services/areas.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TaxonService } from 'src/app/services/taxon.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Filters, PAGE_SIZE } from 'src/app/models/filter';
import { SelectedFilters } from 'src/app/models/filter';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-user-count-sightings',
  templateUrl: './user-count-sightings.component.html',
  styleUrls: ['./user-count-sightings.component.scss']
})

export class UserCountSightingsComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  subscriptions: Subscription[] = [];
  PAGE_SIZE = PAGE_SIZE;

  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  areaType: typeof AREA_TYPE = AREA_TYPE;

  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject(0);
  position: number;

  userStatistics$: Observable<UserStatistics>;
  filteredData$;


  constructor(
    private cdr: ChangeDetectorRef,
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private filterService: FilterService,
    private userStatisticsService: UserStatisticsService
  ) {

    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');
    this.currentLanguage$ = this.translationService.currentLanguage$;

  }

  ngOnInit(): void {

    this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE, null, null, null, null);

    this.filteredData$ = combineLatest([
      this.filterService.filters.year$,
      this.filterService.filters.speciesGroup$,
      this.filterService.filters.taxon$,
      this.filterService.filters.area$,
      this.pageNumber$
    ]).pipe(
      map(filters => ({
        year: filters[0],
        speciesGroup: filters[1],
        taxon: filters[2],
        area: filters[3],
        pageNumber: filters[4]
      })),
      debounceTime(0),
      map(filters => {

        // for (let filter in this.filters) { // hacky; må fikses
        //   if (this.filters[filter].getValue() !== null) {
        //     this.showResetButton = true;
        //   }
        // }

        return filters;

      }),
      switchMap(filters => this.userStatisticsService.getTopObservers(
        +filters.pageNumber,
        PAGE_SIZE,
        filters.year,
        filters.speciesGroup,
        filters.taxon,
        filters.area)),
      map((response: UserStatistics) => {

        this.totalPages$.next(Math.ceil(response.totalCount / PAGE_SIZE));

        return response;

      }),
    );

  }

  ngAfterContentChecked() {
    this.cdr.detectChanges(); // force recheck for changes
  }

  onPaginationClick(pageNumber: number): void {
    this.pageNumber$.next(pageNumber);
  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {
    return this.userStatisticsService.getPosition(index, pageNumber, pageSize);
  }

}
