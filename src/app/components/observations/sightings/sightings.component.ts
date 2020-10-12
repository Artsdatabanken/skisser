import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.scss']
})

export class SightingsComponent implements OnInit {

  display: string = 'card';

  constructor() { }

  ngOnInit(): void { }

  chooseDisplay(display: string): void {
    this.display = display;
    console.log('display', display)
  }


}
