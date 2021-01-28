import { registerLocaleData } from '@angular/common';
import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import localeNor from '@angular/common/locales/nb';
import localeNorExtra from '@angular/common/locales/nb';

@Pipe({
  name: 'numberProxy',
  pure: false
})

export class NumberProxyPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
    registerLocaleData(localeNor, 'no');
    registerLocaleData(localeNorExtra, 'nb');
  }

  public transform(value: unknown, ...args: unknown[]): unknown {

    let currentLanguage: string;
    let formattedNumber: number | string;

    currentLanguage = this.translate.currentLang;

    if (value) {

      this.translate.onLangChange.subscribe(r => {
        currentLanguage = r.lang;
      });

      if (currentLanguage === 'no') {
        formattedNumber = formatNumber(+value, 'no', '1.0-0');
      }

      if (currentLanguage === 'en') {
        formattedNumber = formatNumber(+value, 'en', '1.0-0');
      }

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




