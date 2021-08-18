import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DETAILED_SPECIES_LIST } from 'src/app/data/url';
import { AREA_TYPE, Area } from 'src/app/models/shared';
import { PaginatedStatistics } from 'src/app/models/statistics';
import { AreaService } from 'src/app/services/area.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesDataService } from 'src/app/services/species-data.service';

@Component({
  selector: 'app-municipalities',
  templateUrl: './municipalities.component.html',
  styleUrls: ['./municipalities.component.scss']
})

export class MunicipalitiesComponent implements OnInit {

  pageTitle$: Observable<string>;
  areaType: typeof AREA_TYPE = AREA_TYPE;
  speciesData$: Observable<PaginatedStatistics>;
  data$: Observable<PaginatedStatistics>;

  municipalities$: Observable<Area[]>;
  municipality$: BehaviorSubject<any> = new BehaviorSubject(null);
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
    this.data$ = this.speciesData$;

  }

  getMunicipality(searchString: string): void {

    if (searchString.length > 1) {
      this.municipalities$ = this.areaService.getMunicipalitiesByString(searchString);
      this.showMunicipalityPane = true;
    }

  }

  onMunicipalitySelection(id: string, name: string): void {

    this.municipality$.next(id);

    this.data$ = combineLatest([
      this.municipality$,
      this.speciesData$
    ]).pipe(
      map(([municipalityId, speciesData]) => {

        let paginatedStatistics: PaginatedStatistics;
        const newData: any = speciesData.results.filter(municipality => municipality['areaId'] == municipalityId);

        paginatedStatistics = {
          pageNumber: speciesData.pageNumber,
          pageSize: speciesData.pageSize,
          results: newData,
          totalCount: 1
        }

        return paginatedStatistics;

      })
    );

    this.showMunicipalityPane = false;

  }

  closeMunicipalityPane(pane: any): void {

    if (this.showMunicipalityPane) {
      this.municipalityInput.nativeElement.value = '';
      this.showMunicipalityPane = false;

      // here he have to reduce our original speciesdata to only show the city we chose
    }

  }

  resetFilter(): void {
    this.municipality$.next(null);
    this.data$ = this.speciesData$;
  }
}
