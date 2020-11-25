import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})

export class TopNavigationComponent implements OnInit {

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

  closeDashboard(): void {
    console.log('cerrado')
    // this.showDashboardPane = false;
  }

}
