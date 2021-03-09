import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { AssessmentCategory, AssessedSpeciesItemStats, ASSESSMENT_CATEGORIES } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-red-listed-species',
  templateUrl: './red-listed-species.component.html',
  styleUrls: ['./red-listed-species.component.scss']
})

export class RedListedSpeciesComponent implements OnInit {

  data$;
  assessmentCategories: typeof ASSESSMENT_CATEGORIES = ASSESSMENT_CATEGORIES;
  currentLanguage$: Observable<string>;  
  translationParamValue: string;
  value: string;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.translationService.currentLanguage$.subscribe(language => {
      language === 'no' ? this.translationParamValue = 'rødlistede arter' : this.translationParamValue = 'redlisted species';
    });

    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.getData();

  }

  getData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getAssessedSpeciesStats(this.assessmentCategories.redlist),
      this.statisticsService.getAssessmentCategories(this.assessmentCategories.redlist),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, categories, speciesGroups]) => {

        let redlistedSpeciesItemStats: AssessedSpeciesItemStats;

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

          //map.set({ id: speciesItem.id, label: getSpeciesGroupByLanguage(speciesItem.id) }, { data: [] });

          speciesItem.data.forEach(data => {

            redlistedSpeciesItemStats = {
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

            if (speciesItem.id == redlistedSpeciesItemStats.id) {
              tempArray.push(redlistedSpeciesItemStats)
            }

            map.set(getSpeciesGroup(speciesItem.id), { data: tempArray });

          });

        });

        //const result = [...map.values()];

        return map;

      })
    );

  }

}


