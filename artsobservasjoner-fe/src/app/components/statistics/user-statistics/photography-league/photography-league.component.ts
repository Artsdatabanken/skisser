import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { AreasService } from 'src/app/services/areas.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserStatisticsService } from 'src/app/services/user-statistics.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-photography-league',
  templateUrl: './photography-league.component.html',
  styleUrls: ['./photography-league.component.scss']
})

export class PhotographyLeagueComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
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
    private areasService: AreasService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_photographyLeague');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {
    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.years = this.utilitiesService.generateYears();
    this.counties = this.areasService.generateCounties();
  }

  onPageChange(event: number): void {
   }

  onSpeciesGroupSelection(event: Event): void {
  }

  onYearSelection(event: Event): void {
   }

  getPosition(index: number, pageNumber: number, pageSize: number): number {

    const position: number = (pageNumber - 1) * pageSize + index + 1;
    return +position;

  }

}
