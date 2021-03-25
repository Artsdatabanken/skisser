import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-area-league',
  templateUrl: './area-league.component.html',
  styleUrls: ['./area-league.component.scss']
})

export class AreaLeagueComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_statistics_userStatistics_areaLeague');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {
  }

}
