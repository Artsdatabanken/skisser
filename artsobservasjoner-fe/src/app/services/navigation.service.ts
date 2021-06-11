import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export class MenuItem {
  path: string;
  heading: string;
  text: string;
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

  constructor(private router: Router) { }

  // ------------------------------------------------------------------------------------------ //

  private getMenuItems(menu: string): any[] {
    let menuItems: any[] = this.router.config.filter(route => route.data.menu === menu); // only add a menu item for routes that belong to a particular menu
    menuItems = menuItems.filter(mi => mi.data.hidden === false);
    return menuItems;
  }

  getRoutes(): Route[] {

    let routes: Route[] = this.router.config.filter(route => route.data);

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

      const menuItem: MenuItem = {
        path: item.path,
        heading: `${item.data.title}`,
        text: item.data.text,
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

  getSimplifiedMainMenu(): Route[] {
    const menuItems: Route[] = this.getMenuItems('mainMenu');
    const parents: any[] = menuItems.filter(i => i.data.parent === '');  // finner parents (top level)
    const menu: Route[] = []; // sluttresultatet

    parents.forEach(item => {

      const menuItem: MenuItem = {
        path: item.path,
        heading: `${item.data.title}`,
        text: item.data.text,
        id: item.path,
        parent: item.data.parent,
        layout: item.data.layout,
        rank: item.data.rank,
        hidden: item.data.hidden
      };

      menu.push(menuItem);
    })

    return menu;
  }

  getExtraMenu(): any[] {

    const extraMenuOriginal: Route[] = this.getMenuItems('extraMenu');
    const extraMenuItems: object[] = [];

    extraMenuOriginal.forEach(item => {

      const menuItem: MenuItem = {
        path: item.path,
        heading: `${item.data.title}`,
        text: item.data.text,
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

  getSubMenu(parent: string): Route[] {

    console.log('submenu parent', parent)

    const routes = this.getRoutes().filter(i => {

      console.log('submenu getRoutes', i.data['parent'])
      return i.data['parent'] === parent;
    });


    console.log('submenu parent routes', routes)

    const menuItems: object[] = [];

    routes.forEach(item => {

      const menuItem: MenuItem = {
        path: item.path,
        heading: `${item.data.title}`,
        text: item.data.text,
        id: item.path,
        parent: item.data.parent,
        layout: item.data.layout,
        rank: item.data.rank,
        hidden: item.data.hidden
      };

      menuItems.push(menuItem);

    });

    console.log('subMenu', menuItems)

    return menuItems;

  }

  getSitemap(): any[] {

    const mainMenu = this.getMenuItems('mainMenu');
    const extraMenu = this.getMenuItems('extraMenu');

    //return [...mainMenu, ...userMenu, ...extraMenu];
    return [...mainMenu, ...extraMenu];

  }

}



