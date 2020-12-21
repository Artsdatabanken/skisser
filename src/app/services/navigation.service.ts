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

  getStyle(style: string | null, classification: string | null): string {

    if (classification === 'section') {
      return `navigation__section--${style}`;
    }
    else if (classification === 'link') {
      return `navigation__link--${style}`;
    }

  }

  getRoutes(): any[] {

    let routes: any[] = this.router.config.filter(route => route.data);

    routes = routes.filter(r => {

      console.log('r', r)
      return r.data.menu === 'mainMenu';
    });

    console.log('routes', routes)
    return this.router.config.filter(route => route.data);
  }

  private getMenuItems(menu: string): any[] {
    let menuItems: any[] = this.router.config.filter(route => route.data.menu === menu); // only add a menu item for routes that belong to a particular menu
    menuItems = menuItems.filter(mi => mi.data.hidden === false);
    //return this.router.config.filter(route => route.data.menu === menu); 
    return menuItems;
  }

  getMainMenu(): Route[] {

    const menuItems: Route[] = this.getMenuItems('mainMenu');

    // finner parents (topLevel)
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
        rank: item.data.rank,
        hidden: item.data.hidden
      };

      const children: Route[] = menuItems.filter(i => i.data.parent === item.path);

      menuItem['children'] = children.map(handleItem);

      return menuItem;

    }

    parents.forEach(item => {
      output.push(handleItem(item));
    });

    // console.log('mainMenu SERVICE', output)
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

  getSitemap(): any[] {

    const mainMenu = this.getMenuItems('mainMenu');
    const userMenu = this.getMenuItems('userMenu');
    const extraMenu = this.getMenuItems('extraMenu');

    return [...mainMenu, ...userMenu, ...extraMenu];

  }

}



