import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { GRAPHCOLORS } from 'src/app/config/graphs';
import { LayoutService } from 'src/app/services/layout.service';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { Category, Months } from 'src/app/models/shared';
import { TranslationService } from 'src/app/services/translation.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { StatisticsItem } from 'src/app/models/statistics';
import { SpeciesService } from 'src/app/services/species.service';
import { OverviewStatisticsService } from 'src/app/services/overview-statistics.service';

@Component({
  selector: 'app-overview-child8',
  templateUrl: './overview-child8.component.html',
  styleUrls: ['./overview-child8.component.scss']
})

export class OverviewChild8Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$: Observable<StatisticsItem>;
  speciesGroups$: Observable<Category[]>;
  selectedSpeciesGroup: number | null = null;

  showSpeciesGroupsPane: boolean = false;
  months: Months = new Months();

  @ViewChild('myCanvas') canvasRef: ElementRef;
  chart: any;

  graphColors: string[] = GRAPHCOLORS;

  constructor(
    private layoutService: LayoutService,
    private utilitiesService: UtilitiesService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private overviewStatisticsService: OverviewStatisticsService,
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_8');
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.speciesGroups$ = this.speciesService.speciesGroups;

  }

  getData(): void {

    this.data$ = forkJoin([
      this.speciesService.speciesGroups,
      this.overviewStatisticsService.getMonthlySightingsOrRegistrationsBySpeciesGroup(),
    ]).pipe(
      map(([speciesGroups, monthlySightings]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        const getMonthlySightingsBySpeciesGroup = (id: number): StatisticsItem => {
          return monthlySightings.find(ms => ms.id === id);
        }

        // ---------------------------------------- ***

        const monthlySightingObject: StatisticsItem = getMonthlySightingsBySpeciesGroup(+this.selectedSpeciesGroup)

        this.currentLanguage$.subscribe(language => {

          const graphData: number[] = monthlySightingObject.data.map(elem => elem['sightingCount']);

          const graphLabelObject: Category = getSpeciesGroup(monthlySightingObject['id']);
          let graphLabel: string;
          let graphLabels: string[];

          if (language === 'no') graphLabel = graphLabelObject.no;
          if (language === 'en') graphLabel = graphLabelObject.en;

          if (language === 'no') graphLabels = this.months.no;
          if (language === 'en') graphLabels = this.months.en;

          this.buildChart(graphData, graphLabel, graphLabels);

        });

        return monthlySightingObject;

      })
    );

  }

  buildChart(data: number[], label: string, labels?: string[]): void {

    Chart.defaults.global.defaultFontFamily = 'zabal';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontStyle = '500';
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.legend.position = 'bottom';

    // OBS we have to destroy old chart in order to create a new one

    if (this.chart) {
      this.chart.destroy(); // denne er kostbart, bedre å retegne

      // this.chart.data.labels = labels;
      // this.chart.data.datasets = graphDataset;
      // this.chart.update();
    }

    this.chart = new Chart('myCanvas', {
      type: 'bar',
      data: {
        labels: labels,
        //datasets: graphDataset,
        datasets: [
          {
            data: data,
            label: label,
            backgroundColor: this.utilitiesService.generateRandomColor()
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

  // onSelection(event: Event): void {
  //   this.getData();
  // } // DENNE BRUKER VI OM VI BRUKER EN TRADISJONELL SELECT BOX (HTML)

  onSpeciesGroupsSelection(speciesGroupId: number): void {
    this.selectedSpeciesGroup = speciesGroupId;
    this.showSpeciesGroupsPane = false;
    this.getData();
  }

  toggleSpeciesGroupsDropdown(): void {
    this.showSpeciesGroupsPane = !this.showSpeciesGroupsPane;
  }

  closeSpeciesGroupsPane(pane: any): void {
    this.showSpeciesGroupsPane = false;
  }

  // buildChart(labels?: string[], datasets?: object[]): void {

  //   Chart.defaults.global.defaultFontFamily = 'zabal';
  //   Chart.defaults.global.defaultFontColor = 'black';
  //   Chart.defaults.global.defaultFontStyle = '500';
  //   Chart.defaults.global.defaultFontSize = 16;
  //   Chart.defaults.global.legend.position = 'bottom';

  //   this.chart = new Chart('myCanvas', {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       // datasets: datasets,
  //       datasets: [
  //         {

  //           data: monthlySightingObject.data.map(elem => elem['sightingCount']),
  //           label: getSpeciesGroupByLanguage(monthlySightingObject['id']),
  //           backgroundColor: this.utilitiesService.generateRandomColor()
  //         }
  //       ]
  //     },
  //     options: {
  //       legend: {
  //         display: true
  //       },
  //       scales: {
  //         xAxes: [{
  //           display: true
  //         }],
  //         yAxes: [{
  //           display: true
  //         }],
  //       }
  //     }
  //   });

  // }

  // getData(): void {

  //   this.data$ = forkJoin([
  //     this.statisticsService.getSpeciesGroups(),
  //     this.statisticsService.getMonthlySightingsOrRegistrationsBySpeciesGroup()
  //   ]).pipe(
  //     map(([speciesGroups, monthlySightings]) => {

  //       // ---------------------------------------- ***

  //       const getSpeciesGroup = (id: number): Category => {
  //         return speciesGroups.find(speciesGroup => speciesGroup.id === id);
  //       }

  //       const tempMonths: any[] = monthlySightings.map(d => d['month']);
  //       const months: any[] = [...new Set(tempMonths)];
  //       console.log('TEST', months);

  //       // ---------------------------------------- ***

  //       let datasets: object[] = [];
  //       let datasets2: object[] = [];

  //       monthlySightings.forEach(ms => {

  //         // console.log('TEST', ms.data.map(elem => elem['SightingCount']));
  //         console.log('TEST', ms.data);
  //         console.log('TEST', ms.data.map(elem => elem['monthNumber']));

  //         const monthsOriginal = ms.data.map(elem => elem['monthNumber']);
  //         let months: string[] = [];

  //         monthsOriginal.forEach(month => {

  //           return `{}`
  //         });

  //         const graphObject: object = {
  //           id: ms['id'],
  //           data: ms.data.map(elem => elem['SightingCount']),
  //           label: getSpeciesGroup(ms['id']),
  //           backgroundColor: this.utilitiesService.generateRandomColor()
  //         }

  //         const graphObject2: object = {
  //           id: ms['id'],
  //           data: ms.data.map(elem => elem['SightingCount']),
  //           label: getSpeciesGroup(ms['id']),
  //           borderColor: this.utilitiesService.generateRandomColor(),
  //           borderWidth: 2,
  //           fill: false
  //         }

  //         datasets.push(graphObject);

  //         datasets2.push(graphObject2);

  //       });

  //       this.buildChart(null, datasets, datasets2)

  //       return monthlySightings;

  //     })
  //   );

  // }

}
