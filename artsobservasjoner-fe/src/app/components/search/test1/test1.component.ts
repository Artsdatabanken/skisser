import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
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
  showActiveFiltersPane: boolean = false;
  sightings$: Observable<object[]>;
  array: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  toggledItems$: Observable<string[]>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private searchSearvice: SearchService
  ) { }

  ngOnInit(): void {

    this.sightings$ = this.searchSearvice.fetchData();

    //---------------------------------------------------------***

    this.toggledItems$ = this.searchSearvice.toggledItems$;

    //---------------------------------------------------------***

  }

  toggle(): void {
    this.isActive = !this.isActive;

    if (this.isActive === true) {
      this.renderer.addClass(this.document.body, 'prevent-scroll');
    }
    else {
      this.renderer.removeClass(this.document.body, 'prevent-scroll');
    }
  }

  close(): void {
    this.isActive = false;
    this.renderer.removeClass(this.document.body, 'prevent-scroll');
  }

  toggleBulk(event: any, index: number) {

    if (this.buttonClicked === index) this.buttonClicked = -1;
    else this.buttonClicked = index;

  }

  toggleActiveFilters(): void {
    this.showActiveFiltersPane = !this.showActiveFiltersPane;
  }

}
