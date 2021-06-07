import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { Selected } from 'src/app/models/filter';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  years: number[];
  speciesGroups$: Observable<Category[]>;
  taxons$: Observable<Taxon[]>;
  areas$: Observable<Area[]>;

  userStatistics$: Observable<UserStatistics>;
  filteredData$;
  filters: Filters = new Filters();

  selected: Selected = new Selected();

  showTaxonPane: boolean = false;
  showAreaPane: boolean = false;
  showResetButton: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private areaService: AreasService,
    private taxonService: TaxonService,
    private utilitiesService: UtilitiesService,
    private userStatisticsService: UserStatisticsService
  ) {

    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');
    this.currentLanguage$ = this.translationService.currentLanguage$;

  }

  ngOnInit(): void {

    this.years = this.utilitiesService.generateYears();
    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE, null, null, null, null);

    // this.filteredData$ = combineLatest([
    //   this.filters.year$,
    //   this.filters.speciesGroup$,
    //   this.filters.taxon$,
    //   this.filters.area$,
    //   this.pageNumber$
    // ]).pipe(
    //   map(([year, speciesGroup, taxon, area, pageNumber]) => {

    //     console.log('F I L T E R S', year, speciesGroup, taxon, area, pageNumber);

    //     const filters: object[] = [];

    //     filters.push(
    //       { year: year },
    //       { speciesGroup: speciesGroup },
    //       { taxon: taxon },
    //       { area: area },
    //       { pageNumber: +pageNumber }
    //     )

    //     this.userStatistics$ = this.userStatisticsService.getTopObservers(+pageNumber, PAGE_SIZE, year, speciesGroup, taxon, area);

    //     return filters;

    //   })
    // );


    this.filteredData$ = combineLatest([
      this.filters.year$,
      this.filters.speciesGroup$,
      this.filters.taxon$,
      this.filters.area$,
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

        for (let filter in this.filters) { // hacky; må fikses
          if (this.filters[filter].getValue() !== null) {
            this.showResetButton = true;
          }

          //console.log(' F I L T E R S', this.filters[filter].getValue())
        }

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

  onYearSelection(year: string): void {

    this.filters.year$.next(year);
    this.selected.year = year;

  }

  onSpeciesGroupSelection(id: string): void {
    
    this.filters.speciesGroup$.next(id);
    this.selected.speciesGroup = id;

  }

  onTaxonSelection(taxon: Taxon): void {

    this.filters.taxon$.next(taxon.taxonId.toString());
    this.showTaxonPane = false;

    if (taxon.vernacularName) {
      this.selected.taxon = taxon.scientificName.name + ' - ' + taxon.vernacularName?.name;
    }
    else {
      this.selected.taxon = taxon.scientificName.name;
    }

  }

  onAreaSelection(id: string, name: string): void {

    this.filters.area$.next(id);
    this.showAreaPane = false;
    this.selected.area = name;

  }

  resetFilters(): void {

    for (let filter in this.filters) {
      this.filters[filter].next(null);
    }

    for (let property in this.selected) {
      this.selected[property] = null;
    }

    this.showTaxonPane = false;
    this.showAreaPane = false;
    this.showResetButton = false;

  }

  resetFilter(key: string): void {

    if (this.filters[`${key}$`] || typeof this.filters[`${key}$`] !== 'undefined') {
      this.filters[`${key}$`].next(null);
    }

    if (this.selected[key] || typeof this.selected[key] !== 'undefined') {
      this.selected[key] = null;
    }

    this.showTaxonPane = false;
    this.showAreaPane = false;

  }

  // ----------***

  getTaxon(searchString: string): void {
    if (searchString.length > 1) {
      this.taxons$ = this.taxonService.getTaxon(searchString);
      this.showTaxonPane = true;
    }
  }

  getArea(searchString: string): void {
    if (searchString.length > 1) {
      this.areas$ = this.areaService.getArea(searchString);
      this.showAreaPane = true;
    }
  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {
    return this.userStatisticsService.getPosition(index, pageNumber, pageSize);
  }

}
