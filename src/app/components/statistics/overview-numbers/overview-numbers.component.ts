import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-overview-numbers',
  templateUrl: './overview-numbers.component.html',
  styleUrls: ['./overview-numbers.component.scss']
})

export class OverviewNumbersComponent implements OnInit {

  pageTitle: string;
  children: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.pageTitle = this.route.routeConfig.data.text;
    this.children = this.route.routeConfig.children;
  }

  ngOnInit(): void { }

}
