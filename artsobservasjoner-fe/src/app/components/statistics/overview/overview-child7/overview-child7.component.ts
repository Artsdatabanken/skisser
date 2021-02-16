import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child7',
  templateUrl: './overview-child7.component.html',
  styleUrls: ['./overview-child7.component.scss']
})

export class OverviewChild7Component implements OnInit {
 
  pageTitle: string;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle = this.layoutService.setPageTitle('statistics.overviewStats_heading_7');

  }

}
