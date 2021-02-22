import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child10',
  templateUrl: './overview-child10.component.html',
  styleUrls: ['./overview-child10.component.scss']
})

export class OverviewChild10Component implements OnInit {

  pageTitle$: Observable<string>;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_10');

  }

}
