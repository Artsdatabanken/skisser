import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownOption } from 'src/app/models/reusable';
import { TopObserver, TOTAL_COUNT_STATISTICS } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-observers',
  templateUrl: './top-observers.component.html',
  styleUrls: ['./top-observers.component.scss']
})

export class TopObserversComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;

  topObservers$: Observable<TopObserver[]>;

  fakeUsers$: Observable<any[]>;
  toggle: boolean = false;

  constructor(
    private userService: UserService,
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private userStatisticsService: UserStatisticsService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {


    this.fakeUsers$ = this.userService.getFakeUsers();

    this.topObservers$ = this.userStatisticsService.getTopObservers();


  }

  getRank(index: number): string {

    const rank: number = index;

    // switch (rank) {
    //   case 0:
    //     return 'league__item--first';
    //   case 1:
    //     return 'league__item--second';
    //   case 2:
    //     return 'league__item--third';
    //   default:
    //     return '';
    // }

    switch (rank) {
      case 0:
        return 'league league--first';
      case 1:
        return 'league league--second';
      case 2:
        return 'league league--third';
      default:
        return '';
    }

  }

  toggleWinners(): void {
    this.toggle = !this.toggle;
  }


}
