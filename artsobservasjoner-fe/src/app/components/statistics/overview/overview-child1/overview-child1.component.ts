import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { StatisticsItem } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { LayoutService } from 'src/app/services/layout.service';
import { GRAPHCOLORS } from 'src/app/config/graphs';
import { TranslationService } from 'src/app/services/translation.service';
import { Category } from 'src/app/models/shared';

@Component({
  selector: 'app-overview-child1',
  templateUrl: './overview-child1.component.html',
  styleUrls: ['./overview-child1.component.scss']
})

export class OverviewChild1Component implements OnInit, AfterViewInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$;
  subscription: Subscription;

  @ViewChild('myCanvas') canvasRef: ElementRef;
  chart: any[] = [];

  graphLabels: string[] = [];
  graphValues: number[] = [];
  graphColors: string[] = GRAPHCOLORS;

  constructor(
    private layoutService: LayoutService,
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_1');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getData();

  }

  ngAfterViewInit() { }

  getData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getSightingsCountPerSpeciesGroup(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, speciesGroups]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        // ---------------------------------------- ***

        let statisticsItem: StatisticsItem;
        let statisticsItems: StatisticsItem[] = [];

        species.forEach(speciesItem => {

          statisticsItem = {
            id: speciesItem.id,
            speciesGroup: getSpeciesGroup(speciesItem.id),
            count: speciesItem.count
          }

          this.graphValues.push(speciesItem.count);

          statisticsItems.push(statisticsItem);

        });

        // build chart by language TODO: refactor

        this.translationService.currentLanguage$.subscribe(language => {
          this.buildChart(speciesGroups.map(sg => sg[language]));
        });

        //this.buildChart();
        return statisticsItems.sort((a, b) => b.count - a.count);

      })
    );

  }

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
            borderColor: '#fff',
            borderWidth: 0,
            backgroundColor: this.graphColors,
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
