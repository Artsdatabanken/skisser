import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TotalCountStatistic } from 'src/app/models/totalCountStatistic';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-total-count-statistics',
  templateUrl: './total-count-statistics.component.html',
  styleUrls: ['./total-count-statistics.component.scss']
})

export class TotalCountStatisticsComponent implements OnInit {

  @Input() statistics: string;
  @Input() text: string | null;
  @Input() icon: boolean | null;
  @Input() size: string | null;

  totalCount$: Observable<TotalCountStatistic>;
  api: string;

  // TODO: These should be in a config file of some sorts
  apis: object = {
    totalSightings: 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalSightingsCount',
    totalSpecies: 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalSpeciesCount',
    totalImages: 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalImagesCount',
    totalUsers: 'https://ap-ao3-statisticsapi-staging.azurewebsites.net/api/v1/Statistics/GetTotalUsersCount'
  };

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {

    if (this.statistics === Object.keys(this.apis).find(stats => stats === this.statistics)) {
      this.api = this.apis[this.statistics];
    }

    this.totalCount$ = this.statisticsService.getTotalCount(this.api);

  }

  getCountIcon(statistics: string): string {
    return `numbers-box__icon--${statistics}`;
  }

}
