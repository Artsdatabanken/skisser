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

  // public breadcrumbs: Breadcrumb[];

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

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      mergeMap(route => route.data)).subscribe(route => {

        // TODO refactor

        const routeObject = this.routes.find(r => r.data.id === route.id);
        const routePath: string[] = routeObject.path.split('/');

        let breadcrumbs: any[] = [];

        routePath.forEach(i => {

          breadcrumbs.push({ breadcrumb: this.routes.find(route => route.data.id === i) });

        });

        this.breadcrumbs = breadcrumbs;

      });


  }

}
