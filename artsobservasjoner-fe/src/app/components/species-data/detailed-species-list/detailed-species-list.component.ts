import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { debounceTime, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { DETAILED_SPECIES_LIST } from 'src/app/data/url';
import { PAGE_SIZE } from 'src/app/models/filter';
import { Area } from 'src/app/models/shared';
import { PaginatedStatistics } from 'src/app/models/statistics';
import { AreaService } from 'src/app/services/area.service';
import { FilterService } from 'src/app/services/filter.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';

@Component({
  selector: 'app-detailed-species-list',
  templateUrl: './detailed-species-list.component.html',
  styleUrls: ['./detailed-species-list.component.scss']
})

export class DetailedSpeciesListComponent implements OnInit {

  subscription: Subscription;
  areaId: string;
  areaName$: Observable<string>;
  PAGE_SIZE = PAGE_SIZE;
  DETAILED_SPECIES_LIST_LINK = DETAILED_SPECIES_LIST;
  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject(0);
  filteredData$;
  taxonData$;
  buttonClicked: number;
  noArea: boolean = false;
  tableCaption: string;
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService,
    private speciesDataService: SpeciesDataService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {

    // this.subscription = this.activatedRoute.params.subscribe(params => {

    //   this.areaId = params['id'];
    //   this.areaName$ = this.areaService.getAreaNameById(+this.areaId);
    //   this.filterService.filters.area$.next(this.areaId);

    // });


    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {

      this.areaId = params['id'];
      this.areaName$ = this.areaService.getAreaNameById(+this.areaId);
      this.filterService.filters.area$.next(this.areaId);

    }));

    this.getFilteredData();

  }

  toggle(event: any, index: number, taxonId: number) {

    // if (this.buttonClicked === index) this.buttonClicked = -1;
    // else this.buttonClicked = index;

    if (this.buttonClicked === index) {
      this.buttonClicked = -1;
    }
    else {
      this.buttonClicked = index;
      //this.taxonData$ = this.taxonService.getTaxonData(taxonId);
    }


  }

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
      debounceTime(0),
      map(filters => {

        // console.group('filters', filters)

        return filters;

      }),

      mergeMap(filters => {

        if (filters.area !== null) {

          this.subscriptions.push(this.areaService.getAreaNameById(+filters.area).subscribe(
            area => {

              this.tableCaption = area;
              return this.tableCaption;

            })
          );

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


        // return this.speciesDataService.getSpeciesListByArea(
        //   +filters.pageNumber,
        //   PAGE_SIZE, 
        //   filters.area,
        //   filters.year,
        //   filters.speciesGroup,
        //   filters.taxon,
        // );

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
    // this.subscription.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
