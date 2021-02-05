import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  stuff$;

  redlistedSpecies: RedlistedSpeciesItem[] = [];
  redlistedCategories: AssessmentCategory;
  data: RedlistedSpeciesItem[] = [];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {

    this.redlistedSpeciesData$ = this.statisticsService.getRedlistedSpeciesData();
    this.redlistedCategories$ = this.statisticsService.getRedlistedCategories();


    this.statisticsService.getRedlistedSpeciesData().subscribe(res => {

      console.log('res', res)

      this.redlistedSpecies = res;




    });

    this.stuff$ = forkJoin(
      this.statisticsService.getRedlistedSpeciesData(),
      this.statisticsService.getRedlistedCategories()
    ).pipe(
      map(([species, categories,]) => {

        let tempRedlistedSpeciesItem: RedlistedSpeciesItem;
        let redlistedSpeciesItemData: SpecialSpeciesItemStats;
        let redlistedSpeciesItemDataArray: SpecialSpeciesItemStats[] = [];

        let temp = {};

        // ---------------------------------------- ***

        const getCategory = (id: number): AssessmentCategory => {
          return categories.find(category => category.id === id);
        }

        // ---------------------------------------- ***

        species.forEach(speciesItem => {

          // tempRedlistedSpeciesItem = {
          //   id: speciesItem.id
        // }

/*
          export class TranslationSet {
            public languange: string
            public values: { [key: string]: string } = {}
          }
          // };
          
          { [key: string]: TranslationSet } 

          */
         
          let tempID = speciesItem.id

          temp['id'] = tempID;
          temp['data'] = ['hei'];

          console.log('ID: ', temp, speciesItem.id)

          speciesItem.data.forEach(data => {

            redlistedSpeciesItemData = {
              id: speciesItem.id,
              assessmentCategory: getCategory(data['redlistId']),
              sightingsCount: data['sightingCount'],
              imagesCount: data['sightingWithMediaCount'],
              validatedCount: data['validatedSightingCount'],
              approvedCount: data['approvedValidatedSightingCount'],
            }           
           

            console.log('redlistedSpeciesItemData', redlistedSpeciesItemData)

          });
        

          // console.log('redlistedSpeciesItemData', redlistedSpeciesItemData)

          // console.log('tempRedlistedSpeciesItem', tempRedlistedSpeciesItem)

        });

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


