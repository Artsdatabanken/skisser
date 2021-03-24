import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-overview-child7',
  templateUrl: './overview-child7.component.html',
  styleUrls: ['./overview-child7.component.scss']
})

export class OverviewChild7Component implements OnInit {

  pageTitle$: Observable<string>;
  data$;

  constructor(
    private layoutService: LayoutService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_7');


    this.statisticsService.getSightingsGeographicalDistribution().subscribe(r => {

      this.data$ = r;
      console.log('r', r);
      
    });;

  }

}
