import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DropdownOption } from 'src/app/models/reusable';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-statistics',
  templateUrl: './overview-statistics.component.html',
  styleUrls: ['./overview-statistics.component.scss']
})

export class OverviewStatisticsComponent implements OnInit {

  pageTitle$: Observable<string>;
  children: any[] = [];
  subscription: Subscription;
  subscriptions: Subscription[] = [];

  dropdownOptions: DropdownOption[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_overview');
  }

  ngOnInit(): void { 
    
    this.children = this.activatedRoute.routeConfig.children.filter(ch => ch.data.hidden === false);
    this.children.forEach(child => {

      let item: DropdownOption = {
        text: child.data.title, 
        url: `/sightings-data/statistics/overview-statistics/${child.path}`
      }

      this.dropdownOptions.push(item);

    });

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  

  // FLYTTET TIL SERVICE FOR GJENBRUK 

  // setPageTitle(): void {

  //   this.translate.stream(['menu.menu_statistics_overview']).subscribe(res => {

  //     this.pageTitle = res['menu.menu_statistics_overview'];
  //     this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);

  //   });
    
  // }

}
