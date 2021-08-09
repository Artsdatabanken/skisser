import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Area, AREA_TYPE } from 'src/app/models/shared';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';
import { DETAILED_SPECIES_LIST } from 'src/app/data/url';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-municipality-data',
  templateUrl: './municipality-data.component.html',
  styleUrls: ['./municipality-data.component.scss']
})

export class MunicipalityDataComponent implements OnInit {

  pageTitle$: Observable<string>;
  areaType: typeof AREA_TYPE = AREA_TYPE;
  speciesData$;

  municipalities$: Observable<Area[]>; 
  showMunicipalityPane: boolean = false;
  
  @ViewChild('municipality') municipalityInput: any;
  DETAILED_SPECIES_LIST_LINK = DETAILED_SPECIES_LIST;

  constructor(
    private layoutService: LayoutService,
    private speciesDataService: SpeciesDataService,
    private areaService: AreaService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_sightings_speciesData_speciesLists_municipalityData');
  }

  ngOnInit(): void {
    this.speciesData$ = this.speciesDataService.getAreaSpeciesCount(this.areaType.municipality, 1, 500);
  }

  getMunicipality(searchString: string): void {

    if (searchString.length > 1) {
      this.municipalities$ = this.areaService.getMunicipalitiesByString(searchString);
      this.showMunicipalityPane = true;
    }

  }

  onMunicipalitySelection(id: string, name: string): void {

    console.log('jhgdsjhgsdjfhsdf', id, name)

    this.showMunicipalityPane = false;

  }

  closeMunicipalityPane(pane: any): void {

    if (this.showMunicipalityPane) {
      this.municipalityInput.nativeElement.value = '';
      this.showMunicipalityPane = false;

      // here he have to reduce our original speciesdata to only show the city we chose
    }

  }


}
