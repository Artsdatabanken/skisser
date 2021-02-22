import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child11',
  templateUrl: './overview-child11.component.html',
  styleUrls: ['./overview-child11.component.scss']
})

export class OverviewChild11Component implements OnInit {

  pageTitle$: Observable<string>;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_11');

  }

}
