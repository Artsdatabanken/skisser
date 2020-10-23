import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.scss']
})

export class SightingsComponent implements OnInit {

  display: string = 'table';
  isActive: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  chooseDisplay(display: string): void {
    this.display = display;
    console.log('display')
  }

  getCssClass(keyword: string): string {

    if (this.display === keyword) {
      return 'button--active';
    }

  }

}
