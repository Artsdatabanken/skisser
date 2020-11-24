import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-child6',
  templateUrl: './overview-child6.component.html',
  styleUrls: ['./overview-child6.component.scss']
})

export class OverviewChild6Component implements OnInit {

  pageTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;
  }

}
