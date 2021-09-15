import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DETAILED_SPECIES_LIST } from 'src/app/data/url';
import { PAGE_SIZE } from 'src/app/models/filter';
import { PaginatedStatistics } from 'src/app/models/statistics';
import { AreaService } from 'src/app/services/area.service';
import { FilterService } from 'src/app/services/filter.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { Area } from 'src/app/models/shared';

@Component({
  selector: 'app-detailed-species-list',
  templateUrl: './detailed-species-list.component.html',
  styleUrls: ['./detailed-species-list.component.scss']
})

export class DetailedSpeciesListComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  area$: Observable<Area>;
  PAGE_SIZE = PAGE_SIZE;
  DETAILED_SPECIES_LIST_LINK = DETAILED_SPECIES_LIST;
  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject(0);
  totalPages: number = 0;
  filteredData$: Observable<PaginatedStatistics>;
  buttonClicked: number;
  noArea: boolean = false;
  tableCaption: string;
  subscriptions: Subscription[] = [];

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService,
    private speciesDataService: SpeciesDataService,
    private filterService: FilterService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_sightings_speciesData_speciesLists_detailedSpeciesList');

    this.subscriptions.push(this.activatedRoute.queryParams.subscribe(params => {

      console.log('params AREA', params.areaId)
      console.log('params YEAR', params.year)
      console.log('params SP GROUP', params.speciesGroupId)
      console.log('params TAXON', params.taxonId)
      console.log('\n', '\n', '\n', '\n', '\n')

      if (params.areaId) {
        this.area$ = this.areaService.getAreaById(+params.areaId);
        this.filterService.updateArea(params.areaId);
      }

      if (params.year !== undefined) this.filterService.updateYear(params.year);
      if (params.speciesGroupId !== undefined) this.filterService.updateSpeciesGroup(params.speciesGroupId);
      if (params.taxonId !== undefined) this.filterService.updateTaxon(params.taxonId);

    }));

    this.getFilteredData();

  }

  getFilteredData(): void {

    this.filteredData$ = combineLatest([
      this.filterService.filters.area$,
      this.filterService.filters.year$,
      this.filterService.filters.speciesGroup$,
      this.filterService.filters.taxon$,
      this.pageNumber$
    ]).pipe(
      tap(data => console.log('START >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data)),
      map(filters => ({
        area: filters[0],
        year: filters[1],
        speciesGroup: filters[2],
        taxon: filters[3],
        pageNumber: filters[4]
      })),
      tap(data => console.log('before switchmap t2', data)),
      switchMap(filters => {

        this.subscriptions.push(
          this.areaService.getAreaById(+filters.area).subscribe(area => {
            this.tableCaption = area.name;
            this.area$ = of(area);
          })
        );

        if (filters.area !== null) {

          const data$: Observable<PaginatedStatistics> = this.speciesDataService.getSpeciesListByArea(
            +filters.pageNumber,
            PAGE_SIZE,
            filters.area,
            filters.year,
            filters.speciesGroup,
            filters.taxon,
          );

          this.router.navigate(
            [],
            {
              relativeTo: this.activatedRoute,
              queryParams: {
                areaId: filters.area,
                year: filters.year,
                speciesGroupId: filters.speciesGroup,
                taxonId: filters.taxon
              },
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            }
          );

          return data$;

        }
        else {

          this.router.navigate(
            [],
            {
              relativeTo: this.activatedRoute,
              queryParams: {
                areaId: null,
                year: null,
                speciesGroupId: null,
                taxonId: null
              },
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            });

          return of(null);

        }

      }),
      tap(data => console.log('after switchmap t3', data)),
      map((response: PaginatedStatistics) => {

        if (response !== null) {
          this.totalPages$.next(Math.ceil(response.totalCount / PAGE_SIZE));
          this.totalPages = Math.ceil(response.totalCount / PAGE_SIZE);

        }
        else {
          this.totalPages$.next(0);
          this.totalPages = 0;
        }

        return response;

      }),
      tap(data => console.log('SLUTT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data, '\n', '\n', '\n', '\n', '\n',))
    );

  }

  toggle(event: any, index: number) {

    if (this.buttonClicked === index) this.buttonClicked = -1;
    else this.buttonClicked = index;

  }

  onPaginationClick(pageNumber: number): void {
    this.pageNumber$.next(pageNumber);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}