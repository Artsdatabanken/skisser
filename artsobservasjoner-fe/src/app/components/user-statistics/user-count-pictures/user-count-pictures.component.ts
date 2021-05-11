import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { AreasService } from 'src/app/services/areas.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

const PAGE_SIZE: number = 20;

@Component({
  selector: 'app-user-count-pictures',
  templateUrl: './user-count-pictures.component.html',
  styleUrls: ['./user-count-pictures.component.scss']
})

export class UserCountPicturesComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  userStatistics$: Observable<UserStatistics>;
  totalPages$: BehaviorSubject<number>;
  position: number;
  speciesGroups$: Observable<Category[]>;
  years: number[];
  counties: string[];

  selectedYear: number | null = null;
  selectedSpeciesGroup: number | null = null;
  selectedTaxon: number | null = null;
  selectedArea: number | null = null;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private utilitiesService: UtilitiesService,
    private areasService: AreasService,
    private userStatisticsService: UserStatisticsService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_photographyLeague');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {

    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.years = this.utilitiesService.generateYears();
    this.counties = this.areasService.generateCounties();
    this.userStatistics$ = this.userStatisticsService.getTopPhotographers(1, PAGE_SIZE);
    this.totalPages$ = this.userStatisticsService.totalPages$;

  }

  onPageChange(event: number): void {
    this.userStatistics$ = this.userStatisticsService.getTopPhotographers(event, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  onSpeciesGroupSelection(event: Event): void {
    this.userStatistics$ = this.userStatisticsService.getTopPhotographers(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  onYearSelection(event: Event): void {
    console.log('selected year', event)
    this.userStatistics$ = this.userStatisticsService.getTopPhotographers(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  onAreaSelection(event: Event): void {
    console.log('selected area', event)
  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {
    return this.userStatisticsService.getPosition(index, pageNumber, pageSize);
  }

}
