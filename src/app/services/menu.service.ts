import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

export class MenuService {

  constructor(private router: Router) {  }

  getMenuItems(): MenuItem[] {
    console.log('is this getting called?')

    return this.router.config
      .filter(route => route.data && route.data.title && route.data.menu === 'mainMenu') //only add a menu item for routes with a title set.
      .map(route => {

        console.log('route', route)
        //const parents: any[] = filteredRoutes.filter(i => i.data.parent === '');


        return {
          path: route.path,
          title: route.data.title,
          id: route.data.id,
          children: route.data.id,
          parent: route.data.parent,
          layout: route.data.layout,
          rank: route.data.rank
        };
      });
  }

}
