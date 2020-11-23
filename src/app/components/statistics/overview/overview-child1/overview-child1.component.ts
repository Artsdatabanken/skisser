import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-child1',
  templateUrl: './overview-child1.component.html',
  styleUrls: ['./overview-child1.component.scss']
})

export class OverviewChild1Component implements OnInit {

  pageTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;
  }

}
