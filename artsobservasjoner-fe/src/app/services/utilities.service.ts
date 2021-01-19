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
    let percentage: number =  partial*100/total;
    percentage = +percentage.toFixed(1)
    return percentage;
  }

}
