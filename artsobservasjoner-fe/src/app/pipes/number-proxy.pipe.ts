import { registerLocaleData } from '@angular/common';
import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import localeNor from '@angular/common/locales/nb';
import localeNorExtra from '@angular/common/locales/nb';

@Pipe({
  name: 'numberProxy'
})

export class NumberProxyPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
    console.log(this.translate.currentLang)
    registerLocaleData(localeNor, 'no');
    registerLocaleData(localeNorExtra, 'nb');
  }

  public transform(value: unknown, ...args: unknown[]): any {

    let formattedNumber: any = formatNumber(+value, this.translate.currentLang, '1.0-0');

    this.translate.onLangChange.subscribe(r => {

      formattedNumber = formatNumber(+value, r.lang, '1.0-0');
      console.log('formatted after change', formattedNumber);

      return formattedNumber;
    });

    console.log('formatted', formattedNumber)
    return formattedNumber;
  }




}




