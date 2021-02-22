import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child12',
  templateUrl: './overview-child12.component.html',
  styleUrls: ['./overview-child12.component.scss']
})

export class OverviewChild12Component implements OnInit {
  
  pageTitle$: Observable<string>;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_12');

  }
}
