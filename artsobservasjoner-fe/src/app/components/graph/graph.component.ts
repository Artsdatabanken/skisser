import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableRow } from 'src/app/models/reusable';
import { Category, StatisticsItem } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})

export class GraphComponent implements AfterViewInit {

  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  data$;
  currentLanguage: string;

  constructor(
    private statisticsService: StatisticsService,
    private translate: TranslateService
  ) { }

  //ngOnInit(): void { }

  ngAfterViewInit() {

    this.translate.onLangChange.subscribe(res => {
      this.currentLanguage = res.lang;
    });

    this.statisticsService.getSightingsCountPerSpeciesGroup().subscribe(r => console.log('xxx', r));

    this.data$ = forkJoin([
      this.statisticsService.getSightingsCountPerSpeciesGroup(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, speciesGroups]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        const getSpeciesGroupByLanguage = (id: number): string => {

          console.log('TEST', id)

          const tempSpeciesGroup = speciesGroups.find(speciesGroup => speciesGroup.id === id);
          let speciesGroup: string;

          if (this.currentLanguage === 'no') {
            speciesGroup = tempSpeciesGroup['labelNorwegian'];
          }
          else {
            speciesGroup = tempSpeciesGroup['labelEnglish'];
          }

          return speciesGroup;
        }

        // ---------------------------------------- ***

        let statisticsItem: StatisticsItem;
        let statisticsItems: StatisticsItem[] = [];
        let temp: TableRow<any>[] = [];
        let tempItem: any;

        species.forEach(speciesItem => {

          statisticsItem = {
            id: speciesItem.id,
            speciesGroup: getSpeciesGroup(speciesItem.id),
            sightingCount: speciesItem.sightingCount,
          }

          statisticsItems.push(statisticsItem);

          tempItem = {
            values: {
              speciesGroup: getSpeciesGroupByLanguage(speciesItem.id),
              sightingCount: speciesItem.sightingCount
            }
          }

          temp.push(tempItem);

        });

        console.log('statisticsItems', statisticsItems)
        console.log('temp', temp)
        return temp;

      })
    );



    this.barChartMethod();
  }


  barChartMethod(): void {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
