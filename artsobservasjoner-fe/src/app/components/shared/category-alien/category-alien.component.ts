import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AssessmentCategory } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-category-alien',
  templateUrl: './category-alien.component.html',
  styleUrls: ['./category-alien.component.scss']
})

export class CategoryAlienComponent implements OnInit {

  alienCategories$: Observable<AssessmentCategory[]>;
  currentLanguage: string = this.translate.currentLang;

  constructor(
    private statisticsService: StatisticsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.alienCategories$ = this.statisticsService.getAlienCategories();

    this.translate.onLangChange.subscribe(l => {
      this.currentLanguage = l.lang;
    });
    
  }
}
