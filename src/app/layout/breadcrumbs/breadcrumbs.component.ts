import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../../models/breadcrumb';
import { Router, ActivatedRoute, NavigationEnd, Route } from '@angular/router';
import { filter, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {

  // public breadcrumbs: Breadcrumb[];

  breadcrumbs: object[] = [];
  isHome: boolean;
  routes: Route[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    //this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
  }

  ngOnInit(): void {

    this.routes = this.navigationService.getRoutes();

    // this.router.events.pipe(
    //   filter((event: any) => event instanceof NavigationEnd),
    //   distinctUntilChanged(),
    // ).subscribe(() => {
    //   this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    // });


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      mergeMap(route => route.data)).subscribe(obj => {

        console.log('obj', obj)

        const actualObject = this.routes.find(route => route.data.id === obj.id);
        const actualPath: string[] = actualObject.path.split('/');

        let breadcrumbs: object[] = [];

        actualPath.forEach(i => {

          const obj = this.routes.find(route => route.data.id === i);
          const path = obj.path;
          const text = obj.data.text

          breadcrumbs.push({
            breadcrumb: this.routes.find(route => route.data.id === i),
            link: `<a class="breadcrumb" routerLinkActive="breadcrumb--active" routerLink="/${path}">${text}</a>`
          });

        })

        this.breadcrumbs = breadcrumbs;
        
        console.log('breadcrumbs', breadcrumbs)

        console.log('this.breadcrumbs', this.breadcrumbs)
      });

      
      console.log('this.breadcrumbs', this.breadcrumbs)
  }

  buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {

    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.text : "";
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : "";
    let parent = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.parent : "";

    // console.log('label', label)
    // console.log('path', path)
    // console.log('parent', parent)

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');

    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }


    // console.log('label 2', label)
    // console.log('path 2', path)

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    nextUrl === '' ? this.isHome = true : this.isHome = false;

    // console.log('nextUrl', nextUrl)

    const breadcrumb: Breadcrumb = {
      label: label,
      url: nextUrl,
    };

    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;

  }

}
