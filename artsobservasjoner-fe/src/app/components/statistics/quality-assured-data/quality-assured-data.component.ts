import { Inject, LOCALE_ID } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QualityAssuredSighting } from 'src/app/models/statistics';
import { DataService } from 'src/app/services/data.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-quality-assured-data',
  templateUrl: './quality-assured-data.component.html',
  styleUrls: ['./quality-assured-data.component.scss']
})

export class QualityAssuredDataComponent implements OnInit {

  pageTitle: string;
  sightings: QualityAssuredSighting[] = [];
  locale: any;
  sightings$: Observable<QualityAssuredSighting[]>;

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
    this.statisticsService.getQAData().subscribe((res) => {   
      console.log('res', res);
      this.sightings = res;
    });

    // BETTER METHOD
    this.sightings$ = this.statisticsService.getQAData();

  }
  
}
