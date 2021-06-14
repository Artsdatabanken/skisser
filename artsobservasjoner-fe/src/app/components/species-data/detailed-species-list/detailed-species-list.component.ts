import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PAGE_SIZE } from 'src/app/models/filter';
import { Area } from 'src/app/models/shared';
import { AreaService } from 'src/app/services/area.service';
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
  totalPages$: Observable<number>;
  detailedData$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService,
    private speciesDataService: SpeciesDataService
  ) { }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.areaId = params['id'];

      this.detailedData$ = this.speciesDataService.getSpeciesListByArea(1, this.PAGE_SIZE, this.areaId);
      this.detailedData$.subscribe()

      this.areaName$ = this.areaService.getAreaNameById(+this.areaId);
    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
