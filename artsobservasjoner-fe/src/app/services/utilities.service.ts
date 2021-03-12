import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  private subject = new Subject<any>();

  //-----------------------------------------------------------------------------------------------------------***

  sendClickEvent(): void {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  getPercentage(total: number, partial: number): number {
    let percentage: number = partial * 100 / total;
    percentage = +percentage.toFixed(1)
    return percentage;
  }

  getPercentageIncrease(current: number, original: number): number {

    // TODO: ta hensyn at det ene tallet kan være null
    
    let difference: number;
    let result: number;

    difference = current - original;
    result = (difference / original) * 100;

    // Nytt tall - originalt tall = differanse
    // ( Differanse / originalt tall ) * 100 = Prosentøkning (%)

    console.log('res', result);
    return +result.toFixed(2);

  }
}
