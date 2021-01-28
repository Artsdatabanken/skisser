import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidatedDataItem } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-validated-data',
  templateUrl: './validated-data.component.html',
  styleUrls: ['./validated-data.component.scss']
})

export class ValidatedDataComponent implements OnInit {

  pageTitle: string;
  sightings: ValidatedDataItem[] = [];
  locale: any;
  sightings$: Observable<ValidatedDataItem[]>;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {
    this.locale = locale;
  }

  ngOnInit(): void {

    this.pageTitle = this.route.routeConfig.data.text;

    // NOT THE BEST METHOD BECAUSE YOU HAVE TO REMEMBER TO UNSUBSCRIBE IN THE ngOnDestroy() method
    this.statisticsService.getValidatedData().subscribe((res) => {   
      console.log('res', res);
      this.sightings = res;
    });

    // BETTER METHOD
    this.sightings$ = this.statisticsService.getValidatedData();

  }

}
