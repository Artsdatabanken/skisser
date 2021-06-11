import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-municipality-data',
  templateUrl: './municipality-data.component.html',
  styleUrls: ['./municipality-data.component.scss']
})

export class MunicipalityDataComponent implements OnInit {

  pageTitle$: Observable<string>;

  constructor(
    private layoutService: LayoutService,
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_sightings_speciesData_speciesLists_municipalityData');
  }

  ngOnInit(): void {
  }

}
