import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child6',
  templateUrl: './overview-child6.component.html',
  styleUrls: ['./overview-child6.component.scss']
})

export class OverviewChild6Component implements OnInit {

  pageTitle: string;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle = this.layoutService.setPageTitle('statistics.overviewStats_heading_6');

  }
}
