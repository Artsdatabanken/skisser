import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-child2',
  templateUrl: './overview-child2.component.html',
  styleUrls: ['./overview-child2.component.scss']
})

export class OverviewChild2Component implements OnInit {

  pageTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;
  }

}
