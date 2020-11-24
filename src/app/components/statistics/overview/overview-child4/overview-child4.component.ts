import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-child4',
  templateUrl: './overview-child4.component.html',
  styleUrls: ['./overview-child4.component.scss']
})

export class OverviewChild4Component implements OnInit {

  pageTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;
  }

}
