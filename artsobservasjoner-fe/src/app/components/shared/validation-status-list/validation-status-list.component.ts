import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { VALIDATION_STATUS } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-validation-status-list',
  templateUrl: './validation-status-list.component.html',
  styleUrls: ['./validation-status-list.component.scss']
})

export class ValidationStatusListComponent implements OnInit {

  @Input() validationStatusType?: string;
  currentLanguage$: Observable<string>;  
  validationStatuses: typeof VALIDATION_STATUS = VALIDATION_STATUS;
  validationStatuses$: Observable<Category[]>;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.validationStatuses$ = this.statisticsService.getValidationStatus(this.validationStatusType);
  }

}

