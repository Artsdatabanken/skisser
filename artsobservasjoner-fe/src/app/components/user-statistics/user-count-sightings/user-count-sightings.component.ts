import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { AREA_TYPE } from 'src/app/models/shared';
import { TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';
import { PAGE_SIZE } from 'src/app/models/filter';
import { FilterService } from 'src/app/services/filter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-count-sightings',
  templateUrl: './user-count-sightings.component.html',
  styleUrls: ['./user-count-sightings.component.scss']
})

export class UserCountSightingsComponent implements OnInit {

  pageTitle$: Observable<string>;
  subscriptions: Subscription[] = [];
  PAGE_SIZE = PAGE_SIZE;

  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  areaType: typeof AREA_TYPE = AREA_TYPE;

  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject(0);
  position: number;
  pageRouteId: string;

  filteredData$;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private filterService: FilterService,
    private userStatisticsService: UserStatisticsService
  ) {

    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');

  }

  ngOnInit(): void {

    this.pageRouteId = this.route.snapshot.data['id'];

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
