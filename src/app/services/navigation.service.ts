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

    let navigationLinks: string[] = this.settings.menu;

    console.log('menu', navigationLinks);
    return of(navigationLinks).pipe( );

  }

  getSubMenuItems(): Observable<string[]> {

    let navigationLinks: string[] = this.settings.submenu;

    console.log('submenu', navigationLinks);
    return of(navigationLinks).pipe( );

  }

}