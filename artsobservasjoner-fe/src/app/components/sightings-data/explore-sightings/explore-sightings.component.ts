import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore-sightings',
  templateUrl: './explore-sightings.component.html',
  styleUrls: ['./explore-sightings.component.scss']
})

export class ExploreSightingsComponent implements OnInit {

  isActive: boolean = false;
  display: string = 'card';

  @Input() location: string | null;
  @Input() take: number | null = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.location === 'frontpage') {
      this.display = 'map';
    }
  }

  getObservations(): void {

  }

  chooseDisplay(display: string): void {
    this.display = display;
  }

  getCssClass(keyword: string): string {

    if (this.display === keyword) {
      return 'button--active';
    }

  }

}
