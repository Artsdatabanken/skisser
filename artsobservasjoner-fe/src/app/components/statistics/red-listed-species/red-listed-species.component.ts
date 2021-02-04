import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AssessmentCategory } from 'src/app/models/assessmentCategory';
import { SpecialSpeciesDataItem } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-red-listed-species',
  templateUrl: './red-listed-species.component.html',
  styleUrls: ['./red-listed-species.component.scss']
})

export class RedListedSpeciesComponent implements OnInit {

  redlistedSpeciesData$: Observable<any[]>;
  redlistedCategories$: Observable<any[]>;
  stuff$;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {

    this.redlistedSpeciesData$ = this.statisticsService.getRedlistedSpeciesData();
    this.redlistedCategories$ = this.statisticsService.getRedlistedCategories();

    // this._moviesDataService.getShowtimes()
    // .switchMap(res => { 
    //     const showtimes = res[0].showtimes;
    //     const id = Object.keys(showtimes)[0];

    //     return Observable.zip(
    //         this.getMovies(id),
    //         Observable.of(showtimes[id])
    //     );
    // })
    // .subscribe(([movies, showtimes]) => {
    //     this.results.movies = movies; // or assign it to some other property
    //     this.results.showtimes = showtimes; // and use in the template
    // }

  }

}


