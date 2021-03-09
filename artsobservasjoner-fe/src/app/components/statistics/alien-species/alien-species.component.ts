import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { AssessmentCategory, AssessedSpeciesItemStats, ASSESSMENT_CATEGORIES } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-alien-species',
  templateUrl: './alien-species.component.html',
  styleUrls: ['./alien-species.component.scss']
})

export class AlienSpeciesComponent implements OnInit {

  data$;
  assessmentCategories: typeof ASSESSMENT_CATEGORIES = ASSESSMENT_CATEGORIES;
  currentLanguage$: Observable<string>;
  translationParamValue: string;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.translationService.currentLanguage$.subscribe(language => {
      language === 'no' ? this.translationParamValue = 'fremmede arter' : this.translationParamValue = 'alien species';
    });

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getData();

  }

  getData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getAssessedSpeciesStats(this.assessmentCategories.alienlist),
      this.statisticsService.getAssessmentCategories(this.assessmentCategories.alienlist),
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
              //speciesGroup: getSpeciesGroupByLanguage(speciesItem.id),
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

        console.log('map', map)
        return map;

      })
    );

  }

}
