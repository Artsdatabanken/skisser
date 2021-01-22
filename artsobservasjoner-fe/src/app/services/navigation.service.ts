import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslationService } from './translation.service';

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

  constructor(private router: Router) { }

  // **************************************************************************************** //

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
      return r.data.menu === 'mainMenu';
    });

    return this.router.config.filter(route => route.data);

  }

  private getMenuItems(menu: string): any[] {
    let menuItems: any[] = this.router.config.filter(route => route.data.menu === menu); // only add a menu item for routes that belong to a particular menu
    menuItems = menuItems.filter(mi => mi.data.hidden === false);
    return menuItems;
  }

  getMainMenu(): Route[] {

    const menuItems: Route[] = this.getMenuItems('mainMenu');

    // finner parents (top level)
    const parents: any[] = menuItems.filter(i => i.data.parent === '');

    // sluttresultatet
    const menu: Route[] = [];

    // funksjonen tar en item og finner alle barn av den GAMMEL SYNTAKS
    // function handleItem(item: any): object {

    //   const menuItem: object = {
    //     path: item.path,
    //     title: item.data.text,
    //     id: item.path,
    //     layout: item.data.layout,
    //     rank: item.data.rank,
    //     hidden: item.data.hidden
    //   };

    //   const children: Route[] = menuItems.filter(i => i.data.parent === item.path);

    //   menuItem['children'] = children.map(handleItem);

    //   return menuItem;

    // }

    // funksjonen tar en item og finner alle barn av den NY SYNTAKS (ny syntaks gir ikke tilgang til 'this')
    const handleItem = (item: any): object => {

      const menuItem: object = {
        path: item.path,
        title: item.data.text,
        id: item.path,
        key: item.langKey,
        layout: item.data.layout,
        rank: item.data.rank,
        hidden: item.data.hidden
      };

      const children: Route[] = menuItems.filter(i => i.data.parent === item.path);

      menuItem['children'] = children.map(handleItem);

      return menuItem;
    }

    parents.forEach(item => {
      menu.push(handleItem(item));
    });

    return menu;

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



