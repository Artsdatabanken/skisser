import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-child5',
  templateUrl: './overview-child5.component.html',
  styleUrls: ['./overview-child5.component.scss']
})

export class OverviewChild5Component implements OnInit {

  pageTitle$: Observable<string>;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  
    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_5');

  }

}
