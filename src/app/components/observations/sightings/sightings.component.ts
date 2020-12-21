import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.scss']
})

export class SightingsComponent implements OnInit {

  isActive: boolean = false;
  display: string = 'card';

  @Input() location: string | null;
  @Input() take: number | null = 0;

  // fakeData
  marineMammals: any[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if (this.location === 'frontpage') {
      this.display = 'map';
    }

    this.getSightings();
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

  getSightings(): void {
    this.dataService.getSightings().subscribe(mm => {
      console.log('mm', mm)

      // or send this.take as a parameter so we don't get stuff from the server unnecessarily
      this.take === 0 ? this.marineMammals = mm : this.marineMammals = mm.slice(0, this.take);
    })
  }

}
