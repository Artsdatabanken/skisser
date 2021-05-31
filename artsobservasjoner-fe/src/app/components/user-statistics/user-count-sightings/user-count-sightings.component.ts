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

const PAGE_SIZE: number = 20;

@Component({
  selector: 'app-user-count-sightings',
  templateUrl: './user-count-sightings.component.html',
  styleUrls: ['./user-count-sightings.component.scss']
})

export class UserCountSightingsComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  totalPages$: BehaviorSubject<number>;
  position: number;

  subscriptions: Subscription[] = [];

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

  showTaxonPane: boolean;
  showAreaPane: boolean;

  activeYear$: BehaviorSubject<string> = new BehaviorSubject(null);
  activeSpeciesGroup$: BehaviorSubject<string> = new BehaviorSubject(null);
  activeTaxon$: BehaviorSubject<object> = new BehaviorSubject(null);
  activeArea$: BehaviorSubject<string> = new BehaviorSubject(null);

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

        //console.log('filters', filters)
        return filters;

      })
    );

    this.filters$.subscribe();

  }

  onPaginationClick(pageNumber: number): void {
    this.filterPage$.next(pageNumber);
  }

  onYearSelection(year: string): void {
    this.filterYear$.next(year);
    this.activeYear$ = this.filterYear$;
  }

  onSpeciesGroupSelection(id: string): void {
    this.filterSpeciesGroup$.next(id);

    this.activeSpeciesGroup$ = this.filterSpeciesGroup$;

    this.activeSpeciesGroup$.subscribe(sg => console.log('sg', sg))
    // this.subscriptions.push(
    //   this.speciesService.getSpeciesGroupById(+id).subscribe(sg => {
    //     this.activeSpeciesGroup$.next(sg);
    //   })
    // );

  }

  onTaxonSelection(taxon: Taxon): void {

    this.filterTaxon$.next(taxon.taxonId.toString());
    this.showTaxonPane = true;
    this.activeTaxon$.next({ scientificName: taxon.scientificName.name, vernacularName: taxon.vernacularName?.name });

    this.activeTaxon$.subscribe(r => console.log('taxon', r))

  }

  onAreaSelection(id: string, name: string): void {
    this.filterArea$.next(id);
    this.showAreaPane = true;
    this.activeArea$.next(name);
  }

  getTaxon(searchString: string): void {
    if (searchString.length > 2) {
      this.taxons$ = this.taxonService.getTaxon(searchString);
      this.showTaxonPane = false;
    }
  }

  getArea(searchString: string): void {
    if (searchString.length > 0) {
      this.areas$ = this.areaService.getArea(searchString);
      this.showAreaPane = false;
    }
  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {
    return this.userStatisticsService.getPosition(index, pageNumber, pageSize);
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(subscription => subscription.unsubscribe());
  // }

}
