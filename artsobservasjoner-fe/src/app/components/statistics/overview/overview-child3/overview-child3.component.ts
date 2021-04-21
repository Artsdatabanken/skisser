import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GRAPHCOLORS } from 'src/app/config/graphs';
import { SIGHTINGS_PER_YEAR } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { TranslationService } from 'src/app/services/translation.service';

import { Chart } from 'chart.js';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { OverviewStatisticsService } from 'src/app/services/overview-statistics.service';

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

  @ViewChild('myCanvas') canvasRef: ElementRef;
  chart: any[] = [];

  graphLabels: string[] = [];
  graphValues1: number[] = [];
  graphValues2: number[] = [];
  graphColors: string[] = GRAPHCOLORS;

  constructor(
    private layoutService: LayoutService,
    private overviewStatisticsService: OverviewStatisticsService,
    private translationService: TranslationService,
    private utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_3');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getData();

  }

  getData(): void {
    this.data$ = this.overviewStatisticsService.getSightinsCountSumPerYear(this.sightingsCountPerYear.artsobs);

    this.data$ = forkJoin([
      this.overviewStatisticsService.getSightinsCountSumPerYear(this.sightingsCountPerYear.artsobs),
      this.overviewStatisticsService.getSightinsCountSumPerYear(this.sightingsCountPerYear.artskart)
    ]).pipe(
      map(([artsobs, artskart]) => {

        let tempArray: any[] = [];
        let previousValueArtsobs: number;
        let previousValueArtskart: number;


        artsobs.forEach((aoElement, index) => {

          // ---------------------------------------- ***

          const getYearlyIncrease = (current: number, previous: number): number => {

            let result: number;

            if (index > 0) {
              result = current - previous;
            }

            return result;
          }

          const getYearlyIncreaseInPercentage = (current: number, original: number): number| null => {

            let difference: number;
            let result: number;

            if (index > 0) {
              difference = current - original;
              result = (difference / original) * 100;
            }
            else {
              result = 0;
            }

            return +result.toFixed(2);
          }

          // ---------------------------------------- ***

          if (index > 0) {
            previousValueArtsobs = artsobs[index - 1].count;
            previousValueArtskart = artskart[index - 1].count;
          }

          // ---------------------------------------- ***

          artskart.forEach(akElement => {

            if (aoElement.id === akElement.id) {

              tempArray.push({
                year: aoElement.id,
                artsobsCount: aoElement.count,
                artsobsYearlyIncrease: getYearlyIncrease(aoElement.count, previousValueArtsobs),
                artsobsPercentageIncrease: getYearlyIncreaseInPercentage(aoElement.count, previousValueArtsobs),
                artskartCount: akElement.count,
                artskartYearlyIncrease: getYearlyIncrease(akElement.count, previousValueArtskart),                
                artskartPercentageIncrease: getYearlyIncreaseInPercentage(akElement.count, previousValueArtskart),
                percent: this.utilitiesService.getPercentage(akElement.count, aoElement.count)
              });

            }

            if (!this.graphValues2.includes(akElement.count)) {
              this.graphValues2.push(akElement.count);
            }

          });

          if (!this.graphLabels.includes(aoElement.id.toString())) {
            this.graphLabels.push(aoElement.id.toString());
          }

          if (!this.graphValues1.includes(aoElement.count)) {
            this.graphValues1.push(aoElement.count);
          }

        });

        this.buildChart(this.graphLabels, this.graphValues1, this.graphValues2);
        return tempArray;

      })
    );


  }

  buildChart(labels: string[], gValues1: number[], gValues2: number[]): void {

    Chart.defaults.global.defaultFontFamily = 'zabal';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontStyle = '500';
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.legend.position = 'bottom';

    this.chart = new Chart('myCanvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: gValues1,
            label: 'Artsobservasjoner',
            //borderColor: this.graphColors[7],
            borderColor: this.utilitiesService.generateRandomColor(),
            borderWidth: 2,
            fill: false
          },
          {
            data: gValues2,
            label: 'Artskart',
            borderColor: this.utilitiesService.generateRandomColor(),
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });

  }

}
