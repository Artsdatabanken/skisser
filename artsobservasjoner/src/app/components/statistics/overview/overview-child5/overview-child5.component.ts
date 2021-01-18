import { formatNumber, registerLocaleData } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-overview-child5',
  templateUrl: './overview-child5.component.html',
  styleUrls: ['./overview-child5.component.scss']
})

export class OverviewChild5Component implements OnInit {

  pageTitle: string;
  sightings: any[] = [];
  locale: any;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { 
    console.log('locale', locale);
    this.locale = locale;
  }

  ngOnInit(): void {

    this.pageTitle = this.route.routeConfig.data.text;

    this.dataService.getQAData().subscribe((res) => {
      this.sightings = res;

      console.log('res', res);
      console.log('this.sightings', this.sightings);

      this.sightings.forEach(s => {
        console.log('T E S T', formatNumber(Number(s.SightingCount), this.locale, '1.0-0'))
      })

    });
  }


}
