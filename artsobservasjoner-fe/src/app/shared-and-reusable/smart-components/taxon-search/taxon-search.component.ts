import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Taxon } from 'src/app/models/taxon';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-taxon-search',
  templateUrl: './taxon-search.component.html',
  styleUrls: ['./taxon-search.component.scss']
})

export class TaxonSearchComponent implements OnInit {

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
