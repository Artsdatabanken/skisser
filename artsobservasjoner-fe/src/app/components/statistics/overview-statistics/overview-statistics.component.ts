import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-statistics',
  templateUrl: './overview-statistics.component.html',
  styleUrls: ['./overview-statistics.component.scss']
})

export class OverviewStatisticsComponent implements OnInit {

  pageTitle: string;
  children: any[] = [];

  @Input() open: boolean;
  activeDropdown: boolean;
  subscription: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService
  ) {

    this.children = this.activatedRoute.routeConfig.children.filter(ch => ch.data.hidden === false);

    this.subscriptions.push(
      this.layoutService.dropdownVisibility.subscribe((value) => {
        this.activeDropdown = value;
      })
    );

    this.setPageTitle();

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  toggleDropdown(): void {
    this.layoutService.toggleDropdown();
  }

  closeDropdown(): void {
    this.layoutService.closeDropdown();
  }

  setPageTitle(): void {

    this.translate.stream(['menu.menu_statistics_overview']).subscribe(res => {

      this.pageTitle = res['menu.menu_statistics_overview'];
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);

    });
    
  }

}
