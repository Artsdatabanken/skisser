import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})

export class TopNavigationComponent implements OnInit {

  //topMenu$: Observable<string[]>;
  topMenu: any[];
  showDashboardPane: boolean = false;
  isLoggedIn: boolean = false;

  @Input() ariaLabel: string;
  @Input() location: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    //this.topMenu$ = this.navigationService.getTopMenuItems();
    this.topMenu = this.navigationService.getTopMenu();
  }

  // getStyle(style: string): string {
  //   return this.navigationService.getStyle(style, null);
  // }

  getStyle(id: string): string {
    return `top-navigation__link--${id}`;
  }

  toggleDashboard(): void {
    this.showDashboardPane = !this.showDashboardPane;

    console.log('show', this.showDashboardPane)
  }

  // fake login

  login(): boolean {
    return this.isLoggedIn = true
  }

  logout(): boolean {
    return this.isLoggedIn = false;
  }

}
