import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QualityAssuredSighting } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-overview-child5',
  templateUrl: './overview-child5.component.html',
  styleUrls: ['./overview-child5.component.scss']
})

export class OverviewChild5Component implements OnInit {

  pageTitle: string;
  sightings: QualityAssuredSighting[] = [];
  locale: any;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {
    this.locale = locale;
  }

  ngOnInit(): void {

    this.pageTitle = this.route.routeConfig.data.text;

    // this.dataService.getQAData().subscribe((res) => {
    //   this.sightings = res;

    //   console.log('res', res);
    //   console.log('this.sightings', this.sightings);

    // });

    this.statisticsService.getQAData().subscribe((res) => {
    
      console.log('res', res);

      this.sightings = res;

    });
  }

}
