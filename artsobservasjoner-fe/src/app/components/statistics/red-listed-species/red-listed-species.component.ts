import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-red-listed-species',
  templateUrl: './red-listed-species.component.html',
  styleUrls: ['./red-listed-species.component.scss']
})

export class RedListedSpeciesComponent implements OnInit {

  redlistedSpeciesData$: Observable<any[]>;
  redlistedCategories$: Observable<any[]>;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {

    this.redlistedSpeciesData$ = this.statisticsService.getRedlistedSpeciesData();
    this.redlistedCategories$ = this.statisticsService.getRedlistedCategories3();

    console.log('stuff', this.redlistedCategories$)

  }

}
