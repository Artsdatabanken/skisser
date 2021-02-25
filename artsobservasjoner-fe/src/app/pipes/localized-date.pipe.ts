import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false
})

export class LocalizedDatePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  constructor(private translate: TranslateService, private datePipe: DatePipe) { }

  transform(value: any, pattern: string = 'mediumDate'): any {
    return this.datePipe.transform(value, pattern, undefined, this.translate.currentLang);
  }

}
