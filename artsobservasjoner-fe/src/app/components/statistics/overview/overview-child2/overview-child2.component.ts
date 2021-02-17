import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GRAPHCOLORS } from 'src/app/data/graphs';
import { Category, ImageStatisticsItem } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

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
    private translate: TranslateService
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

          this.graphValues1.push(speciesItem.imageCount);
          this.graphValues2.push(speciesItem.imageCountWithOpenLicence);

          statisticsItems.push(statisticsItem);

        });

        // build chart by language TODO: refactor

        if (this.currentLanguage === 'no') {
          this.buildChart(speciesGroups.map(sg => sg.labelNorwegian));
        }
        else {
          this.buildChart(speciesGroups.map(sg => sg.labelEnglish));
        }

        this.translate.onLangChange.subscribe(response => {

          if (response.lang === 'no') {
            this.buildChart(speciesGroups.map(sg => sg.labelNorwegian));
          }
          else {
            this.buildChart(speciesGroups.map(sg => sg.labelEnglish));
          }

        });


        return statisticsItems.sort((a, b) => b.imageCount - a.imageCount);

      })
    );

  }

  buildChart(labels: string[]): void {

    Chart.defaults.global.defaultFontFamily = 'zabal';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontStyle = '500';
    Chart.defaults.global.defaultFontSize = 16;
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
        text: this.currentLanguage === 'no' ? 'Antall bilder' : 'Image count',
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
          text: this.currentLanguage === 'no' ? 'Antall bilder med åpen lisens' : 'Image count with open licence',
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
