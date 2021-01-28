import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidatedDataItem, SpecialSpeciesDataItem, SpecialSpeciesDataObject } from '../models/statistics';

import ValidatedData from '../data/validatedData.json';
import RedListedSpeciesData from '../data/redListedSpeciesData.json';
import { UtilitiesService } from './utilities.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  // API
  tempApiUrl: string = 'https://arvped-ao3api-staging.azurewebsites.net/v1/Statistics/GetRedlist';

  // data
  validatedData: any = ValidatedData;
  redlistedSpeciesData: any = RedListedSpeciesData;

  constructor(
    private httpClient: HttpClient,
    private utilitiesService: UtilitiesService
  ) { }

  getRedlistedSpeciesData(): Observable<SpecialSpeciesDataItem[]> {

    // return this.httpClient.get(this.tempApiUrl).pipe(
    //   map((res: any) => {

    //     console.log('res', res)

    //     return res;
    //   })
    // );

    return of(this.redlistedSpeciesData).pipe(
      map(data => {

        let specialSpeciesDataItem: SpecialSpeciesDataItem;
        let specialSpeciesDataObject: SpecialSpeciesDataObject;
        let specialSpeciesDataItems: SpecialSpeciesDataItem[] = [];
        let specialSpeciesDataObjects: SpecialSpeciesDataObject[] = [];

        data.speciesGroupStatistics.forEach(item => {

          specialSpeciesDataItem = {
            id: item.speciesGroupId,
            data: item.data
          }

          specialSpeciesDataItems.push(specialSpeciesDataItem);
           
        });

        
        console.log('specialSpeciesDataItems', specialSpeciesDataItems);
        return specialSpeciesDataItems;
      })
    );

  }

  getValidatedData(): Observable<ValidatedDataItem[]> {

    let validatedSightings: ValidatedDataItem[] = [];
    let validatedSighting: ValidatedDataItem;

    return of(this.validatedData).pipe(
      map(data => {

        data.forEach(d => {

          validatedSighting = {
            id: d.SpeciesGroupId,
            sightingCount: d.SightingCount,
            validatedSightingCount: d.ValidatedSightingCount,
            approvedSightingCount: d.ApprovedValidatedSightingCount,
            percentageSightedVsValidated: this.utilitiesService.getPercentage(d.SightingCount, d.ValidatedSightingCount),
            percentageValidatedVsApproved: this.utilitiesService.getPercentage(d.ValidatedSightingCount, d.ApprovedValidatedSightingCount),
          }

          validatedSightings.push(validatedSighting);

        });

        // console.log('validatedSightings', validatedSightings)
        return validatedSightings;
      })
    );

  }

  getQADYears(): Observable<string[]> {

    console.log('qa')

    let years: string[] = [];


    this.validatedData.forEach(element => {
      console.log('validatedData', element.Data)

      element.Data.forEach(elem => {
        if (!years.includes(elem.year)) {
          years.push(elem.year);
        }
      });

    });

    console.log('years', years)
    console.log('count years', years.length)

    return of(years).pipe();

  }

}
