import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, ValidatedDataItem } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-validated-data',
  templateUrl: './validated-data.component.html',
  styleUrls: ['./validated-data.component.scss']
})

export class ValidatedDataComponent implements OnInit {

  pageTitle: string;
  data$;
  currentLanguage: string;

  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.pageTitle = this.route.routeConfig.data.text;

    this.translate.onLangChange.subscribe(l => {
      this.currentLanguage = l.lang;
    });

    this.data$ = forkJoin([
      this.statisticsService.getValidatedData(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, speciesGroups]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        // ---------------------------------------- ***

        let validatedDataItem: ValidatedDataItem;
        let validatedData: ValidatedDataItem[] = [];

        species.forEach(speciesItem => {

          validatedDataItem = {
            id: speciesItem.id,
            speciesGroup: getSpeciesGroup(speciesItem.id),
            count: speciesItem.count,
            sightingTaxonCount: speciesItem.sightingTaxonCount,
            sightingWithMediaCount: speciesItem.sightingWithMediaCount,
            validatedSightingCount: speciesItem.validatedSightingCount,
            approvedSightingCount: speciesItem.approvedSightingCount,
            percentageSightedVsValidated: speciesItem.percentageSightedVsValidated,
            percentageValidatedVsApproved: speciesItem.percentageValidatedVsApproved,
          }
          
          validatedData.push(validatedDataItem);

        });

        if (this.currentLanguage === 'no') {
          validatedData = validatedData.sort((a, b) => a.speciesGroup.labelNorwegian.localeCompare(b.speciesGroup.labelNorwegian));
        }
        else {
          validatedData = validatedData.sort((a, b) => a.speciesGroup.labelEnglish.localeCompare(b.speciesGroup.labelEnglish));
        }

        this.translate.onLangChange.subscribe(res => {
          if (res.lang === 'no') {
            validatedData = validatedData.sort((a, b) => a.speciesGroup.labelNorwegian.localeCompare(b.speciesGroup.labelNorwegian));
          }
          else {
            validatedData = validatedData.sort((a, b) => a.speciesGroup.labelEnglish.localeCompare(b.speciesGroup.labelEnglish));
          }
        });

        return validatedData;

      })
    );

  }

}
