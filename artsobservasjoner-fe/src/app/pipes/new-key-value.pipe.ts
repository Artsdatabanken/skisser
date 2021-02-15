import { KeyValuePipe } from '@angular/common';
import { KeyValueDiffers, Pipe, PipeTransform } from '@angular/core';

const unordered = (a: any, b: any) => a;

@Pipe({
  name: 'newKeyValue'
})

export class NewKeyValuePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  constructor(public differs: KeyValueDiffers) { }

  public transform(value, compareFn = unordered): unknown {
    const pipe = new KeyValuePipe(this.differs);
    return pipe.transform(value, compareFn);
  }

}