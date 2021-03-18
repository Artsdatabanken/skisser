import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GRAPHCOLORS } from 'src/app/config/graphs';
import { LayoutService } from 'src/app/services/layout.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-overview-child8',
  templateUrl: './overview-child8.component.html',
  styleUrls: ['./overview-child8.component.scss']
})

export class OverviewChild8Component implements OnInit {

  pageTitle$: Observable<string>;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  chart: any[] = [];

  graphLabels: string[] = [];
  graphValues: number[] = [];
  graphColors: string[] = GRAPHCOLORS;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_8');

    this.buildChart();

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
