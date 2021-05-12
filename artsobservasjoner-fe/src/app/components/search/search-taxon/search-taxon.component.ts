import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AREA_TYPE } from 'src/app/models/shared';
import { Taxon } from 'src/app/models/taxon';
import { CoreService } from 'src/app/services/core.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-taxon',
  templateUrl: './search-taxon.component.html',
  styleUrls: ['./search-taxon.component.scss']
})

export class SearchTaxonComponent implements OnInit {

  taxons$: Observable<Taxon[]>;
  taxon: string | null = null;
  areas$: Observable<object[]>;
  area: string | null = null;
  areaType: typeof AREA_TYPE = AREA_TYPE;

  constructor(
    private searchService: SearchService,
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    //this.taxons$ = this.searchService.getTaxon('spe');
  }

  getTaxon(event: any): void {
    console.log('input', event);
    if (event.length > 2) {
      this.taxons$ = this.searchService.getTaxon(event);
    }
  }

  getArea(event: any): void {
    console.log('input', event);
    if (event.length > 0) {
      this.areas$ = this.coreService.getArea(event);
    }
  }

}
