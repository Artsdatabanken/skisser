import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Footnote } from 'src/app/models/footnote';
import { Category } from 'src/app/models/shared';
import { LayoutService } from 'src/app/services/layout.service';
import { OverviewStatisticsService } from 'src/app/services/overview-statistics.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-overview-child6',
  templateUrl: './overview-child6.component.html',
  styleUrls: ['./overview-child6.component.scss']
})

export class OverviewChild6Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$;
  sum: number;
  footnotes: Footnote[];

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private overviewStatisticsService: OverviewStatisticsService,
    private utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_6');
    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.getData();

  }

  //document.querySelectorAll('.special').length

  getData(): void {

    this.data$ = forkJoin([
      this.overviewStatisticsService.getSightingsPerDataSource(),
      this.overviewStatisticsService.getDataSourceList(),
      this.overviewStatisticsService.getApiDataSourceList(),
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

          this.sum = sightingsPerDataSource.reduce((sum, current) => sum + current['sightingsCount'], 0);

          let obj: object = {
            dataSource: getDataSource1(element['dataSourceId']),
            apiDataSource: getDataSource2(element['apiId']),
            reportersCount: element['reportersCount'],
            sightingsCount: element['sightingsCount'],
            percent: this.utilitiesService.getPercentage(this.sum, element['sightingsCount']),
            nullFindingsCount: element['nullFindingsCount'],
          }

          objs.push(obj);

        });


        return objs;
      })
    );

  }

}
