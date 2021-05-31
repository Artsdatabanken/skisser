import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
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

const PAGE_SIZE: number = 20;

@Component({
  selector: 'app-user-count-pictures',
  templateUrl: './user-count-pictures.component.html',
  styleUrls: ['./user-count-pictures.component.scss']
})

export class UserCountPicturesComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  totalPages$: BehaviorSubject<number>;
  position: number;

  years: number[];
  speciesGroups$: Observable<Category[]>;
  taxons$: Observable<Taxon[]>;
  areas$: Observable<Area[]>;
  areaType: typeof AREA_TYPE = AREA_TYPE;

  userStatistics$: Observable<UserStatistics>;
  filters$: Observable<object[]>;

  filterPage$: BehaviorSubject<number> = new BehaviorSubject(1);
  filterYear$: BehaviorSubject<string> = new BehaviorSubject(null);
  filterSpeciesGroup$: BehaviorSubject<string> = new BehaviorSubject(null);
  filterTaxon$: BehaviorSubject<string> = new BehaviorSubject(null);
  filterArea$: BehaviorSubject<string> = new BehaviorSubject(null);

  activeTaxon: boolean;
  activeArea: boolean;

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

        console.log('filters', filters)
        return filters;

      })
    );

    this.filters$.subscribe();

  }

  onPaginationClick(event: number): void {
    this.filterPage$.next(event);
  }

  onYearSelection(event: string): void {
    this.filterYear$.next(event);
  }

  onSpeciesGroupSelection(event: string): void {
    this.filterSpeciesGroup$.next(event);
  }

  onTaxonSelection(event: string): void {
    console.log('taxon', event);
    this.filterTaxon$.next(event);
    this.activeTaxon = true;
  }

  onAreaSelection(event: string): void {
    this.filterArea$.next(event);
    this.activeArea = true;
  }

  getTaxon(event: any): void {
    console.log('taxon', event);
    if (event.length > 2) {
      this.taxons$ = this.taxonService.getTaxon(event);
      this.activeTaxon = false;
    }
  }

  getArea(event: any): void {
    if (event.length > 0) {
      this.areas$ = this.areaService.getArea(event);
      this.activeArea = false;
    }
  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {
    return this.userStatisticsService.getPosition(index, pageNumber, pageSize);
  }


}