import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DropdownOption } from 'src/app/models/reusable';
import { TOTAL_COUNT_STATISTICS } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})

export class UserStatisticsComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;

  children: any[] = [];
  subscription: Subscription;
  subscriptions: Subscription[] = [];

  dropdownOptions: DropdownOption[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private translationService: TranslationService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {

    this.children = this.activatedRoute.routeConfig.children.filter(ch => ch.data.hidden === false);

    this.children.forEach(child => {

      let item: DropdownOption = {
        text: child.data.title,
        url: `/sightings-data/statistics/user-statistics/${child.path}`
      }

      this.dropdownOptions.push(item);

    });

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
