import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Settings from '../data/settings.json';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  settings: any = Settings;

  constructor() { }

  getMenuItems(): Observable<string[]> {

    //let navigationLinks: string[] = this.settings.submenu;
    let trimedLinks: string[] = [];

    this.settings.menu.forEach(link => {
      link = link.trim();
      trimedLinks.push(link);
    })

    let navigationLinks: string[] = trimedLinks;

    console.log('menu trimedLinks', navigationLinks);
    return of(navigationLinks).pipe();

  }

  getSubMenuItems(): Observable<string[]> {

    //let navigationLinks: string[] = this.settings.submenu;
    let trimedLinks: string[] = [];

    this.settings.submenu.forEach(link => {
      link = link.trim();
      trimedLinks.push(link);
    })

    let navigationLinks: string[] = trimedLinks;

    console.log('submenu trimedLinks', trimedLinks);
    return of(navigationLinks).pipe();

  }

}