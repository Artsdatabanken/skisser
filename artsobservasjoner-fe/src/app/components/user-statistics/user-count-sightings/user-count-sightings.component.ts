import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { TOTAL_COUNT_STATISTICS, UserStatistics } from 'src/app/models/statistics';
import { AreasService } from 'src/app/services/areas.service';
import { CoreService } from 'src/app/services/core.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

const PAGE_SIZE: number = 20;

@Component({
  selector: 'app-user-count-sightings',
  templateUrl: './user-count-sightings.component.html',
  styleUrls: ['./user-count-sightings.component.scss']
})

export class UserCountSightingsComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  userStatistics$: Observable<UserStatistics>;
  totalPages$: BehaviorSubject<number>;
  position: number;
  speciesGroups$: Observable<Category[]>;
  years: number[];
  counties$: Observable<any>;
  municipalities$: Observable<object[]>;

  selectedYear: number | null = null;
  selectedSpeciesGroup: number | null = null;
  selectedTaxon: number | null = null;
  selectedCounty: number | null = null;
  selectedMunicipality: number | null = null;
  selectedArea: number;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private utilitiesService: UtilitiesService,
    private coreService: CoreService,
    private userStatisticsService: UserStatisticsService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_topObservers');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {

    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.years = this.utilitiesService.generateYears();
    this.counties$ = this.coreService.getCounties();
    this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE);
    this.totalPages$ = this.userStatisticsService.totalPages$;

  }

  onPageChange(event: number): void {
    this.userStatistics$ = this.userStatisticsService.getTopObservers(event, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  onSpeciesGroupSelection(event: Event): void {
    this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  onYearSelection(event: Event): void {
    this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  onCountySelection(event: Event): void {
    this.selectedArea = this.selectedCounty;
    this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  getPosition(index: number, pageNumber: number, pageSize: number): number {
    return this.userStatisticsService.getPosition(index, pageNumber, pageSize);
  }

  onMunicipalitySelection(event: number): void {  
    console.log('sfkjjgdsfjhgsdjhdfs', event)
    this.selectedArea = this.selectedMunicipality;
    this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, null);
  }

  getUsersStatistics(): void {
      this.userStatistics$ = this.userStatisticsService.getTopObservers(1, PAGE_SIZE, this.selectedYear, this.selectedSpeciesGroup, this.selectedTaxon, this.selectedArea);
  }

  getMunicipality(event: any): void {
    this.municipalities$ = this.coreService.getMunicipality(event);
  }

}
