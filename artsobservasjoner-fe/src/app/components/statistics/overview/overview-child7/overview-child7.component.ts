import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-child7',
  templateUrl: './overview-child7.component.html',
  styleUrls: ['./overview-child7.component.scss']
})

export class OverviewChild7Component implements OnInit {
 
  pageTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.routeConfig.data.text;
  }

}
