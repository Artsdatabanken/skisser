import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../../models/breadcrumb';
import { Router, ActivatedRoute, NavigationEnd, Route, PRIMARY_OUTLET } from '@angular/router';
import { filter, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: any[] = [];
  isHome: boolean;
  routes: Route[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {

    this.routes = this.navigationService.getRoutes();

    // this.router.events.pipe(
    //   filter((event: any) => event instanceof NavigationEnd),
    //   distinctUntilChanged(),
    // ).subscribe((route) => {
    //   //console.log('route', route)
    //   this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    // });

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    //   distinctUntilChanged(),
    //   map(() => this.activatedRoute),
    //   map(route => {
    //     //while (route.firstChild) { route = route.firstChild; }
    //     return route;
    //   }),
    //   mergeMap(route => route.data)).subscribe(route => {

    //     // TODO refactor

    //     const routeObject = this.routes.find(r => r.data.id === route.id);


    //     //console.log('routeObject', route)


    //     const routePath: string[] = routeObject.path.split('/');

    //     let breadcrumbs: any[] = [];

    //     routePath.forEach(i => {

    //       breadcrumbs.push({ breadcrumb: this.routes.find(route => route.data.id === i) });

    //     });

    //     this.breadcrumbs = breadcrumbs;

    //   });


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })).subscribe(route => {

        const path: any = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
        let routePath: string[];

        let breadcrumbs: any[] = [];

        if (path.includes('/')) { 
          
          // it's neither a child route nor level 1 route

          routePath = path.split('/');
          routePath.forEach(i => {

            console.log('i', this.routes.find(route => route.data.id === i))
            breadcrumbs.push({ breadcrumb: this.routes.find(route => route.data.id === i) });

          });

        }
        else {

          // either child route or level 1 route

          // let's try to find parent if there is

          console.log('parent', route.url);

          routePath = [];
          breadcrumbs.push({ breadcrumb: this.routes.find(route => route.path === path) });
        }


        console.log('path', path)
        console.log('routePath', routePath)
        console.log('object', this.routes.find(route => route.path === path))

        this.breadcrumbs = breadcrumbs;

      });





  }


  buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {

    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.text : "";
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : "";

    // If the route is dynamic route such as ':id', remove it
    // const lastRoutePart = path.split('/').pop();
    // const isDynamicRoute = lastRoutePart.startsWith(':');


    // console.log('lastRoutePart', lastRoutePart)
    // console.log('isDynamicRoute', isDynamicRoute)

    // if (isDynamicRoute && !!route.snapshot) {
    //   const paramName = lastRoutePart.split(':')[1];
    //   path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
    //   label = route.snapshot.params[paramName];
    // }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time

    console.log('path', path)
    console.log('path', path.includes("/"))

    let routeObject: any;
    let routePath: string[] = [];

    if (path.includes("/")) { // it means we have routeObject routes
      routeObject = this.routes.find(r => r.path === path)
      routePath = routeObject.path.split('/');
    }

    console.log('routeObject', routePath)
    console.log('url', url)

    const nextUrl = path ? `${url}/${path}` : url;

    nextUrl === '' ? this.isHome = true : this.isHome = false;

    console.log('nextUrl', nextUrl)

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

/*

 mergeMap(route => route.data)).subscribe(route => {

        // TODO refactor

        const routeObject = this.routes.find(r => r.data.id === route.id);


        console.log('routeObject', route)


        const routePath: string[] = routeObject.path.split('/');

        let breadcrumbs: any[] = [];

        routePath.forEach(i => {

          breadcrumbs.push({ breadcrumb: this.routes.find(route => route.data.id === i) });

        });

        this.breadcrumbs = breadcrumbs;

      });*/