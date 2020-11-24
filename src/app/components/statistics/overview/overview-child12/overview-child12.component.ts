import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-child12',
  templateUrl: './overview-child12.component.html',
  styleUrls: ['./overview-child12.component.scss']
})

export class OverviewChild12Component implements OnInit {

  pageTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;
  }

}
