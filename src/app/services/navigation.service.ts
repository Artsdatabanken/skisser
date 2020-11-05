import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import NavigationSettings from '../data/navigationSettings.json';
import { routes } from '../app-routing.module';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  settings: any = NavigationSettings;
  routes = routes;

  constructor() { }

  getMenuItems(): Observable<string[]> {

    const mainMenu: string[] = this.settings.mainMenu;

    return of(mainMenu).pipe();

  }

  getSubMenuItems(): Observable<string[]> {

    const navigationLinks: string[] = this.settings.subMenu;
    return of(navigationLinks).pipe();

  }

  getTopMenuItems(): Observable<string[]> {

    const navigationLinks: string[] = this.settings.topMenu;
    return of(navigationLinks).pipe();

  }

  getExtraMenuItems(): Observable<string[]> {

    const navigationLinks: string[] = this.settings.extraMenu;
    return of(navigationLinks).pipe();

  }

  getMenuSectionItems(menuSectionUrl: string): Observable<string[]> {

    const menu: any[] = this.settings.mainMenu.filter(link => link['sectionUrl'] === menuSectionUrl);
    const subMenu: any[] = this.settings.subMenu.filter(link => link['sectionUrl'] === menuSectionUrl);

    const navigationLinks = [...menu, ...subMenu];
    const menuSection = navigationLinks.map(i => i.sectionContent);

    return of(menuSection[0]).pipe();

  }

  getMenuCSSClass(style: string | null, type: string | null): string {

    if (type === 'section') {
      return `navigation__section--${style}`;
    }
    else if (type === 'link') {
      return `navigation__link--${style}`;
    }

  }

  getMainMenu(): any[] {

    const filteredRoutes: any = this.routes.filter(i => i.data.menuType === 'mainMenu');
    console.log('routes', filteredRoutes)

    return this.routes.filter(i => i.data.menuType === 'mainMenu');

  }

  getSubMenu(parent: string): any[] {

    const menu: any[] = this.routes.filter(i => i.data.linkId === parent);
    return menu[0].children;

  }

}