import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.scss']
})

export class SightingsComponent implements OnInit {

  sightings$: Observable<object[]>;

  constructor(private searchSearvice: SearchService) { }

  ngOnInit(): void {

    this.sightings$ = this.searchSearvice.fetchData();


  }

}
