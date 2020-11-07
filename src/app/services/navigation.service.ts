import { Injectable } from '@angular/core';
import NavigationSettings from '../data/navigationSettings.json';
import { Route, Router } from '@angular/router';

export class MenuItem {
  path: string;
  title: string;
  id: string;
  children: any[];
  parent: any;
  layout: string;
  rank: string;
}

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  settings: any = NavigationSettings;

  constructor(private router: Router) { }

  // getMenuItems(): Observable<string[]> {

  //   const mainMenu: string[] = this.settings.mainMenu;

  //   return of(mainMenu).pipe();

  // }

  // getSubMenuItems(): Observable<string[]> {

  //   const navigationLinks: string[] = this.settings.subMenu;
  //   return of(navigationLinks).pipe();

  // }

  // getTopMenuItems(): Observable<string[]> {

  //   const navigationLinks: string[] = this.settings.topMenu;
  //   return of(navigationLinks).pipe();

  // }

  // getExtraMenuItems(): Observable<string[]> {

  //   const navigationLinks: string[] = this.settings.extraMenu;
  //   return of(navigationLinks).pipe();

  // }

  // getMenuSectionItems(menuSectionUrl: string): Observable<string[]> {

  //   const menu: any[] = this.settings.mainMenu.filter(link => link['sectionUrl'] === menuSectionUrl);
  //   const subMenu: any[] = this.settings.subMenu.filter(link => link['sectionUrl'] === menuSectionUrl);

  //   const navigationLinks = [...menu, ...subMenu];
  //   const menuSection = navigationLinks.map(i => i.sectionContent);

  //   return of(menuSection[0]).pipe();

  // }

  // getRoutes(): Route[] {
  //   //return this.routes;
  // }

  getStyle(style: string | null, classification: string | null): string {

    if (classification === 'section') {
      return `navigation__section--${style}`;
    }
    else if (classification === 'link') {
      return `navigation__link--${style}`;
    }

  }

  getRoutes(): any[] {
    return this.router.config.filter(route => route.data);
  }

  private getMenuItems(menu: string): any[] {
    return this.router.config.filter(route => route.data.menu === menu); // only add a menu item for routes that belong to a particular menu
  }

  getMainMenu(): Route[] {

    const menuItems: Route[] = this.getMenuItems('mainMenu');

    // finner alle routes som er en del an hovedmenyen (mainMenu)
    //const filteredRoutes: any[] = this.routes.filter(i => i.data.menu === 'mainMenu');

    // finner parents (topLevel)
    //const parents: any[] = filteredRoutes.filter(i => i.data.parent === '');
    const parents: any[] = menuItems.filter(i => i.data.parent === '');

    // sluttresultatet

    const output: Route[] = [];

    // funksjonen tar en item og finner alle barn av den

    function handleItem(item: any): object {

      const menuItem: object = {
        path: item.path,
        title: item.data.text,
        id: item.path,
        layout: item.data.layout,
        rank: item.data.rank
      };

      const children: Route[] = menuItems.filter(i => i.data.parent === item.path);

      menuItem['children'] = children.map(handleItem);

      return menuItem;

    }

    parents.forEach(item => {
      output.push(handleItem(item));
    });

    console.log('mainMenu SERVICE', output)
    return output;

  }

  getTopMenu(): any[] {

    let topMenu: any[] = this.getMenuItems('topMenu');
    topMenu = topMenu.filter(i => i.data.rank === 'primary');
    return topMenu;

  }

  getSubMenu(parent: string): any[] {

    const menuItems = this.getRoutes();

    // const subMenu: any[] = this.routes.filter(i => {
    //   return i.data.parent === parent;
    // });

    const subMenu: any[] = menuItems.filter(i => {
      return i.data.parent === parent;
    });

    return subMenu;

  }

  getExtraMenu(): any[] {
    return this.getMenuItems('extraMenu');;
  }

}



