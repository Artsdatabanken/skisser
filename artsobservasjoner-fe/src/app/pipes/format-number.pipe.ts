import { registerLocaleData } from '@angular/common';
import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import localeNor from '@angular/common/locales/nb';
import localeNorExtra from '@angular/common/locales/nb';
import { Observable } from 'rxjs';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'formatNumber',
  pure: false
})

export class FormatNumberPipe implements PipeTransform {

  currentLanguage$: Observable<string>;

  constructor(private translationService: TranslationService) {
    registerLocaleData(localeNor, 'no');
    registerLocaleData(localeNorExtra, 'nb');
  }

  public transform(value: unknown, ...args: unknown[]): unknown {

    let formattedNumber: number | string;

    this.currentLanguage$ = this.translationService.currentLanguage$;

    if (value) {

      this.currentLanguage$.subscribe(language => {

        if (language === 'no') {
          formattedNumber = formatNumber(+value, 'no', '1.0-0');
        }

        if (language === 'en') {
          formattedNumber = formatNumber(+value, 'en', '1.0-0');
        }

      });     

    }
    else if (value === 0) {
      formattedNumber = 0;
    }
    else {
      formattedNumber = '';
    }

    return formattedNumber;

  }

}