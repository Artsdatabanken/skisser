import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-taxon',
  templateUrl: './search-taxon.component.html',
  styleUrls: ['./search-taxon.component.scss']
})

export class SearchTaxonComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getTaxon('spekkhogger').subscribe();
  }

}
