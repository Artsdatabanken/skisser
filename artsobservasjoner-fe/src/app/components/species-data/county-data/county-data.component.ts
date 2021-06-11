import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from 'src/app/models/shared';
import { AreaService } from 'src/app/services/area.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';

@Component({
  selector: 'app-county-data',
  templateUrl: './county-data.component.html',
  styleUrls: ['./county-data.component.scss']
})

export class CountyDataComponent implements OnInit {

  pageTitle$: Observable<string>;
  speciesData$;

  constructor(
    private layoutService: LayoutService,
    private speciesDataService: SpeciesDataService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_sightings_speciesData_speciesLists_countyData');
  }

  ngOnInit(): void {
    this.speciesData$ = this.speciesDataService.getCountySpeciesCount(1, 100);
  }

}
