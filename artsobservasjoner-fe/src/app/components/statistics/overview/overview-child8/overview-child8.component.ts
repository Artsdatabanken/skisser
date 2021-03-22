import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { GRAPHCOLORS } from 'src/app/config/graphs';
import { LayoutService } from 'src/app/services/layout.service';
import { Chart } from 'chart.js';
import { StatisticsService } from 'src/app/services/statistics.service';
import { map } from 'rxjs/operators';
import { Category, MONTHS } from 'src/app/models/shared';

@Component({
  selector: 'app-overview-child8',
  templateUrl: './overview-child8.component.html',
  styleUrls: ['./overview-child8.component.scss']
})

export class OverviewChild8Component implements OnInit {

  pageTitle$: Observable<string>;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  data$;
  chart: any[] = [];
  months: typeof MONTHS = MONTHS;

  graphLabels: string[] = [];
  graphValues: number[] = [];
  graphColors: string[] = GRAPHCOLORS;

  constructor(
    private layoutService: LayoutService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_8');

    this.buildChart();
    this.getData();

  }

  getData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getSpeciesGroups(),
      this.statisticsService.getMonthlySightingsOrRegistrationsBySpeciesGroup()
    ]).pipe(
      map(([speciesGroups, data]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        const tempMonths: any[] = data.map(d => d['month']);
        const months: any[] = [...new Set(tempMonths)];

        // ---------------------------------------- ***

        let datasets: object[] = [];

        data.forEach(d => {

          //const countBySpeciesGroup: number[] = 

          const graphObject: object = {

            data: [12, 14, 16, 17, 3, 0, 11],
            label: getSpeciesGroup(d['speciesGroupId']),
            borderColor: '#f50000',
            borderWidth: 2,
            fill: false
  
          }
        });




        console.log('data', data)

        return data;

      })
    );

  }


  buildChart(labels?: string[], gValues1?: number[], gValues2?: number[]): void {

    Chart.defaults.global.defaultFontFamily = 'zabal';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontStyle = '500';
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.legend.position = 'bottom';

    this.chart = new Chart('myCanvas', {
      type: 'line',
      data: {
        labels: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [
          {
            data: [12, 14, 16, 17, 3, 0, 11],
            label: 'Karplanter',
            borderColor: '#f50000',
            borderWidth: 2,
            fill: false
          },
          {
            data: [7, 12, 17, 5, 4, 21],
            label: 'Pattedyr',
            borderColor: this.graphColors[5],
            borderWidth: 2,
            fill: false
          },
          {
            data: [1, 4, 7, 11, 2, 8],
            label: 'Alger',
            borderColor: '#330055',
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
            display: true
          }],
        }
      }
    });

  }

}
