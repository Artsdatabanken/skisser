import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child9',
  templateUrl: './overview-child9.component.html',
  styleUrls: ['./overview-child9.component.scss']
})

export class OverviewChild9Component implements OnInit {

  pageTitle: string;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle = this.layoutService.setPageTitle('statistics.overviewStats_heading_9');

  }

}
