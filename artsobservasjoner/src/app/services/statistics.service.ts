import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QualityAssuredSighting } from '../models/statistics';

import QAData from '../data/qualityAssuredData.json';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  qaData: any = QAData;

  constructor(private utilitiesService: UtilitiesService) { }
  
  getQADYears(): Observable<string[]> {

    console.log('qa')

    let years: string[] = [];


    this.qaData.forEach(element => {
      console.log('qadata', element.Data)

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


  getQAData(): Observable<any[]> {

    let qaSightings: QualityAssuredSighting[] = [];
    let qaSighting: QualityAssuredSighting;

    return of(this.qaData).pipe(
      map(data => {

        data.forEach(d => {

          qaSighting = {
            id: d.SpeciesGroupId,
            sightingCount: d.SightingCount,
            validatedSightingCount: d.ValidatedSightingCount,
            approvedSightingCount: d.ApprovedValidatedSightingCount,
            percentageSightedVsValidated: this.utilitiesService.getPercentage(d.SightingCount, d.ValidatedSightingCount),
            percentageValidatedVsApproved: this.utilitiesService.getPercentage(d.ValidatedSightingCount, d.ApprovedValidatedSightingCount),
          }

          qaSightings.push(qaSighting);

        });

        console.log('qaSightings', qaSightings)
        return qaSightings;
      })
    );

  }
}
