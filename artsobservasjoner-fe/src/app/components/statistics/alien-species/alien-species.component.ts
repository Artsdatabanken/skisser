import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlienSpeciesItem, AssessmentCategory, Category, SpecialSpeciesItemStats } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-alien-species',
  templateUrl: './alien-species.component.html',
  styleUrls: ['./alien-species.component.scss']
})

export class AlienSpeciesComponent implements OnInit {

  dataVariant: string = 'alienSpecies';
  data$;
  currentLanguage: string;
  test$;

  constructor(
    private statisticsService: StatisticsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.test$ = this.statisticsService.getSpeciesGroupsStatsData(this.dataVariant);

    this.translate.onLangChange.subscribe(l => {
      this.currentLanguage = l.lang;
    });

    this.data$ = forkJoin([
      //this.statisticsService.getAlienSpeciesData(),
      this.statisticsService.getSpeciesGroupsStatsData(this.dataVariant),
      this.statisticsService.getAlienCategories(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, categories, speciesGroups]) => {

        let alienSpeciesItemData: SpecialSpeciesItemStats;

        // ---------------------------------------- ***

        const getCategory = (id: number): AssessmentCategory => {
          return categories.find(category => category.id === id);
        }

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        // ---------------------------------------- ***

        const map = new Map();

        species.forEach(speciesItem => {

          let tempArray = [];

          speciesItem.data.forEach(data => {

            alienSpeciesItemData = {
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

            if (speciesItem.id == alienSpeciesItemData.id) {
              tempArray.push(alienSpeciesItemData)
            }

            map.set(getSpeciesGroup(speciesItem.id), { data: tempArray });

          });

        });

        console.log('new map', map)

        //const result = [...map.values()];

        return map;

      })
    );

  }

}
