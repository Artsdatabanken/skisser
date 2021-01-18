import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;

    this.dataService.getQAData().subscribe((res) => {
      this.sightings = res;
      
      console.log('res', res);
      console.log('this.sightings', this.sightings);
    });
  }

}
