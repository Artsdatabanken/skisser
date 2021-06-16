import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
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
  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject(0);
  detailedData$;
  filteredData$;
  buttonClicked: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService,
    private speciesDataService: SpeciesDataService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.areaId = params['id'];

      // this.detailedData$ = this.speciesDataService.getSpeciesListByArea(1, this.PAGE_SIZE, this.areaId);
      // this.detailedData$.subscribe()

      this.areaName$ = this.areaService.getAreaNameById(+this.areaId);
      this.getFilteredData(this.areaId);

    });

  }

  toggle(event: any, index: number) {

    if (this.buttonClicked === index) this.buttonClicked = -1;
    else this.buttonClicked = index;

  }

  getFilteredData(areaId: string) {

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

        console.group('filters', filters)

        return filters;

      }),

      switchMap(filters => {

        console.group('areaId', areaId)

        let area: string;
        
        if (filters.area === null) {
          area = areaId;
        }
        else {
          area = filters.area;
        }

        return this.speciesDataService.getSpeciesListByArea(
          +filters.pageNumber,
          PAGE_SIZE,
          area,
          filters.year,
          filters.speciesGroup,
          filters.taxon,
        );

      }),
      map((response: PaginatedStatistics) => {

        this.totalPages$.next(Math.ceil(response.totalCount / PAGE_SIZE));

        return response;

      }),
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
