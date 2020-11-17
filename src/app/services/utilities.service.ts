import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  showDashboardPane: boolean;
  dashboardVisibility: Subject<boolean> = new Subject<boolean>();

  constructor() { 
    this.showDashboardPane = false;
  }

  toggleDashboard(): void {

      this.showDashboardPane = !this.showDashboardPane;
      this.dashboardVisibility.next(this.showDashboardPane);
    
  }

  closeDashboard(): void {
    this.showDashboardPane = false; // change state
    this.dashboardVisibility.next(this.showDashboardPane); // propagate the new state
  }


  ///////////////////////////////////////////////////

  private subject = new Subject<any>();

  sendClickEvent(): void {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }


}
