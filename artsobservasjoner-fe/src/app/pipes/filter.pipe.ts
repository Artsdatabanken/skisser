import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(items: any[], value: string, prop: string): any[] {
    
    if (!items) return [];
    if (!value) return items;

    return items.filter(singleItem =>
      singleItem[prop].toLowerCase().startsWith(value.toLowerCase())
    );

  }

}
