import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trim',
    pure: false,
})

export class TrimPipe implements PipeTransform {

    constructor() { }

    transform(value: any, args?: any): any {

        value = value.toString();
        value = value.trim();
        console.log('value', value)
        return value;

    }
}