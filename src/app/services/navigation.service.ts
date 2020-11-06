import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import NavigationSettings from '../data/navigationSettings.json';
import { routes } from '../app-routing.module';
import { filter } from 'rxjs/operators';
import { AboutComponent } from '../components/about/about.component';

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

  getStyle(style: string | null, classification: string | null): string {

    if (classification === 'section') {
      return `navigation__section--${style}`;
    }
    else if (classification === 'link') {
      return `navigation__link--${style}`;
    }

  }

  getMainMenu(): any[] {

    // finner alle routes som er en del an hovedmenyen (mainMenu)
    const filteredRoutes: any[] = this.routes.filter(i => i.data.menu === 'mainMenu');

    // finner parents (topLevel)
    const parents: any[] = filteredRoutes.filter(i => i.data.parent === '');

    // sluttresultatet

    const output: any[] = [];

    // funksjonen tar en item og finner alle barn av den

    function handleItem(item: any): object {

      const menuItem: object = {
        path: item.path,
        title: item.data.text,
        id: item.path,
        layout: item.data.layout,
        rank: item.data.rank
      };

      const children: any[] = filteredRoutes.filter(i => i.data.parent === item.path);

      menuItem['children'] = children.map(handleItem);

      return menuItem;

    }

    parents.forEach(item => {
      output.push(handleItem(item));
    });

    console.log('output', output);


    return output;

  }

  getTopMenu(): any[] {

    let topMenu: any[] = this.routes.filter(i => i.data.menu === 'topMenu');

    topMenu = topMenu.filter(i => i.data.rank === 'primary');

    return topMenu;

  }

  getSubMenu(parent: string): any[] {

    const menu: any[] = this.routes.filter(i => {
      return i.data.parent === parent;
    });

    console.log('menu', menu)

    return menu;

  }

  getExtraMenu(): any[] {
    console.log('extra', this.routes.filter(i => i.data.menu === 'extraMenu'))
    return this.routes.filter(i => i.data.menu === 'extraMenu');
  }

}



