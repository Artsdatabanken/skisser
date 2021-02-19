import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-response',
  templateUrl: './error-response.component.html',
  styleUrls: ['./error-response.component.scss']
})

export class ErrorResponseComponent implements OnInit {

  currentLanguage: string;
  statusPageLink: string;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {

    this.translate.onLangChange.subscribe(response => {
      this.currentLanguage = response.lang;

      if (response.lang === 'no') {
        this.statusPageLink = '<a href="/status-page">driftsmeldinger</a>';
      }
      else {
        this.statusPageLink = '<a href="/status-page">status page</a>';
      }
    });
    
  }

}
