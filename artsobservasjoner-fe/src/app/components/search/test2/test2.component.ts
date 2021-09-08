import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})

export class Test2Component implements OnInit {

  isActive: boolean = false;
  sightings$: Observable<object[]>;

  constructor(private searchSearvice: SearchService) { }

  ngOnInit(): void {

    this.sightings$ = this.searchSearvice.fetchData();

  }

  toggle(): void {
    this.isActive = !this.isActive;
  }

  close(): void {
    this.isActive = false;
  }

}
