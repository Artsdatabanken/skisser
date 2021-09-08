import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})

export class Test1Component implements OnInit {

  isActive: boolean = false;
  buttonClicked: number;
  sightings$: Observable<object[]>;
  array: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

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

  toggleBulk(event: any, index: number) {

    if (this.buttonClicked === index) this.buttonClicked = -1;
    else this.buttonClicked = index;

  }
  
}
