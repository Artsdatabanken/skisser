import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  topMenu: any[];
  showDashboardPane: boolean;
  isLoggedIn: boolean = false;
  subscription: Subscription;

  @Input() ariaLabel: string;
  @Input() location: string;

  constructor(
    private navigationService: NavigationService,
    private menuService: MenuService
  ) {
    this.showDashboardPane = this.menuService.showDashboardPane;
    this.subscription = this.menuService.dashboardVisibility.subscribe((value) => {
      this.showDashboardPane = value;
    });

  }

  ngOnInit(): void {
    this.topMenu = this.navigationService.getTopMenu();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getStyle(id: string): string {
    return `top-navigation__link--${id}`;
  }

  toggleDashboard(): void {
    this.menuService.toggleDashboard();
    console.log('showDashboardPane', this.showDashboardPane)
  }

  // fake login

  login(): boolean {
    return this.isLoggedIn = true
  }

  logout(): boolean {
    this.menuService.closeDashboard();
    return this.isLoggedIn = false;
  }

  closeDashboard(): boolean {
    this.menuService.closeDashboard();    
    return this.isLoggedIn = false;
  }

}
