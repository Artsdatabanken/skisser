import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GRAPHCOLORS } from 'src/app/config/graphs';
import { ImageStatisticsItem } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { TranslationService } from 'src/app/services/translation.service';
import { Category } from 'src/app/models/shared';

@Component({
  selector: 'app-overview-child2',
  templateUrl: './overview-child2.component.html',
  styleUrls: ['./overview-child2.component.scss']
})

export class OverviewChild2Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$;
  subscription: Subscription;

  @ViewChild('canvas1') canvas1Ref: ElementRef;
  @ViewChild('canvas2') canvas2Ref: ElementRef;

  chart1: any[] = [];
  chart2: any[] = [];

  graphLabels: string[] = [];
  graphValues1: number[] = [];
  graphValues2: number[] = [];
  graphColors: string[] = GRAPHCOLORS;

  constructor(
    private layoutService: LayoutService,
    private statisticsService: StatisticsService,
    private utilitiesService: UtilitiesService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_2');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getData();

  }

  getData(): void {

    this.data$ = this.statisticsService.getImageCountPerSpeciesGroup();

    // this.data$ = forkJoin([
    //   this.statisticsService.getImageCountPerSpeciesGroup(),
    //   this.statisticsService.getSpeciesGroups()
    // ]).pipe(
    //   map(([species, speciesGroups]) => {

    //     let statisticsItem: ImageStatisticsItem;
    //     let statisticsItems: ImageStatisticsItem[] = [];

    //     species.forEach(speciesItem => {

    //       // this.graphValues1.push(speciesItem.imageCount);
    //       // this.graphValues2.push(speciesItem.imageCountWithOpenLicence);

    //       statisticsItems.push(statisticsItem);

    //     });

    //     // build chart by language TODO: refactor

    //     // this.translationService.currentLanguage$.subscribe(language => {
    //     //   if (language === 'no') {
    //     //     this.buildChart(speciesGroups.map(sg => sg.no));
    //     //   }
    //     //   else {
    //     //     this.buildChart(speciesGroups.map(sg => sg.en));
    //     //   }
    //     // });

    //     return statisticsItems.sort((a, b) => b.imageCount - a.imageCount);

    //   })
    // );

  }

  buildChart(labels: string[]): void {

    Chart.defaults.global.defaultFontFamily = 'zabal';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontStyle = '500';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.legend.position = 'left';

    this.chart1 = new Chart('canvas1', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: this.graphValues1.sort((a, b) => b - a),
            borderColor: '#fff',
            borderWidth: 0,
            backgroundColor: this.graphColors,
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          //text: this.currentLanguage === 'no' ? 'Antall bilder' : 'Image count',
          position: 'bottom',
          fontFamily: 'barlowsemicondensed',
          fontColor: '#444',
          fontSize: 20,
          fontStyle: '500',
          lineHeight: 1,
          padding: 15
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });

    this.chart2 = new Chart('canvas2', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: this.graphValues2,
            borderColor: '#fff',
            borderWidth: 0,
            backgroundColor: this.graphColors,
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          //text: this.currentLanguage === 'no' ? 'Antall bilder med åpen lisens' : 'Image count with open licence',
          position: 'bottom',
          fontFamily: 'barlowsemicondensed',
          fontColor: '#444',
          fontSize: 20,
          fontStyle: '500',
          lineHeight: 1,
          padding: 15
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });

  }

  getPercentage(total: number, partial: number): number {
    return this.utilitiesService.getPercentage(total, partial);
  }
}
