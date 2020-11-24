import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-child11',
  templateUrl: './overview-child11.component.html',
  styleUrls: ['./overview-child11.component.scss']
})

export class OverviewChild11Component implements OnInit {

  pageTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;
  }


}
