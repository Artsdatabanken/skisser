import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { DETAILED_SPECIES_LIST } from 'src/app/data/url';
import { PAGE_SIZE } from 'src/app/models/filter';
import { PaginatedStatistics } from 'src/app/models/statistics';
import { AreaService } from 'src/app/services/area.service';
import { FilterService } from 'src/app/services/filter.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { Location } from '@angular/common';
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
  filteredData$;

  taxonData$;

  buttonClicked: number;
  noArea: boolean = false;
  tableCaption: string;
  subscription: Subscription;
  subscriptions: Subscription[] = [];

  pathName: string;
  filters: any;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService,
    private speciesDataService: SpeciesDataService,
    private filterService: FilterService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_sightings_speciesData_speciesLists');
    this.pathName = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    this.getFilteredData();

  }

  // getFilteredData(): void {

  //   this.filteredData$ = combineLatest([
  //     this.filterService.filters.area$,
  //     this.filterService.filters.year$,
  //     this.filterService.filters.speciesGroup$,
  //     this.filterService.filters.taxon$,
  //     this.pageNumber$
  //   ]).pipe(
  //     map(filters => ({
  //       area: filters[0],
  //       year: filters[1],
  //       speciesGroup: filters[2],
  //       taxon: filters[3],
  //       pageNumber: filters[4]
  //     })),
  //     debounceTime(0),
  //     map(filters => {

  //       console.group('FILTERS', filters.area)

  //       return filters;

  //     }),

  //     switchMap(filters => {

  //       console.group('filter area', filters.area)

  //       if (filters.area !== null) {

  //         this.subscriptions.push(this.areaService.getAreaNameById(+filters.area).subscribe(
  //           area => {

  //             this.tableCaption = area;
  //             return this.tableCaption;

  //           })
  //         );

  //         this.areaName$ = this.areaService.getAreaNameById(+filters.area);
  //         this.location.go(this.pathName + '/' + filters.area);


  // this.location.go(this.pathName + '/' + filters.area);
  //         return this.speciesDataService.getSpeciesListByArea(
  //           +filters.pageNumber,
  //           PAGE_SIZE,
  //           filters.area,
  //           filters.year,
  //           filters.speciesGroup,
  //           filters.taxon,
  //         );

  //       }
  //       else {

  //         return of(null);

  //       }

  //     }),
  //     map((response: PaginatedStatistics) => {

  //       if (response !== null) {
  //         this.totalPages$.next(Math.ceil(response.totalCount / PAGE_SIZE));
  //       }
  //       else {
  //         this.totalPages$.next(0);
  //       }

  //       console.log('xxxx', response)

  //       return response;

  //     }),
  //   );


  // }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getFilteredData(): void {

    this.activatedRoute.params.subscribe(params => {

      this.area$ = this.areaService.getAreaById(parseInt(params.id, 10));
      this.filterService.updateArea(params.id);
      console.log('params', params)

    });

    this.filteredData$ = combineLatest([
      this.filterService.filters.area$,
      this.filterService.filters.year$,
      this.filterService.filters.speciesGroup$,
      this.filterService.filters.taxon$,
      this.pageNumber$
    ]).pipe(
      tap(data => console.log('START t1', data)),
      map(filters => ({
        area: filters[0],
        year: filters[1],
        speciesGroup: filters[2],
        taxon: filters[3],
        pageNumber: filters[4]
      })),
      tap(data => console.log('t2', data)),
      // map(filters => {
      //   console.group('FILTERS before switchmap', filters.area)

      //   this.location.replaceState(this.pathName + '/' + filters.area);
      //   //this.area$ = this.areaService.getAreaById(+filters.area);

      //   return filters;
      // }),      
      // tap(data => console.log('t3', data)),
      switchMap(filters => {

        this.filters = filters.area;

        this.subscriptions.push(
          this.areaService.getAreaById(+filters.area).subscribe(area => {
            this.tableCaption = area.name;
            this.area$ = of(area);
          })
        );

        if (filters.area !== null) {

          console.group('FILTERS after switchmap', filters.area)

          this.location.replaceState(this.pathName + '/' + filters.area);

          //this.area$ = this.areaService.getAreaById(+filters.area);

          return this.speciesDataService.getSpeciesListByArea(
            +filters.pageNumber,
            PAGE_SIZE,
            filters.area,
            filters.year,
            filters.speciesGroup,
            filters.taxon,
          );

        }
        else {

          return of(null);

        }

      }),
      tap(data => console.log('t3', data)),
      map((response: PaginatedStatistics) => {

        if (response !== null) {
          this.totalPages$.next(Math.ceil(response.totalCount / PAGE_SIZE));

        }
        else {
          this.totalPages$.next(0);
        }

        console.log('SLUTT', response)

        return response;

      }),
    );

  }

  toggle(event: any, index: number) {

    if (this.buttonClicked === index) this.buttonClicked = -1;
    else this.buttonClicked = index;

  }

  onPaginationClick(pageNumber: number): void {
    this.pageNumber$.next(pageNumber);
  }



}