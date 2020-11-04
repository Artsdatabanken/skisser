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

    const result = {};

    let temp = []

    // for (let { data } of filteredData) {

    //   if (!result[data.menuSectionId]) {
    //     result[data.menuSectionId] = [];
    //   };

    //   result[data.menuSectionId].push({ 'menuSection': data.menuSection, data });

    // }

    for (let item of filteredData) {

      // // if (!result[item.data.menuSectionId]) {
      // //   result[item.data.menuSectionId] = [];
      // // };

      // // result[item.data.menuSectionId].push({ 'menuSection': item.data.menuSection, 'menuSectionContent': item.data });

      // if (result['menuSection'] !== item.data.menuSectionId) {
      //   result['menuSection'] = '';
      // };

      // console.log('test', result['menuSection'] !== item.data.menuSectionId)

      // result = {
      //   menuSection: item.data.menuSectionId,
      //   menuSectionContent: item
      // }



      if (!result[item.data.menuSectionId]) {
        result[item.data.menuSectionId] = [];
      };

      result[item.data.menuSectionId].push({ 'menuSection': item.data.menuSection, 'menuSectionContent': item.data });
      temp.push(result)
    }

   



    console.log('temp', temp);


    console.log('result', result);

    mainMenu = Object.entries(result);
    console.log('mainmenu', mainMenu);

    return mainMenu;
  }

  getMenuSection(menuSectionUrl: string): void {
    const menu: any[] = this.routes.filter(i => i.data.menuSectionUrl === menuSectionUrl);
  }

}