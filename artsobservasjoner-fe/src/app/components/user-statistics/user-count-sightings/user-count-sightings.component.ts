import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
import { PAGE_SIZE } from 'src/app/models/filter';
import { Selected } from 'src/app/models/filter';

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

  totalPages$: BehaviorSubject<number>;
  position: number;

  years: number[];
  speciesGroups$: Observable<Category[]>;
  taxons$: Observable<Taxon[]>;
  areas$: Observable<Area[]>;

  userStatistics$: Observable<UserStatistics>;
  filters$: Observable<object[]>;

  filterPage$: BehaviorSubject<number> = new BehaviorSubject(1);
  filterYear$: BehaviorSubject<string> = new BehaviorSubject(null);
  filterSpeciesGroup$: BehaviorSubject<string> = new BehaviorSubject(null);
  filterTaxon$: BehaviorSubject<string> = new BehaviorSubject(null);
  filterArea$: BehaviorSubject<string> = new BehaviorSubject(null);

  showTaxonPane: boolean = false;
  showAreaPane: boolean = false;

  activeYear$: BehaviorSubject<string> = new BehaviorSubject(null);
  activeSpeciesGroup$: BehaviorSubject<string> = new BehaviorSubject(null);
  activeTaxon$: BehaviorSubject<object> = new BehaviorSubject(null);
  activeArea$: BehaviorSubject<string> = new BehaviorSubject(null);

  selectedYear: string | null = null;
  selectedSpeciesGroup: string | null = null;
  selectedTaxon: string | null = null;
  selectedArea: string | null = null;

  selected: Selected = new Selected();

  constructor(
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
    this.totalPages$ = this.userStatisticsService.totalPages$;

    this.getStatistics();

    this.filters$.subscribe();

    console.log('selected shit', this.selected)

  }

  getStatistics(): void {

    this.filters$ = combineLatest([
      this.filterYear$,
      this.filterSpeciesGroup$,
      this.filterTaxon$,
      this.filterArea$,
      this.filterPage$
    ]).pipe(
      map(([year, speciesGroup, taxon, area, pageNumber]) => {

        const filters: object[] = [];

        filters.push(
          { year: year },
          { speciesGroup: speciesGroup },
          { taxon: taxon },
          { area: area },
          { pageNumber: +pageNumber }
        )

        const tempUserStatistics$: Observable<UserStatistics> = this.userStatisticsService.getTopObservers(+pageNumber, PAGE_SIZE, year, speciesGroup, taxon, area);

        this.userStatistics$ = tempUserStatistics$;

        //console.log('filters', filters)
        return filters;

      })
    );

  }

  onPaginationClick(pageNumber: number): void {
    this.filterPage$.next(pageNumber);
  }

  onYearSelection(year: string): void {
    this.filterYear$.next(year);
    // this.selectedYear = year;
    this.selected.selectedYear = year;
  }

  onSpeciesGroupSelection(id: string): void {
    this.filterSpeciesGroup$.next(id);
    // this.selectedSpeciesGroup = id;
    this.selected.selectedSpeciesGroup = id;
  }

  onTaxonSelection(taxon: Taxon): void {

    this.filterTaxon$.next(taxon.taxonId.toString());
    this.showTaxonPane = false;

    if (taxon.vernacularName) {
      // this.selectedTaxon = taxon.scientificName.name + ' - ' + taxon.vernacularName?.name;
      this.selected.selectedTaxon = taxon.scientificName.name + ' - ' + taxon.vernacularName?.name;
    }
    else {
      // this.selectedTaxon = taxon.scientificName.name;
      this.selected.selectedTaxon = taxon.scientificName.name;
    }

  }

  onAreaSelection(id: string, name: string): void {
    this.filterArea$.next(id);
    this.showAreaPane = false;
    // this.selectedArea = name;
    this.selected.selectedArea = name;
  }

  resetFilters(): void {
    this.filterYear$.next(null);
    this.filterSpeciesGroup$.next(null);
    this.filterTaxon$.next(null);
    this.filterArea$.next(null);

    for (let property in this.selected) {
      console.log(`key= ${property} value = ${this.selected[property]}`)

      this.selected[property] = null;
    }

    this.showTaxonPane = false;
    this.showAreaPane = false;
  }

  resetYear(): void {
    this.filterYear$.next(null);
    // this.selectedYear = null;
    this.selected.selectedYear = null;
    this.getStatistics();
  }

  resetSpeciesGroup(): void {
    this.filterSpeciesGroup$.next(null);
    // this.selectedSpeciesGroup = null;
    this.selected.selectedSpeciesGroup = null;
    this.getStatistics();
  }

  resetTaxon(): void {
    this.filterTaxon$.next(null);
    // this.selectedTaxon = null;
    this.selected.selectedTaxon = null;
    this.showTaxonPane = false;
    this.getStatistics();
  }

  resetArea(): void {
    this.filterArea$.next(null);
    // this.selectedArea = null;
    this.selected.selectedArea = null;
    this.showAreaPane = false;
    this.getStatistics();
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

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(subscription => subscription.unsubscribe());
  // }

}
