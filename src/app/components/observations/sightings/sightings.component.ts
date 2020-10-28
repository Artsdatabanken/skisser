import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.scss']
})

export class SightingsComponent implements OnInit {

  isActive: boolean = false;
  display: string = 'card';
  @Input() location: string | null;

  constructor() { }

  ngOnInit(): void { 
    if (this.location === 'frontpage') {
      this.display = 'map';
    }
  }

  getObservations() : void {
    
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
