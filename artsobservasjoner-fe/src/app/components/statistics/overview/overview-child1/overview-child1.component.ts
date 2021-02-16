import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { Category, StatisticsItem } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child1',
  templateUrl: './overview-child1.component.html',
  styleUrls: ['./overview-child1.component.scss']
})

export class OverviewChild1Component implements OnInit, AfterViewInit {

  pageTitle: string;
  currentLanguage: string = this.translate.currentLang;
  data$;
  subscription: Subscription;

  @ViewChild('myCanvas') canvasRef: ElementRef;
  chart: any[] = [];

  graphLabels: string[] = [];
  graphValues: number[] = [];

  graphColors: string[] = [
    '#a3e4d7',
    '#81b0d0',
    '#5abad1',
    '#264992',
    '#91d0ce',
    '#3f97c2',
    '#274b93',
    '#131a55',
    '#afdccc',
    '#56b9d2',
    '#3984b6',
    '#172068',
  ]

  constructor(
    private layoutService: LayoutService,
    private statisticsService: StatisticsService,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {

    this.translate.onLangChange.subscribe(res => {
      this.currentLanguage = res.lang;
    });

    this.getData();
    this.pageTitle = this.layoutService.setPageTitle('statistics.overviewStats_heading_1');

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

  // setPageTitle(): void {

  //   this.translate.stream(['statistics.overviewStats_heading_1']).subscribe(res => {

  //     this.pageTitle = res['statistics.overviewStats_heading_1'];
  //     this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);

  //   });
    
  // }

}
