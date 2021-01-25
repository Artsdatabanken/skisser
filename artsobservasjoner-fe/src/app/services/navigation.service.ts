import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslationService } from './translation.service';

export class MenuItem {
  path: string;
  heading: string;
  title: string;
  id: string;
  parent: any;
  layout: string;
  rank: string;
  hidden: boolean;
  children?: any[];
}

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  siteLanguage: any;
  translatedMenuItem: string;

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {

    this.translationService.selectedLanguage.subscribe((value) => {
      this.siteLanguage = value;
      console.log('site language in nav serv', this.siteLanguage)
    });

  }

  // **************************************************************************************** //

  private getMenuItems(menu: string): any[] {
    let menuItems: any[] = this.router.config.filter(route => route.data.menu === menu); // only add a menu item for routes that belong to a particular menu
    menuItems = menuItems.filter(mi => mi.data.hidden === false);
    return menuItems;
  }

  private getTranslatedMenuItem(item: object): string {

    const getPropValue: any = (obj, key) => key.split('.').reduce((o, x) => o == undefined ? o : o[x], obj);
    const translation = getPropValue(item, this.siteLanguage);
    return translation;

  }
  
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

  getMainMenu(): Route[] {

    const menuItems: Route[] = this.getMenuItems('mainMenu');
    const parents: any[] = menuItems.filter(i => i.data.parent === '');  // finner parents (top level)
    const menu: Route[] = []; // sluttresultatet

    // funksjonen tar en item og finner alle barn av den GAMMEL SYNTAKS
    // function handleItem(item: any): object { }

    // funksjonen tar en item og finner alle barn av den NY SYNTAKS (ny syntaks gir ikke tilgang til 'this')
    const handleItem = (item: any): object => {

      if (item.data.translation) {
        this.translatedMenuItem = this.getTranslatedMenuItem(item.data.translation);
      }

      const menuItem: MenuItem = {
        path: item.path,
        heading: this.translatedMenuItem,
        title: item.data.text,
        id: item.path,
        parent: item.data.parent,
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

  // getSubMenu(parent: string): any[] {

  //   const menuItems = this.getRoutes();

  //   // const subMenu: any[] = this.routes.filter(i => {
  //   //   return i.data.parent === parent;
  //   // });

  //   const subMenu: any[] = menuItems.filter(i => {
  //     return i.data.parent === parent;
  //   });

  //   return subMenu;

  // }

  getExtraMenu(): any[] {

    const extraMenuOriginal: Route[] = this.getMenuItems('extraMenu');
    const extraMenuItems: object[] = [];

    extraMenuOriginal.forEach(item => {
      
      if (item.data.translation) {
        this.translatedMenuItem = this.getTranslatedMenuItem(item.data.translation);
      }

      const menuItem: MenuItem = {
        path: item.path,
        heading: this.translatedMenuItem,
        title: item.data.text,
        id: item.path,
        parent: item.data.parent,
        layout: item.data.layout,
        rank: item.data.rank,
        hidden: item.data.hidden
      };

      extraMenuItems.push(menuItem);

    });

    return extraMenuItems;
  }

  getSubMenu(parent: string): any[] {

    const routes = this.getRoutes();
    const menuItems: object[] = [];

    routes.forEach(item => {

      if (item.data.translation) {
        this.translatedMenuItem = this.getTranslatedMenuItem(item.data.translation);
      }

      const menuItem: MenuItem = {
        path: item.path,
        heading: this.translatedMenuItem,
        title: item.data.text,
        id: item.path,
        parent: item.data.parent,
        layout: item.data.layout,
        rank: item.data.rank,
        hidden: item.data.hidden
      };

      menuItems.push(menuItem);

    })

    const subMenu: object[] = menuItems.filter(i => {
      return i['parent'] === parent;
    });

    return subMenu;

  }

  getSitemap(): any[] {

    const mainMenu = this.getMenuItems('mainMenu');
    const userMenu = this.getMenuItems('userMenu');
    const extraMenu = this.getMenuItems('extraMenu');

    return [...mainMenu, ...userMenu, ...extraMenu];

  }

}



