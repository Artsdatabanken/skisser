import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { StatisticsService } from 'src/app/services/statistics.service';
import { LayoutService } from 'src/app/services/layout.service';
import { GRAPHCOLORS } from 'src/app/config/graphs';
import { TranslationService } from 'src/app/services/translation.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-overview-child1',
  templateUrl: './overview-child1.component.html',
  styleUrls: ['./overview-child1.component.scss']
})

export class OverviewChild1Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$: Observable<object[]>;
  subscription: Subscription;
  translationParam: Date | number;

  @ViewChild('myCanvas') canvasRef: ElementRef;
  chart: any;

  graphLabels: string[] = [];
  graphValues: number[] = [];

  constructor(
    private layoutService: LayoutService,
    private utilitiesService: UtilitiesService,
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_1');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getData();

    this.translationParam = new Date().getFullYear();

  }

  getData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getSightingsCountPerSpeciesGroup(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([speciesData, speciesGroups]) => {

        speciesData.sort((a, b) => a['id'] - b['id']).forEach(speciesItem => {
          this.graphValues.push(speciesItem['totalCount']);
        });

        // build chart by language TODO: refactor
        // Denne kunne taes ut av this.data$; man bør da hente og loope gjennom speciesGroups separat

        this.subscription = this.translationService.currentLanguage$.subscribe(language => {
          this.buildChart(speciesGroups.map(sg => sg[language]).sort((a, b) => a['id'] - b['id']));
        });

        return speciesData.sort((a, b) => b['totalCount'] - a['totalCount']);

      })
    );

  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  buildChart(labels: string[]): void {

    Chart.defaults.global.defaultFontFamily = 'zabal';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontStyle = '500';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.legend.position = 'left';

    this.chart = new Chart('myCanvas', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: this.graphValues,
            borderColor: 'transparent',
            borderWidth: 0,
            backgroundColor: this.utilitiesService.generateRandomColors(12),
            fill: true
          }
        ]
      },
      options: {
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

}
