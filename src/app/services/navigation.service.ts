import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Settings from '../data/settings.json';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  settings: any = Settings;

  constructor() { }

  // getMenuItems(): Observable<string[]> {

  //   const navigationLinks: string[] = this.settings.menu;
  //   return of(navigationLinks).pipe();

  // }

  getMenuItems(): Observable<string[]> {

    const navigationLinks: string[] = this.settings.menu;
    return of(navigationLinks).pipe();

  }

  getSubMenuItems(): Observable<string[]> {

    const navigationLinks: string[] = this.settings.subMenu;
    // let trimedLinks: string[] = [];

    // this.settings.submenu.forEach(link => {
    //   link = link.trim();
    //   trimedLinks.push(link);
    // })

    // let navigationLinks: string[] = trimedLinks;

    console.log('submenu', navigationLinks)
    return of(navigationLinks).pipe();

  }

  getTopMenuItems(): Observable<string[]> {

    const navigationLinks: string[] = this.settings.topMenu;
    // let trimedLinks: string[] = [];

    // this.settings.submenu.forEach(link => {
    //   link = link.trim();
    //   trimedLinks.push(link);
    // })

    // let navigationLinks: string[] = trimedLinks;

    return of(navigationLinks).pipe();

  }

}