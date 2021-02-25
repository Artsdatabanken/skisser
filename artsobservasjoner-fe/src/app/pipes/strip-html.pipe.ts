import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})

export class StripHtmlPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(text: string, ...usefulTags: any[]): string {
    return usefulTags.length > 0
      ? text.replace(new RegExp(`<(?!\/?(${usefulTags.join('|')})\s*\/?)[^>]+>`, 'g'), '')
      : text.replace(/<(?:.|\s)*?>/g, '');
  }

  // HOW TO USE:

  /*
  ----------------------------------------

  // Strip all html tags:
  <div>{{ htmlText | stripHtml }}</div>

  // Strip all html tags except pre tags:
  <div>{{ htmlText | stripHtml: 'pre' }}</div>
  <div [innerHTML]="htmlText | stripHtml: 'pre'"></div>
  
   ----------------------------------------
  */

}
