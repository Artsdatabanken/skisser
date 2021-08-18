import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Area, AREA_TYPE } from 'src/app/models/shared';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';
import { DETAILED_SPECIES_LIST } from 'src/app/data/url';
import { AreaService } from 'src/app/services/area.service';
import { PaginatedStatistics } from 'src/app/models/statistics';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { SpeciesInventoryComponent } from '../../sightings-data/species-inventory/species-inventory.component';

@Component({
  selector: 'app-municipality-data',
  templateUrl: './municipality-data.component.html',
  styleUrls: ['./municipality-data.component.scss']
})

export class MunicipalityDataComponent implements OnInit {

  pageTitle$: Observable<string>;  

  constructor(
    private layoutService: LayoutService,
    private speciesDataService: SpeciesDataService,
    private areaService: AreaService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_sightings_speciesData_speciesLists_municipalityData');
  }

  ngOnInit(): void {

   
  }


}
