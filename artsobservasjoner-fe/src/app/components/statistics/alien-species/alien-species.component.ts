import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-alien-species',
  templateUrl: './alien-species.component.html',
  styleUrls: ['./alien-species.component.scss']
})

export class AlienSpeciesComponent implements OnInit {

  redlistedCategories$: Observable<any[]>;
  redlistedCategories3$: Observable<any[]>;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {

    this.redlistedCategories$ = this.statisticsService.getRedlistedCategories3();

    console.log('stuff', this.redlistedCategories$)

  }

}
