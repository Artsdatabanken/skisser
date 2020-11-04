import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import NavigationSettings from '../data/navigationSettings.json';
import { routes } from '../app-routing.module';

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

  getMenuCSSClass(link: string | null): string {

    if (link['sectionType']) {
      return `navigation__section--${link['sectionType']}`;
    }
    else if (link['type']) {
      return `navigation__link--${link['type']}`;
    }

  }

  getMainMenu(): any {

    const filteredData: any = this.routes.filter(i => i.data.menuType === 'mainMenu');
    let mainMenu: any[] = [];

    // const menu: {} = filteredData.reduce((acc, curr, index) => {
    //   // console.log('currentValue', curr);
    //   // console.log('accumulator', acc);

    //   acc[curr.data.menuSectionId] = [...acc[curr.data.menuSectionId] || [], curr];

    //   return acc;
    // }, {});

    const menu = filteredData.reduce((acc, curr) => {
     
      console.log('currentValue', curr);
      console.log('accumulator', acc);

      //acc[curr.data.menuSectionId] = [...acc[curr.data.menuSectionId] || [], curr];

      
      //acc[curr.data.menuSectionId] = [...acc[curr.data.menuSectionId] || [], curr];


      acc = {
        menuSection: curr.data.menuSectionId,
        menuContent: curr
      };

     mainMenu = [...new Set(mainMenu.map(i => i))];


      return acc;
    }, {});


    // console.log('menu', menu);

    //--------------

    // const menuKeys = Object.keys(filteredData);
    // const menuValues = Object.values(filteredData);


    // // console.log('menuKeys', menuKeys);
    // // console.log('menuValues', menuValues);
    // // console.log('entries', Object.entries(filteredData));

    // const result = menuValues.reduce((result, field, index) => {

    //   result = {
    //     menuSection: menuKeys[index],
    //     menuContent: field
    //   };

    //   mainMenu.push(result)

    //   return result;
    // }, {});


    // console.log('result', result);
    console.log('mainmenu', mainMenu);

    return mainMenu;
  }

  getMenuSection(menuSectionUrl: string): void {
    const menu: any[] = this.routes.filter(i => i.data.menuSectionUrl === menuSectionUrl);
  }

}