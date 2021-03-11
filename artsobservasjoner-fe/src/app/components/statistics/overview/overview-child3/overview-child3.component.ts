import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GRAPHCOLORS } from 'src/app/data/graphs';
import { SIGHTINGS_PER_YEAR } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

import { Chart } from 'chart.js';

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
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_3');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getData();

    console.log('graf', this.canvasRef)
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

            if (!this.graphValues2.includes(elem.count)) {
              this.graphValues2.push(elem.count);
            }

          });

          if (!this.graphLabels.includes(element.id.toString())) {
            this.graphLabels.push(element.id.toString());
          }

          if (!this.graphValues1.includes(element.count)) {
            this.graphValues1.push(element.count);
          }

        });

        console.log('temp', this.graphValues1)
        console.log('temp', this.graphValues2)
        this.buildChart(this.graphLabels, this.graphValues1, this.graphValues2);
        return tempArray;

      })
    );


  }

  buildChart(labels: string[], gValues1: number[], gValues2: number[]): void {

    Chart.defaults.global.defaultFontFamily = 'zabal';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontStyle = '500';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.legend.position = 'left';

    this.chart = new Chart('myCanvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: gValues1,
            label: 'Artsobservasjoner',
            borderColor: this.graphColors[7],
            borderWidth: 2,
            fill: false
          },
          {
            data: gValues2,
            label: 'Artskart',
            borderColor: this.graphColors[5],
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
