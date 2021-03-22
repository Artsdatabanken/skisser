import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-overview-child6',
  templateUrl: './overview-child6.component.html',
  styleUrls: ['./overview-child6.component.scss']
})

export class OverviewChild6Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_6');
    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.data$ = this.statisticsService.getSightingsPerDataSource();

    this.data$ = forkJoin([
      this.statisticsService.getSightingsPerDataSource(),
      this.statisticsService.getDataSourceList(),
      this.statisticsService.getApiDataSourceList(),
    ]).pipe(
      map(([sightingsPerDataSource, dataSourceList, apiSourceList]) => {

        // ---------------------------------------- ***

        const getDataSource1 = (id: number): Category => {
          return dataSourceList.find(ds => ds.id === id);
        }

        const getDataSource2 = (id: number): object => {
          return apiSourceList.find(as => as['id'] === id);
        }

        // ---------------------------------------- ***

        let objs: object[] = [];

        sightingsPerDataSource.forEach(element => {

          let obj: object = {
            dataSource: getDataSource1(element['dataSourceId']),
            apiDataSource: getDataSource2(element['apiId']),
            reportersCount: element['reportersCount'],
            sightingsCount: element['sightingsCount'],
            nullFindingsCount: element['nullFindingsCount']
          }

          const sum = sightingsPerDataSource.reduce((sum, current) => sum + current['sightingsCount'], 0);

          console.log('XXXXXXXXXX', sum)

          objs.push(obj);

        });


        return objs;
      })
    );


  }
}
