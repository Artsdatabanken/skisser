import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'translate',
    pure: false,
})

export class TranslationPipe implements PipeTransform {

    //constructor(private translationService: TranslationService) { }

    // transform(value: any, args?: any): any {
    //     return this.translationService.translate(value);
    // }

    constructor() { }

    transform(value: any, args?: any): any {

        value = value.toString();
        value = value.toLowerCase();

        if (value === 'home') {
            return 'Forsiden';
        }
        else if (value === 'about') {
            return 'Om';
        }
        else if (value === 'report') {
            return 'Rapportere';
        }
        else if (value === 'search') {
            return 'Søk';
        }
        else if (value === 'statistics') {
            return 'Statistikk';
        }
        else if (value === 'images') {
            return 'Bilder';
        }
        else if (value === 'register') {
            return 'Registrer deg';
        }
        else if (value === 'login') {
            return 'Logg inn';
        }
        else {
            return 'Ikke funnet';
        }

    }
}