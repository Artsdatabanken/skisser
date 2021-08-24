import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filters, PAGE_SIZE } from 'src/app/models/filter';
import { AreaService } from 'src/app/services/area.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';

@Component({
  selector: 'app-species-data-table',
  templateUrl: './species-data-table.component.html',
  styleUrls: ['./species-data-table.component.scss']
})

export class SpeciesDataTableComponent implements OnInit {

  @Input() filters: any;
  filteredData$;
  PAGE_SIZE = PAGE_SIZE;
  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject(0);
  buttonClicked: number;
  tableCaption: string;

  constructor(
    private areaService: AreaService,
    private speciesDataService: SpeciesDataService
  ) { }

  ngOnInit(): void {

    console.log('child', this.filters)

    this.pageNumber$.next(this.filters.pageNumber);
    this.areaService.getAreaNameById(+this.filters.area).subscribe(area => this.tableCaption = area);

    this.filteredData$ = this.speciesDataService.getSpeciesListByArea(
      +this.filters.pageNumber,
      PAGE_SIZE,
      this.filters.area,
      this.filters.year,
      this.filters.speciesGroup,
      this.filters.taxon,
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
