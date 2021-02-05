import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AssessmentCategory } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-category-redlisted',
  templateUrl: './category-redlisted.component.html',
  styleUrls: ['./category-redlisted.component.scss']
})

export class CategoryRedlistedComponent implements OnInit {

  redlistedCategories$: Observable<AssessmentCategory[]>;
  currentLanguage: string = this.translate.currentLang;

  constructor(
    private statisticsService: StatisticsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.redlistedCategories$ = this.statisticsService.getRedlistedCategories();

    this.translate.onLangChange.subscribe(l => {
      this.currentLanguage = l.lang;
    });
    
  }

}
