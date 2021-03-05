import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TOTAL_COUNT_STATISTICS } from 'src/app/models/statistics';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  chosenLanguage: string = '';
  subscription: Subscription;
  public totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;

  constructor() { }

  ngOnInit(): void { }

}
