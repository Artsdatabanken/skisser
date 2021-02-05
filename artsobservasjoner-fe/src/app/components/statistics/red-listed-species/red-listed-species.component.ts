import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssessmentCategory } from 'src/app/models/assessmentCategory';
import { RedlistedSpeciesItem, SpecialSpeciesItemStats } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-red-listed-species',
  templateUrl: './red-listed-species.component.html',
  styleUrls: ['./red-listed-species.component.scss']
})

export class RedListedSpeciesComponent implements OnInit {

  redlistedSpeciesData$: Observable<any[]>;
  redlistedCategories$: Observable<any[]>;
  data$;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {

    // this.redlistedSpeciesData$ = this.statisticsService.getRedlistedSpeciesData();
    // this.redlistedCategories$ = this.statisticsService.getRedlistedCategories();

    this.data$ = forkJoin([
      this.statisticsService.getRedlistedSpeciesData(),
      this.statisticsService.getRedlistedCategories()
    ]).pipe(
      map(([species, categories]) => {

        let redlistedSpeciesItemData: SpecialSpeciesItemStats;

        // ---------------------------------------- ***

        const getCategory = (id: number): AssessmentCategory => {
          return categories.find(category => category.id === id);
        }

        // ---------------------------------------- ***

        const map = new Map();

        species.forEach(speciesItem => {

          let tempArray = [];
          
          map.set(speciesItem.id, { data: [] })

          speciesItem.data.forEach(data => {

            redlistedSpeciesItemData = {
              id: speciesItem.id,
              assessmentCategoryId: data['redlistId'],
              assessmentCategory: getCategory(data['redlistId']),
              sightingsCount: data['sightingCount'],
              imagesCount: data['sightingWithMediaCount'],
              validatedCount: data['validatedSightingCount'],
              approvedCount: data['approvedValidatedSightingCount'],
            }

            if (speciesItem.id == redlistedSpeciesItemData.id) {
              tempArray.push(redlistedSpeciesItemData)
            }

            map.set(speciesItem.id, { data: tempArray })

          });

        });


        //const result = [...map.values()];

        console.log('map', map)

        return map;

      })
    );

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


