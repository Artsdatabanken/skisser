import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssessmentCategory, Category, AssessedSpeciesItemStats } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-alien-species',
  templateUrl: './alien-species.component.html',
  styleUrls: ['./alien-species.component.scss']
})

export class AlienSpeciesComponent implements OnInit {

  data$;
  currentLanguage: string;

  translationParamValue1: string;
  translationParamValue2: string;


  constructor(
    private statisticsService: StatisticsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.translate.onLangChange.subscribe(l => {
      this.currentLanguage = l.lang;

      l.lang === 'no' ? this.translationParamValue1 = 'fremmede arter' : this.translationParamValue1 = 'alien species';
      l.lang === 'no' ? this.translationParamValue2 = 'artsgruppe' : this.translationParamValue2 = 'species group';
    });

    this.getData();

  }

  getData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getAssessedSpeciesStats('alienSpecies'),
      this.statisticsService.getAssessmentCategories('alienCategories'),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, categories, speciesGroups]) => {

        let alienSpeciesItemStats: AssessedSpeciesItemStats;

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

            alienSpeciesItemStats = {
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

            if (speciesItem.id == alienSpeciesItemStats.id) {
              tempArray.push(alienSpeciesItemStats)
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
