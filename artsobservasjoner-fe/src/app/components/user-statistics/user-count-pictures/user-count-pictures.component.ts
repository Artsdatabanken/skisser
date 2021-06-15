import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { PAGE_SIZE } from 'src/app/models/filter';
import { AREA_TYPE } from 'src/app/models/shared';
import { TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { FilterService } from 'src/app/services/filter.service';
import { LayoutService } from 'src/app/services/layout.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';

@Component({
  selector: 'app-user-count-pictures',
  templateUrl: './user-count-pictures.component.html',
  styleUrls: ['./user-count-pictures.component.scss']
})

export class UserCountPicturesComponent implements OnInit {

  pageTitle$: Observable<string>;
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
    private filterService: FilterService,
    private userStatisticsService: UserStatisticsService
  ) {

    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topPhotographers');
   
  }

  ngOnInit(): void {

    this.userStatistics$ = this.userStatisticsService.getTopPhotographers(1, PAGE_SIZE, null, null, null, null);

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

        return filters;

      }),
      switchMap(filters => this.userStatisticsService.getTopPhotographers(
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
