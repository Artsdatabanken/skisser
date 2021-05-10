import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Taxon } from 'src/app/models/taxon';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-taxon',
  templateUrl: './search-taxon.component.html',
  styleUrls: ['./search-taxon.component.scss']
})

export class SearchTaxonComponent implements OnInit {

  taxons$: Observable<Taxon[]>;
  taxon: string | null = null;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getTaxon('meles').subscribe();
  }

  getTaxon(event: any): void {
    console.log('input', event);
    if (event.length > 2) {
      this.taxons$ = this.searchService.getTaxon(event);
    }
  }

}
