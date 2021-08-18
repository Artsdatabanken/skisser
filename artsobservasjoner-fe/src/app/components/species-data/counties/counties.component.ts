import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DETAILED_SPECIES_LIST } from 'src/app/data/url';
import { AREA_TYPE } from 'src/app/models/shared';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';

@Component({
  selector: 'app-counties',
  templateUrl: './counties.component.html',
  styleUrls: ['./counties.component.scss']
})

export class CountiesComponent implements OnInit {

  pageTitle$: Observable<string>;
  speciesData$;  
  areaType: typeof AREA_TYPE = AREA_TYPE;
  DETAILED_SPECIES_LIST_LINK = DETAILED_SPECIES_LIST;

  constructor(
    private layoutService: LayoutService,
    private speciesDataService: SpeciesDataService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_sightings_speciesData_speciesLists_countyData');
  }

  ngOnInit(): void {
    this.speciesData$ = this.speciesDataService.getAreaSpeciesCount(this.areaType.county, 1, 100);
  }

}
