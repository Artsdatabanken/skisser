import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AreasService {

  constructor() { }

  generateCounties(): string[] {
    const counties: string[] = [
      'Agder',
      'Innlandet',
      'Møre og Romsdal',
      'Nordland',
      'Oslo',
      'Rogaland',
      'Vestfold og Telemark',
      'Troms og Finnmark',
      'Trøndelag',
      'Vestland',
      'Viken'
    ];

    return counties;
  }

}
