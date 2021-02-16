import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child8',
  templateUrl: './overview-child8.component.html',
  styleUrls: ['./overview-child8.component.scss']
})

export class OverviewChild8Component implements OnInit {

  pageTitle: string;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle = this.layoutService.setPageTitle('statistics.overviewStats_heading_8');

  }

}
