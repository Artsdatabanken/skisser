import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-child10',
  templateUrl: './overview-child10.component.html',
  styleUrls: ['./overview-child10.component.scss']
})

export class OverviewChild10Component implements OnInit {

  pageTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;
  }


}
