import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssessmentCategory, Category, RedlistedSpeciesItem, SpecialSpeciesItemStats } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-red-listed-species',
  templateUrl: './red-listed-species.component.html',
  styleUrls: ['./red-listed-species.component.scss']
})

export class RedListedSpeciesComponent implements OnInit {

  // redlistedSpeciesData$: Observable<any[]>;
  // redlistedCategories$: Observable<any[]>;
  data$;
  currentLanguage: string;

  constructor(
    private statisticsService: StatisticsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.translate.onLangChange.subscribe(l => {
      this.currentLanguage = l.lang;
    });

    // this.redlistedSpeciesData$ = this.statisticsService.getRedlistedSpeciesData();
    // this.redlistedCategories$ = this.statisticsService.getRedlistedCategories();

    this.data$ = forkJoin([
      this.statisticsService.getRedlistedSpeciesData(),
      this.statisticsService.getRedlistedCategories(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, categories, speciesGroups]) => {

        let redlistedSpeciesItemData: SpecialSpeciesItemStats;

        // ---------------------------------------- ***

        const getCategory = (id: number): AssessmentCategory => {
          return categories.find(category => category.id === id);
        }

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        const getSpeciesGroupLabel = (id: number): string => {

          const speciesGroup: {} = speciesGroups.find(speciesGroup => speciesGroup.id === id);

          let label: string;

          // if (this.translate.currentLang === 'en') { label = speciesGroup['labelEnglish']; }
          // if (this.translate.currentLang === 'no') { label = speciesGroup['labelNorwegian']; }


          // this.translate.onLangChange.subscribe(response => {

          //   if (response.lang == 'en') {
          //     label = speciesGroup['labelEnglish'];
          //   }
          //   else {
          //     label = speciesGroup['labelNorwegian']
          //   }

          // });

          return label;

        }

        // ---------------------------------------- ***

        const map = new Map();

        species.forEach(speciesItem => {

          let tempArray = [];

          map.set(speciesItem.id, { data: [] })

          speciesItem.data.forEach(data => {

            console.log('TEST', getSpeciesGroupLabel(speciesItem.id))

            redlistedSpeciesItemData = {
              id: speciesItem.id,
              speciesGroupId: speciesItem.id,
              speciesGroup: getSpeciesGroup(speciesItem.id),
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

        return map;

      })
    );

  }

}


