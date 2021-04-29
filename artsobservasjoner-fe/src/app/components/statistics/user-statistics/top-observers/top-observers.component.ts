import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';

const PAGE_SIZE: number = 10;

@Component({
  selector: 'app-top-observers',
  templateUrl: './top-observers.component.html',
  styleUrls: ['./top-observers.component.scss']
})

export class TopObserversComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  userStatistics$: Observable<UserStatistics>;
  totalPages: number;
  totalPages$: BehaviorSubject<number>;
  speciesGroups$: Observable<Category[]>;
  selectedSpeciesGroup: number | null = null;
  position: number;


  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }




  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private userStatisticsService: UserStatisticsService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {
    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(1, PAGE_SIZE);

    this.userStatisticsService.getTopUsersStatistics().subscribe(response => {
      this.totalPages = Math.trunc(response.totalCount / PAGE_SIZE);
    });

    this.totalPages$ = this.userStatisticsService.totalPages$;

  }

  onPageChange(event: number): void {
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(event, PAGE_SIZE, this.selectedSpeciesGroup);
  }

  onSpeciesGroupSelection(event: Event): void {
    this.userStatistics$ = this.userStatisticsService.getTopUsersStatistics(1, PAGE_SIZE, this.selectedSpeciesGroup);
    console.log('sg', event)
  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {

    const position: number = (pageNumber - 1) * pageSize + index + 1;
    return +position;

  }

}
