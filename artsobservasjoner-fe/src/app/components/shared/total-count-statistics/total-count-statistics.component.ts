import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TotalCountStatistic } from 'src/app/models/statistics';
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
  @Input() style?: string | null = 'grid';

  totalCount$: Observable<TotalCountStatistic>;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.totalCount$ = this.statisticsService.getTotalCount(this.statistics);
  }

  getCountIcon(statistics: string): string {
    return `numbers-box__icon--${statistics}`;
  }

}
