import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { debounceTime, filter, map, mergeMap, share, shareReplay, switchMap } from 'rxjs/operators';
import { DETAILED_SPECIES_LIST } from 'src/app/data/url';
import { PAGE_SIZE } from 'src/app/models/filter';
import { PaginatedStatistics } from 'src/app/models/statistics';
import { AreaService } from 'src/app/services/area.service';
import { FilterService } from 'src/app/services/filter.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailed-species-list',
  templateUrl: './detailed-species-list.component.html',
  styleUrls: ['./detailed-species-list.component.scss']
})

export class DetailedSpeciesListComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  areaId: string;
  areaName$: Observable<string>;
  PAGE_SIZE = PAGE_SIZE;
  DETAILED_SPECIES_LIST_LINK = DETAILED_SPECIES_LIST;
  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject(0);
  filteredData$;
  data$;
  taxonData$;
  buttonClicked: number;
  noArea: boolean = false;
  tableCaption: string;
  subscriptions: Subscription[] = [];
  pathName: string;
  urlPathArray: string[];
  url: any;

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

    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {

      this.areaId = params.id;
      this.areaName$ = this.areaService.getAreaNameById(+this.areaId);
      this.filterService.filters.area$.next(this.areaId);

    }));

    this.activatedRoute.url.subscribe(url => console.log('url', url))

    //this.areaName$ = this.areaService.getAreaNameById(+window.location.pathname.split('/').pop());
    // this.filterService.filters.area$.next(window.location.pathname.split('/').pop());

    //console.log('TESSSSSTTTTTTT', window.location.pathname.split('/').pop())

    this.getFilteredData();

  }

  toggle(event: any, index: number, taxonId: number) {

    if (this.buttonClicked === index) this.buttonClicked = -1;
    else this.buttonClicked = index;

    // if (this.buttonClicked === index) {
    //   this.buttonClicked = -1;
    // }
    // else {
    //   this.buttonClicked = index;
    //   // hvis vi vil hente data kun on click
    //   //this.taxonData$ = this.taxonService.getTaxonData(taxonId);
    // }

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

  getFilteredData(): void {

    this.filteredData$ = combineLatest([
      this.filterService.filters.area$,
      this.filterService.filters.year$,
      this.filterService.filters.speciesGroup$,
      this.filterService.filters.taxon$,
      this.pageNumber$
    ]).pipe(
      map(filters => ({
        area: filters[0],
        year: filters[1],
        speciesGroup: filters[2],
        taxon: filters[3],
        pageNumber: filters[4]
      })),
      //debounceTime(0),
      map(filters => {

        console.group('FILTERS AREA', filters.area)

        return filters;

      }),

      switchMap(filters => {

        console.group('filter area', filters.area)

        if (filters.area !== null) {

          this.subscriptions.push(this.areaService.getAreaNameById(+filters.area).subscribe(
            area => {

              this.tableCaption = area;
              return this.tableCaption;

            })
          );

          this.location.go(this.pathName + '/' + filters.area);

          //this.router.navigate([this.DETAILED_SPECIES_LIST_LINK, filters.area]);

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
      map((response: PaginatedStatistics) => {

        if (response !== null) {
          this.totalPages$.next(Math.ceil(response.totalCount / PAGE_SIZE));
        }
        else {
          this.totalPages$.next(0);
        }

        console.log('xxxx', response)

        return response;

      }),
    );


  }

  onPaginationClick(pageNumber: number): void {
    this.pageNumber$.next(pageNumber);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
