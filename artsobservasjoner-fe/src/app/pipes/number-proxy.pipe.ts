import { DecimalPipe } from '@angular/common';
import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'numberProxy'
})

export class NumberProxyPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
    console.log(this.translate.currentLang)
  }

  public transform(value: unknown, ...args: unknown[]): unknown {

    let formattedNumber: number;

    console.log(formatNumber(+value, this.translate.currentLang, '1.2-3'));

    formattedNumber = +formatNumber(+value, this.translate.currentLang, '');

    this.translate.onLangChange.subscribe(r => {
      formattedNumber = +formatNumber(+value, r.lang, '');

      console.log(formatNumber(+value, r.lang, '1.2-3'));
    });

    return formatNumber(+value, this.translate.currentLang, '');
  }




}




