import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  showDashboardPane: boolean;
  activeMenu: boolean;
  menuVisibility: Subject<boolean> = new Subject<boolean>();
  dashboardVisibility: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.showDashboardPane = false;
    this.activeMenu = false;
  }

  toggleMenu(): void {
    this.activeMenu = !this.activeMenu;
    this.menuVisibility.next(this.activeMenu);
  }

  closeMenu(): void {
    this.activeMenu = false;
    this.menuVisibility.next(this.activeMenu);
  }

  toggleDashboard(): void {
    this.showDashboardPane = !this.showDashboardPane;
    this.dashboardVisibility.next(this.showDashboardPane);
  }

  closeDashboard(): void {
    this.showDashboardPane = false; // change state
    this.dashboardVisibility.next(this.showDashboardPane); // propagate the new state
  }

}
