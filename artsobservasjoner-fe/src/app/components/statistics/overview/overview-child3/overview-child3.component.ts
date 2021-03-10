import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SIGHTINGS_PER_YEAR, StatisticsItem } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-overview-child3',
  templateUrl: './overview-child3.component.html',
  styleUrls: ['./overview-child3.component.scss']
})

export class OverviewChild3Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$;
  subscription: Subscription;
  sightingsCountPerYear: typeof SIGHTINGS_PER_YEAR = SIGHTINGS_PER_YEAR;

  constructor(
    private layoutService: LayoutService,
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_3');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getData();

  }

  getData(): void {
    this.data$ = this.statisticsService.getSightinsCountSumPerYear(this.sightingsCountPerYear.artsobs);

    this.data$ = forkJoin([
      this.statisticsService.getSightinsCountSumPerYear(this.sightingsCountPerYear.artsobs),
      this.statisticsService.getSightinsCountSumPerYear(this.sightingsCountPerYear.artskart)
    ]).pipe(
      map(([artsobs, artskart]) => {

        let tempArray: any[] = [];

        artsobs.forEach(element => {

          artskart.forEach(elem => {

            if (element.id === elem.id) {

              tempArray.push({
                year: element.id,
                artsobsCount: element.count,
                artskartCount: elem.count
              });

            }

          });

        });

        console.log('temp', tempArray)
        return tempArray;

      })
    );


  }

}
