import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { GRAPHCOLORS } from 'src/app/config/graphs';
import { LayoutService } from 'src/app/services/layout.service';
import { Chart } from 'chart.js';
import { StatisticsService } from 'src/app/services/statistics.service';
import { map } from 'rxjs/operators';
import { Category, MONTHS } from 'src/app/models/shared';
import { TranslationService } from 'src/app/services/translation.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-overview-child8',
  templateUrl: './overview-child8.component.html',
  styleUrls: ['./overview-child8.component.scss']
})

export class OverviewChild8Component implements OnInit {

  pageTitle$: Observable<string>;
  data$;

  @ViewChild('myCanvas') canvasRef: ElementRef;
  @ViewChild('myCanvas2') canvasRef2: ElementRef;

  chart: any;
  chart2: any;
  months: typeof MONTHS = MONTHS;
  subscription: Subscription;

  graphLabels: string[] = [];
  graphColors: string[] = GRAPHCOLORS;
  currentLanguage$: Observable<string>;

  constructor(
    private layoutService: LayoutService,
    private utilitiesService: UtilitiesService,
    private translationService: TranslationService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_8');
    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.buildChart();
    this.getData();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getSpeciesGroups(),
      this.statisticsService.getMonthlySightingsOrRegistrationsBySpeciesGroup()
    ]).pipe(
      map(([speciesGroups, monthlySightings]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        const tempMonths: any[] = monthlySightings.map(d => d['month']);
        const months: any[] = [...new Set(tempMonths)];
        console.log('TEST', months);

        const generateRandomColor = (): string => {
          let length = 6;
          const chars = '0123456789ABCDEF';
          let hex = '#';
          while (length--) hex += chars[(Math.random() * 16) | 0];
          return hex;
        }

        // ---------------------------------------- ***

        let datasets: object[] = [];
        let datasets2: object[] = [];

        monthlySightings.forEach(ms => {

          // console.log('TEST', ms.data.map(elem => elem['SightingCount']));
          console.log('TEST', ms.data);
          console.log('TEST', ms.data.map(elem => elem['monthNumber']));

          const monthsOriginal = ms.data.map(elem => elem['monthNumber']);
          let months: string[] = [];

          monthsOriginal.forEach(month => {

            return `{}`
          });

          const graphObject: object = {
            id: ms['id'],
            data: ms.data.map(elem => elem['SightingCount']),
            label: getSpeciesGroup(ms['id']),
            backgroundColor: this.utilitiesService.generateRandomColor()
          }

          const graphObject2: object = {
            id: ms['id'],
            data: ms.data.map(elem => elem['SightingCount']),
            label: getSpeciesGroup(ms['id']),
            borderColor: this.utilitiesService.generateRandomColor(),
            borderWidth: 2,
            fill: false
          }

          datasets.push(graphObject);

          datasets2.push(graphObject2);

        });

        this.buildChart(null, datasets, datasets2)

        return monthlySightings;

      })
    );

  }


  buildChart(labels?: string[], datasets?: object[], datasets2?: object[]): void {

    Chart.defaults.global.defaultFontFamily = 'zabal';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontStyle = '500';
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.legend.position = 'bottom';

    this.chart = new Chart('myCanvas', {
      type: 'bar',
      data: {
        labels: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
        datasets: datasets
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
            display: true
          }],
        }
      }
    });

    this.chart2 = new Chart('myCanvas2', {
      type: 'line',
      data: {
        labels: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
        datasets: datasets2
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
            display: true
          }],
        }
      }
    });

  }

}
