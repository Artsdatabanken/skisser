import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, ImageStatisticsItem } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-overview-child2',
  templateUrl: './overview-child2.component.html',
  styleUrls: ['./overview-child2.component.scss']
})

export class OverviewChild2Component implements OnInit {

  pageTitle: string;
  currentLanguage: string = this.translate.currentLang;
  data$;
  subscription: Subscription;

  constructor(
    private layoutService: LayoutService,
    private statisticsService: StatisticsService,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {

    this.translate.onLangChange.subscribe(res => {
      this.currentLanguage = res.lang;
    });

    this.pageTitle = this.layoutService.setPageTitle('statistics.overviewStats_heading_2');
    this.getData();
  
  }

  getData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getImageCountPerSpeciesGroup(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, speciesGroups]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        // ---------------------------------------- ***

        let statisticsItem: ImageStatisticsItem;
        let statisticsItems: ImageStatisticsItem[] = [];

        species.forEach(speciesItem => {

          statisticsItem = {
            id: speciesItem.id,
            speciesGroup: getSpeciesGroup(speciesItem.id),
            imageCount: speciesItem.imageCount,
            imageCountWithOpenLicence: speciesItem.imageCountWithOpenLicence,
          }

          statisticsItems.push(statisticsItem);

        });

        return statisticsItems.sort((a, b) => b.count - a.count);

      })
    );

  }

}
